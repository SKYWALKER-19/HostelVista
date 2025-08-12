
import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    required :true,
  },
  email:{
    type:String,
    unique:true
  },
  password:{
    type:String,
    required: true
  },
  contact:{
    type:Number,
    required:true,
  },
  RoomNo:{
    type:Number,
    required:true,
  },
  history:[
  {
    type: mongoose.Schema.Types.ObjectId,
  }
  ],
  FatherName:{
    type:String,
    required:true,
  },
  verificationCode:{
    type:String
  },
  isVerified:{
    type:Boolean
  },
  isAdmin:{
    type:Boolean,
    default:false
  }


});

const UserModel = mongoose.model('users',UserSchema);
export default UserModel;
