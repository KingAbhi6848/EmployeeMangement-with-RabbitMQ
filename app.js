import express from 'express';
import db from './src/config/mongoose.js';
import employeeRoute from './src/features/Employees/employee.route.js';
import leaveRoute from './src/features/Leaves/leave.route.js';
import attendanceRoute from './src/features/Attendance/attendance.route.js';
import userRoute from './src/features/Users/user.route.js';
const app = express();
const port = 2000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api/employee', employeeRoute);
app.use('/api/leave', leaveRoute);
app.use('/api/attendance', attendanceRoute);
app.use('/api/user', userRoute);



app.listen(port , (err)=>{
  if(err){
    console.log("Error in Starting a Server on Port",port);
  }
  console.log("Server Started Succesfully on Port:-",port);
})