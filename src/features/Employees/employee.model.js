import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  officeId:{
  type:String,
  default: () => Date.now(),
  required:true,
  unique:true
  },
  designation: {
    type: String,
    required: true,
    trim: true,
  },
  password:{
    type:String,
    
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  contactDetails: {
    phone: {
      type: String,
      required: true,
      unique:true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique:true,
      match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
    },
  },
  role: {
    type: String,
    default: 'employee',
    immutable: true 
  }
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
