import express from 'express';
import {logout,signup,login,onboard} from '../controllers/auth.controller.js';
import { protectedRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',protectedRoute,logout)  //logout is a post request to clear the cookie. This is done to prevent CSRF attacks, as logout should not be a GET request and should be protected by the authentication middleware. If you want to make it a GET request, you can remove the protectedRoute middleware, but it is not recommended for security reasons. router.get('/logout',logout)   This is not recommended for security reasons. router.post('/logout',logout)   This is the recommended way to logout. The logout route is protected by the authentication middlewareso that only authenticated users can logout

router.post('/onboard',protectedRoute,onboard)


// Check if the user is authenticated and return user details
router.get('/me', protectedRoute, (req, res) => {
  res.status(200).json({ user: req.user });
}); 


export default router;