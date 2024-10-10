import express from "express";
import employeeController from "./employee.controller.js";

const employeeRoute = express.Router();
const employee = new employeeController();

employeeRoute.get('/',employee.getAll);
employeeRoute.post('/',employee.add);
employeeRoute.put('/:id',employee.update);
employeeRoute.delete('/:id',employee.delete);


export default employeeRoute;