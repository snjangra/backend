import express from 'express';
import { loginUser,logoutUser,registerUser } from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/logoutuser",logoutUser);

export default userRouter;