import express from 'express';
import { protectedRoute } from '../middlewares/auth.middleware.js';
import { acceptFriendReq, getMyFriends, getRecommendedUsers, sendFriendReq, getFriendReq,getOutgoingFriendReq } from '../controllers/user.controllers.js';

const router = express.Router();

router.use(protectedRoute);

router.get('/', getRecommendedUsers)

router.get('/friends', getMyFriends)

router.post("/friend-req/:id", sendFriendReq)

router.put("/friend-req/:id/accept", acceptFriendReq)

router.get("/friend-requests", getFriendReq)

router.get("/outgoing-friend-requests", getOutgoingFriendReq)

export default router;