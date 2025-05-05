const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: { 
    type: String, 
    required: [true, 'Phone number is required'],
    trim: true
  },
  position: { 
    type: String, 
    required: [true, 'Position is required'],
    trim: true
  },
  department: { 
    type: String, 
    required: [true, 'Department is required'],
    trim: true
  },
  status: { 
    type: String, 
    enum: {
      values: ['active', 'inactive'],
      message: '{VALUE} is not supported'
    },
    default: 'active'
  },
  hireDate: { 
    type: Date, 
    default: Date.now 
  },
  employeeType: { 
    type: String, 
    required: [true, 'Employee type is required'],
    enum: {
      values: ['Full-time', 'Part-time', 'Contract'],
      message: '{VALUE} is not a valid employee type'
    }
  },
  address: { 
    type: String, 
    required: [true, 'Address is required'],
    trim: true
  },
  profilePic: { 
    type: String,
    default: 'https://randomuser.me/api/portraits/lego/1.jpg'
  }
}, {
  timestamps: true
});

// Add indexes for better search performance
employeeSchema.index({ 
  name: 'text', 
  email: 'text', 
  position: 'text', 
  department: 'text' 
});

module.exports = mongoose.model('Employee', employeeSchema); 