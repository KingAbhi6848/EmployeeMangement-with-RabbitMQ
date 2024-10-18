import Employee from "./employee.model.js";
import sendNotification from "../../config/publisher.js";
import jwt from "jsonwebtoken";

export default class employeeController {
 
  async getAll(req, res) {
    try {
      const records = await Employee.find({});
      return res.status(200).json({
        success: true,
        message: 'Employees fetched successfully',
        data: records,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch employees',
        error: error.message,
      });
    }
  }

  async add(req, res) {
    try {
      const { name, designation, department, contactDetails } = req.body;

      const newEmployee = await Employee.create({
        name,
        designation,
        department,
        contactDetails,
        password:contactDetails.phone            // by default password is phone number
      });


      if (!newEmployee) {
        return res.status(400).json({
          success: false,
          message: 'Failed to create employee',
        });
      }

      const message = {
        name,
       officeId: newEmployee.officeId,
        designation,
        password:newEmployee.password,
        phoneNumber: contactDetails.phone, 
        email: contactDetails.email, 
      };
      sendNotification(message);

      return res.status(201).json({
        success: true,
        message: 'Employee data created successfully',
        data: newEmployee,
      });

      
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error while creating employee',
        error: error.message,
      });
    }
  }

  // Update an employee
  async update(req, res) {
    try {
      const employeeId = req.params.id;
      const updatedData = req.body;

      const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, updatedData, {
        new: true,
        runValidators: true,
      });

      if (!updatedEmployee) {
        return res.status(404).json({
          success: false,
          message: 'Employee not found',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Employee updated successfully',
        data: updatedEmployee,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to update employee',
        error: error.message,
      });
    }
  }

  // Delete an employee
  async delete(req, res) {
    try {
      const employeeId = req.params.id;
      const success = await Employee.findByIdAndDelete(employeeId);

      if (!success) {
        return res.status(404).json({
          success: false,
          message: 'Employee not found',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Employee data deleted successfully',
      });

     
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to delete employee',
        error: error.message,
      });
    }
  }

  async signin(req, res) {
    try {
      const { officeId, password } = req.body;

      if (!officeId || !password) {
        return res.status(400).send({
          success: false,
          message: 'Please provide officeId and password.'
        });
      }

      const user = await Employee.findOne({ officeId });
      if (!user) {
        return res.status(401).send({
          success: false,
          message: 'Invalid officeId or password.'
        });
      }

    
      if (password === user.password) {
        return res.status(401).send({
          success: false,
          message: 'Invalid id or password.'
        });
      }

 
        const token = jwt.sign(
          { email: user.email, id: user._id, role: user.role },
          '123', 
          { expiresIn: '1h' }
        );
        return res.status(200).send({
          success: true,
          role:user.role,
          message: 'Login successful.',
          token,
        });
    

 
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        message: 'Internal server error.'
      });
    }
  }
}
