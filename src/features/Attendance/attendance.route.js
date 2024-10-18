import express from "express";
import attendanceController from "./attendance.controller.js";
import jwtMiddleware from "../../middlewares/jwt.middleware.js";
import employee from "../../middlewares/employeeAuth.middleware.js";

const attendanceRoute = express.Router();
const attendance = new attendanceController();

attendanceRoute.get('/',jwtMiddleware,employee,attendance.viewAttendance);
attendanceRoute.post('/',jwtMiddleware,employee,attendance.markAttendance);



export default attendanceRoute;