import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', 
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  clockIn: {
    type: Date,
    required: true,
  },
  clockOut: {
    type: Date,
  },
  totalHours: {
    type: Number, 
  },
});

attendanceSchema.methods.calculateTotalHours = function () {
  if (this.clockIn && this.clockOut) {
    const diffInMs = this.clockOut - this.clockIn;
    this.totalHours = diffInMs / (1000 * 60 * 60); 
  }
};

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
