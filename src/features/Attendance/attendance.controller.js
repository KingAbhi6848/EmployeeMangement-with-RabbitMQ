import Attendance from "./attendance.model.js";

export default class attendanceController {
     async markAttendance(req, res) {
    const userId = req.user.id;
    const currentDate = new Date().setHours(0, 0, 0, 0); 
  
    try {
      const existingAttendance = await Attendance.findOne({employeeId: userId, date: currentDate });
      if (existingAttendance) {
        return res.status(400).json({ message: 'Attendance already marked for today' });
      }
  
      const attendance = await Attendance.create({employeeId: userId, date: currentDate, status: 'Present' });
      await attendance.save();
      
      res.status(200).json({ message: 'Attendance marked successfully', attendance });
    } catch (error) {
      res.status(500).json({ message: 'Error marking attendance', error: error.message });
    }
  };

  async viewAttendance(req,res){
    const userId = req.user.id;
  
    try {
      const attendanceRecords = await Attendance.find({employeeId: userId }).sort({ date: -1 });
      res.status(200).json(attendanceRecords);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving attendance', error: error.message });
    }
}
}