import Employee from "./employee.model.js";

export default class employeeController {
  // Get all employees
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

  // Add a new employee
  async add(req, res) {
    try {
      const { name, designation, department, contactDetails } = req.body;

      const newEmployee = await Employee.create({
        name,
        designation,
        department,
        contactDetails,
      });

      if (!newEmployee) {
        return res.status(400).json({
          success: false,
          message: 'Failed to create employee',
        });
      }
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
}
