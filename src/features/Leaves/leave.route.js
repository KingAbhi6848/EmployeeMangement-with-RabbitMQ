import express from "express";
import leaveController from "./leave.controller.js";
import jwtMiddleware from "../../middlewares/jwt.middleware.js";
import admin from "../../middlewares/adminAuth.middleware.js";
const leaveRoute = express.Router();

const leave = new leaveController();

leaveRoute.get("/",jwtMiddleware,admin,leave.getAll);
leaveRoute.post("/",jwtMiddleware,leave.add);
leaveRoute.put('/',jwtMiddleware,admin,leave.update);

export default leaveRoute;
