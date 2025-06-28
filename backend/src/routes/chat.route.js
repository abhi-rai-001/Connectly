import express from "express";
import { getStreamToken } from "../controllers/chat.controller.js";
import {protectedRoute} from '../middlewares/auth.middleware.js'

const router = express.Router();

router.get('/token', protectedRoute ,getStreamToken)

export default router;