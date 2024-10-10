import Leave from "./leave.model.js";

export default class leaveController {
  async getAll(req, res) {
    try {
      const allLeaves = await Leave.find({});
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
      const { leaveType, date, status } = req.body;
      const newLeave = await Leave.create({ leaveType, date, status });

      if (!newLeave) {
        return res.status(400).json({
          success: false,
          message: "Failed to create leave record",
        });
      }

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
