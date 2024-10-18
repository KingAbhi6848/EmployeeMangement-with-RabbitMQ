import Leave from "./leave.model.js";

export default class leaveController {
  async getAll(req, res) {
    try {
      const allLeaves = await Leave.find({}).populate('employeeId');
      // const leaveData = await allLeaves.populate('Employee');
      return res.status(200).json({
        success: true,
        message: "Leave records fetched successfully",
        data: allLeaves,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch leave records",
        error: error.message,
      });
    }
  }

  async add(req, res) {
    try {
      const employeeId = req.user.id;
      const { leaveType, date, status } = req.body;
  
      const existingLeave = await Leave.findOne({ employeeId, date });
  
      if (existingLeave) {
        return res.status(400).json({
          success: false,
          message: "Leave record already exists for this date",
        });
      }
  
      const newLeave = await Leave.create({ employeeId, leaveType, date, status });
  
      return res.status(201).json({
        success: true,
        message: "Leave record created successfully",
        data: newLeave,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error creating leave record",
        error: error.message,
      });
    }
  }
  

  async update(req, res) {
    try {
      const leaveId = req.params.id;
      const updatedData = req.body;

      const updatedLeave = await Leave.findByIdAndUpdate(leaveId, updatedData, {
        new: true,
        runValidators: true,
      });

      if (!updatedLeave) {
        return res.status(404).json({
          success: false,
          message: "Leave record not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Leave record updated successfully",
        data: updatedLeave,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error updating leave record",
        error: error.message,
      });
    }
  }

  // async delete(req, res) {
  //   try {
  //     const leaveId = req.params.id;
  //     const deletedLeave = await Leave.findByIdAndDelete(leaveId);

  //     if (!deletedLeave) {
  //       return res.status(404).json({
  //         success: false,
  //         message: "Leave record not found",
  //       });
  //     }

  //     return res.status(200).json({
  //       success: true,
  //       message: "Leave record deleted successfully",
  //     });
  //   } catch (error) {
  //     return res.status(500).json({
  //       success: false,
  //       message: "Error deleting leave record",
  //       error: error.message,
  //     });
  //   }
  // }
}
