import Attendance from "./attendance.model.js";

export default class attendanceController {
  async markAttendance(req, res) {
    const { employeeId, clockIn, clockOut } = req.body;

    try {
      const attendance = await Attendance.findOne({
        employeeId,

        date: new Date().toISOString().split("T")[0],
      });

      if (!attendance) {
        const newAttendance = new Attendance({
          employeeId,
          clockIn: new Date(clockIn),
        });
        await newAttendance.save();
        res
          .status(201)
          .json({
            message: "Clocked in successfully",
            attendance: newAttendance,
          });
      } else if (clockOut) {
        attendance.clockOut = new Date(clockOut);
        attendance.calculateTotalHours();
        await attendance.save();
        res
          .status(200)
          .json({ message: "Clocked out successfully", attendance });
      } else {
        res.status(400).json({ message: "Already clocked in today" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error marking attendance", error: err.message });
    }
  }

  async viewAttendance(req,res){
    async (req, res) => {
      const { employeeId, startDate, endDate } = req.query;
    
      try {
        const query = {
          employeeId: employeeId ? employeeId : undefined,
        };
        
        if (startDate && endDate) {
          query.date = { 
            $gte: new Date(startDate), 
            $lte: new Date(endDate) 
          };
        }
    
        const attendanceRecords = await Attendance.find(query).populate('employeeId');
        res.status(200).json(attendanceRecords);
      } catch (err) {
        res.status(500).json({ message: 'Error fetching attendance records', error: err.message });
      }
  }
}
}