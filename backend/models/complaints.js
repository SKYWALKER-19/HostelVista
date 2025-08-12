import mongoose from 'mongoose';

const ComplaintSchema = new mongoose.Schema({


  description: {
    type: String,
    required: true
  },

  category: {
    type: String,
    // enum: ['Plumbing', 'WiFi', 'Electricity', 'Carpentry', 'Other'],
    required: true
  },

  status: {
    type: String,
    default: 'Pending'
  },

  createdBy: {
    type:String
  },

  assignedTo: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  priority:{
    type :String
  },

  availability:{
    type:String
  },
  phone:{
    type:Number
  },
  RoomNo:{
    type: Number
  },  
  imageUrl: {
    type: String,
    required: false // 👈 Optional in case some complaints have no image
  },
  workerContact:{
    type:Number
  }
  
});

const ComplaintModel = mongoose.model("complaints",ComplaintSchema);
export default ComplaintModel;
