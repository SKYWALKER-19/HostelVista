import mongoose from "mongoose";


const WorkerSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true
  },
  role: {
    type: String, 
    // required: true
  },
  contact: {
    type: Number,
    // required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
   assignedComplaints: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Complaints'
    }
  ],

  isAvailable: {
    type: Boolean,
    default: true
  },
  isAdmin:{
    type:Boolean,
    default:true
  },
  isIron:{
    type:Boolean,
    default:false
  }
});

const WorkerModel = mongoose.model('workers',WorkerSchema);
export default WorkerModel;




