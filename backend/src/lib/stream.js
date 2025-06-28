import {StreamChat} from 'stream-chat';
import "dotenv/config"

const apiKey = process.env.STEAM_API_KEY
const apiSecret = process.env.STEAM_API_SECRET

if(!apiKey||!apiSecret){
    console.error("Undefined keys")
}

const streamClient = StreamChat.getInstance(apiKey,apiSecret);

export const upsertStreamUser = async(userData) =>{
    try {
        await streamClient.upsertUsers([userData]); // upsert means it will create a new user if it doesn't exist or update the existing use
        return userData;
    } catch (error) {
        console.error("Error in upserting stream user: ", error);
    }
}

export const generateStreamToken = (userId)=>{
    try {
        // ensure userid is a string
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);
    } catch (error) {
        console.log("Error in generating stream token: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};