import User from "../models/User.js";
import Friend from "../models/FriendReq.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currUserId = req.user.id;
    const currUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currUserId } }, //exclude current user
        { _id: { $nin: currUser.friends } }, // exclude current user's friends
        { isOnboarded: true },
      ],
    });
    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("Error fetching recommended users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "fullname profilePic nativeLanguage learningLanguage"
      );

    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error fetching friends:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function sendFriendReq(req, res) {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    if (myId == recipientId) {
      return res
        .status(400)
        .json({ error: "You cannot send a friend request to yourself." });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ error: "Recipient not found." });
    }

    if (recipient.friends.includes(myId)) {
      // check if already friends
      return res
        .status(400)
        .json({ error: "You are already friends with this user." });
    }

    // Check if a friend request already exists
    const existingRequest = await Friend.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({ error: "Friend request already exists." });
    }

    const newFriendReq = await Friend.create({
      sender: myId,
      recipient: recipientId,
      
    });

    res.status(201).json(newFriendReq);
  } catch (error) {
    console.error("Error sending friend request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function acceptFriendReq(req, res) {
  try {
    const requestId = req.params.id;
    const FriendReq = await Friend.findById(requestId);

    if (!FriendReq) {
      return res.status(404).json({ error: "Friend request not found." });
    }
    // Verify if current user is the recipient
    if (FriendReq.recipient.toString() !== req.user.id) {
      return res
        .status(403)
        .json({
          error: "You are not authorized to accept this friend request.",
        });
    }

    FriendReq.status = "accepted";
    await FriendReq.save();

    // add each other to friends list
    await User.findByIdAndUpdate(FriendReq.sender, {
      $addToSet: { friends: FriendReq.recipient },
    });
    await User.findByIdAndUpdate(FriendReq.recipient, {
      $addToSet: { friends: FriendReq.sender },
    });
    // $addToSet: add elements to an array only if they do not already exist.ensures no duplicates
    res.status(200).json({ message: "Friend request accepted successfully." });
  } catch (error) {
    console.log("Error accepting friend request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getFriendReq(req, res) {
  try {
    const incomingReq = await Friend.find({
      recipient: req.user.id,
      status: "pending",
    }).populate(
      "sender",
      "fullname profilePic nativeLanguage learningLanguage"
    );
    const acceptedReq = await Friend.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullname profilePic");
    res.status(200).json({incomingReq, acceptedReq});
    
  } catch (error) {
    console.error("Error fetching friend requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getOutgoingFriendReq(req, res) {
  try {
    const outReq = await Friend.find({
        sender: req.user.id,
        status: "pending",
    }).populate(
      "recipient",
      "fullname profilePic nativeLanguage learningLanguage"
    );
    res.status(200).json(outReq);
    console.log(outReq)
  } catch (error) {
    console.error("Error fetching outgoing friend requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
