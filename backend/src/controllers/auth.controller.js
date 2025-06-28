import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function signup(req, res) {
  const { fullname, email, password, username } = req.body;
  try {
    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters long" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({
          message: "Account already exists",
        });
    }

    const idx = Math.floor(Math.random() * 100 + 1);
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    const newUser = await User.create({
      fullname,
      email,
      password,
      username,
      profilePic: randomAvatar,
    });

    try {
        await upsertStreamUser({
        id:newUser._id.toString(),
        name:newUser.fullname,
        image: newUser.profilePic || "",
    })
    console.log("Stream user upserted successfully for", newUser.fullname);
    } catch (error) {
        console.log("Something went wrong while upserting stream user: ", error)
    }

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true, //prevent xss attacks
      sameSite: "strict", //prevent csrf attacks
      secure: process.env.NODE_ENV === "production",
    });
    res.status(201).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.log("Error in singup page: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Incorrect Email or password" });

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true, //prevent xss attacks
      sameSite: "strict", //prevent csrf attacks
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({success:true,user})
  } catch (error) {
    console.log("Error in signout page: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
export async function logout(req, res) {
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Logged out successfully" });

}
export async function onboard(req,res){
    console.log(req.user);
    try {
        const userId = req.user._id;
        console.log(req.body)
        const {fullname,bio,nativeLanguage,learningLanguage,location,profilePic} = req.body;
        if(!fullname || !bio || !nativeLanguage || !learningLanguage || !profilePic|| !location){
            return res.status(400).json({message:"All fields are required",
                missingFields: {
                    fullname: !fullname,
                    bio: !bio,
                    nativeLanguage: !nativeLanguage,
                    learningLanguage: !learningLanguage,
                    profilePicture:!profilePicture,
                    location: !location
                }
            });
        }

        const updatedUser = await User.findByIdAndUpdate(userId,{
            ...req.body,
            isOnboarded:true
        },{new:true})

        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
        }

        try {
            await upsertStreamUser({
            id: updatedUser._id.toString(),
            name:updatedUser.fullname,
            image:updatedUser.profilePic || "",
        })
   } catch (error) {
            console.log("Something went wrong while upserting stream user: ", error);
            res.status(500).json({
                success:false,
                message:"Something went wrong while upserting stream user",
                error:error.message
            });
        }


        res.status(200).json({
            success:true,
            user:updatedUser
      }
    );
    } catch (error) {
        console.log("Error in onboarding user: ", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}