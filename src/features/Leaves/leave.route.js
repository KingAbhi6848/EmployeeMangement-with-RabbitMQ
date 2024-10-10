import express from "express";
import leaveController from "./leave.controller.js";
const leaveRoute = express.Router();

const leave = new leaveController();

leaveRoute.get("/",leave.getAll);
leaveRoute.post("/",leave.add);
leaveRoute.put('/',leave.update);

export default leaveRoute;
