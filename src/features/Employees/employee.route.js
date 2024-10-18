import express from "express";
import employeeController from "./employee.controller.js";
import jwtMiddleware from "../../middlewares/jwt.middleware.js";
import admin from "../../middlewares/adminAuth.middleware.js";

const employeeRoute = express.Router();
const employee = new employeeController();


employeeRoute.get('/',jwtMiddleware,admin,employee.getAll);
employeeRoute.post('/signin',employee.signin);
employeeRoute.post('/',jwtMiddleware,admin,employee.add);
employeeRoute.put('/:id',jwtMiddleware,admin,employee.update);
employeeRoute.delete('/:id',jwtMiddleware,admin,employee.delete);



export default employeeRoute;