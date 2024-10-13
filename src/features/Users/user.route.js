import express from 'express';
import userController from './user.controller.js';

const controller = new userController();

const userRoute = express.Router();


userRoute.post('/signup',controller.signup);
userRoute.post('/signin',controller.login);



export default userRoute;