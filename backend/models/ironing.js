import mongoose from "mongoose";

const laundrySchema = new mongoose.Schema({
  createdBy: {
    type:String
  },
  RoomNo:{
    type:Number
  },
  clothesCount: Number,
  dateOfRequest: {
    type: Date,
    default: Date.now
  },
  // scheduledDate: Date,
  pickupTime:{
    type:String
  },
  phone:{
    type:Number
  },
  status: {
    type: String,
    default: 'Pending'
  },
  amount: {
    type: Number,
    default: 0
  },
  paymentId:{
    type:String,
  },


});

const LaundryModel = mongoose.model("laundry",laundrySchema);
export default LaundryModel;
