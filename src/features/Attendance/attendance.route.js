import express from "express";
import attendanceController from "./attendance.controller.js";
import jwtMiddleware from "../../middlewares/jwt.middleware.js";

const attendanceRoute = express.Router();
const attendance = new attendanceController();

attendanceRoute.get('/',jwtMiddleware,attendance.viewAttendance);
attendanceRoute.post('/',jwtMiddleware,attendance.markAttendance);



export default attendanceRoute;