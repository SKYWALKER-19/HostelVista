import UserModel from "../models/user.js";
import crypto from "crypto";


import Razorpay from "razorpay";
// import "express" from express
import WorkerModel from "../models/worker.js";
import ComplaintModel from "../models/complaints.js";
import LaundryModel from "../models/ironing.js";
import { sendVerification } from "../middlewares/Email.config.js";
import { completed } from "../middlewares/Email.config.js";
import { orderCompleted } from "../middlewares/Email.config.js";
import { paymentCompleted } from "../middlewares/Email.config.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();




const signup = async(req,res) =>{

    try{
        const { name, email, password, FatherName, RoomNo, contact, history }   = req.body;
        const user = await UserModel.findOne({email});

        if(user){
            return res.status(409)
               .json({message:'User already exist, you can login',success:false});

        }
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();


        const userModel = new UserModel({
            name,
            email,
            password,
            FatherName,
            RoomNo,
            contact,
            history,
            verificationCode
        });
        userModel.password = await bcrypt.hash(password,10);
        userModel.isAdmin = false;
        sendVerification(userModel.email,verificationCode);
        userModel.verificationCode = await bcrypt.hash(verificationCode,10);
        await userModel.save();
        res.status(201)
            .json({message : "signup successfull",
                success:true,
                data: userModel
            })
            
    } catch (err){

        res.status(500)
          .json({
               message:"Internal Server error",
               success: false
          })
    }

}


const login = async(req,res) =>{

    try{
        const { email,password  }  = req.body;
        const user = await UserModel.findOne({email});
        const errMsg = 'Auth failed email or password is wrong';
        if(!user){
            return res.status(409)
               .json({message:errMsg,success:false});

        }

        const isPassEqual = await bcrypt.compare(password,user.password);
        if(!isPassEqual){
            return res.status(409)
               .json({message:errMsg,success:false});
        }

        const jwtToken =  jwt.sign(
            {email:user.email, _id: user._id, isAdmin:user.isAdmin,name:user.name,RoomNo:user.RoomNo},
            process.env.JWT_SECRET,
            { expiresIn : '12h'}
        ) 

        res.status(200)
            .json({message : "login successfull",
                success:true,
                token:jwtToken,
                email,
                id:user._id,
                name: user.name
            })
    } catch (err){

        res.status(500)
          .json({
               message:"Internal Server error",
               success: false
          })
    }

}

// Worker login and signup


const Adminsignup = async(req,res) =>{

    try{
        const { email,password }  = req.body;
        const worker= await WorkerModel.findOne({email});

        if(worker){
            return res.status(409)
               .json({message:'User already exist, you can login',success:false});

        }
        const workerModel = new WorkerModel(req.body);
        workerModel.password = await bcrypt.hash(password,10);
        await workerModel.save();
        res.status(201)
            .json({message : "signup successfull",
                success:true
            })
            
    } catch (err){
      console.log(err);
        res.status(500)
          .json({
               message:"Internal Server error",
               success: false
          })
    }

}



const Adminlogin = async(req,res) =>{

    try{
        const { email,password  }  = req.body;
        const admin = await WorkerModel.findOne({email});
        const errMsg = 'Auth failed email or password is wrong';
        if(!admin){
            return res.status(409)
               .json({message:errMsg,success:false});

        }

        const isPassEqual = await bcrypt.compare(password,admin.password);
        if(!isPassEqual){
            return res.status(409)
               .json({message:errMsg,success:false});
        }

        const jwtToken =  jwt.sign(
            {email:admin.email ,isAdmin:admin.isAdmin,_id:admin._id,isIron:admin.isIron},
            process.env.JWT_SECRET,
            { expiresIn : '12h'}
        ) 

        res.status(200)
            .json({message : "login successfull",
                success:true,
                token:jwtToken,
                email:email,
            })
            
    } catch (err){

        res.status(500)
          .json({
               message:"Internal Server error",
               success: false
          })
    }

}



// Relation checking

const Newcomplaint = async(req,res)=>{


    try {

    const user = await UserModel.findById(req.user._id); 

    const complaintModel = new ComplaintModel(req.body);
    const workers = await WorkerModel.find({role:req.body.category});
    const worker = workers[0];
    complaintModel.createdBy = user.email;
    complaintModel.assignedTo = worker.name;
    complaintModel.RoomNo = user.RoomNo;
    complaintModel.workerContact = worker.contact;
    await complaintModel.save();
    worker.assignedComplaints.push(complaintModel._id);
    await worker.save();
    user.history.push(complaintModel._id);
    // const aComplaints = await ComplaintModel.find({ createdBy:user.email });
    const Newcomplaint = complaintModel;
    await user.save();

          res.status(201)
            .json({message : "The prcoess was fully successfull",
                success:true,
                user:req.user,
                newComplaint: Newcomplaint
            })


    } catch (error) {

        res.status(500)
          .json({
            message:"Internal Server Error",
            success:false
          })
        
    }
}



const oldComplaint = async(req,res)=>{

  try {

     const user = await UserModel.findById(req.user._id);
     const oldComplaints = await ComplaintModel.find({ createdBy:user.email });
     
     
     
          res.status(201)
            .json({message : "The process was fully successfull",
                success:true,
                user:user,
                oldComplaints:oldComplaints,
            })


    
  } catch (error) {
    console.log(error);
    res.status(500)
          .json({
            message:"Internal Server Error",
            success:false
          })
    
  }


}






const allComplaint = async(req,res)=>{

  try {

     const complaints = await ComplaintModel.find();
          res.status(201)
            .json({message : "The process was fully successfull",
                success:true,
                complaints:complaints
                
            })

  } catch (error) {
    console.log(error);
    res.status(500)
          .json({
            message:"Internal Server Error",
            success:false
          })
    
  }


}






const updateComplaint = async(req,res) =>{
  try {

    const response = req.body;
    // console.log(response.id);
    const complaint = await ComplaintModel.findById(response.id);
    complaint.status = response.status;
    if(response.status === "Completed"){
      completed(complaint.createdBy,complaint.RoomNo);
    }
    await complaint.save();

     res.status(201)
    .json({message : "The process was fully successfull",
        success:true
    })
  } catch (error) {
    console.log(error);
    res.status(500)
          .json({
            message:"Internal Server Error",
            success:false
          })
  }
}


// const laundry = async(req,res)=>{
    


//     try {
//     const users = await UserModel.find();
//     const user1= users[0];
//     const laundryModel = new LaundryModel(req.body);
//     laundryModel.studentId = user1._id;
//     await laundryModel.save();
//     user1.history.push(laundryModel._id);
//     await user1.save();


//           res.status(201)
//             .json({message : "The prcoess was fully successfull",
//                 success:true
//             })

    
    
//     } catch (error) {

//         res.status(500)
//           .json({
//             message:"Internal Server Error",
//             success:false
//           })
        
//     }
// }

const verifyOtp = async (req, res) => {
  try {
    const { pin , email } = req.body;
    

    const user = await UserModel.findOne( {email} );
    if (user) {

      if(!user.verificationCode){
        return res.status(400).json({
          success:false,
          message:"No verification code is available for this "
        });
      }
      
      const isPassEqual = await bcrypt.compare(pin, user.verificationCode);

      if(isPassEqual){

        user.isVerified  = true;
        user.verificationCode = undefined;
        await user.save();
        return res.status(200).json({
        success: true,
        message: "You are successfully verified",
           });

      }
      else{
        await user.deleteOne();
        return res.status(200).json({
        success: false,
        message: "Invalid OTP or expired code. Register again.",
      });
      }
    } else {
        // user.email = undefined;
        // user.isVerified = false;
      return res.status(200).json({
        success: false,
        message: "Invalid OTP or expired code. Register again.",
      });
    }
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const createOrder = async(req,res) =>{


  const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
  });


  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    // console.log(order);
    res.json({
      success: true,
      order
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}



const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      clothesCount,
      amount,
      pickupTime,
      phone,
      user,
      RoomNo
    } = req.body;

    // console.log("Received verify-payment request:", req.body);

    // Step 1: Signature verification
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");



    if (generatedSignature !== razorpay_signature) {
      console.error("Signature verification failed!");
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }


    paymentCompleted(user,razorpay_order_id,razorpay_payment_id,pickupTime,clothesCount,RoomNo);
    
    try {
      const newOrder = await LaundryModel.create({
        clothesCount,
        createdBy:user,
        RoomNo: Number(RoomNo), // ensure numeric
        phone: Number(phone),   // ensure numeric
        pickupTime,
        paymentId: razorpay_payment_id,
        amount,
        status: "pending"
      });

      console.log("Order saved successfully:", newOrder);
      return res.json({ success: true, message: "Payment verified & order saved", newOrder : newOrder });

    } catch (dbErr) {
      console.error("Database save error:", dbErr);
      return res.status(500).json({ success: false, message: "Database save failed", error: dbErr.message });
    }

  } catch (err) {
    console.error("Unexpected error in verify-payment:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};





const oldOrders = async(req,res)=>{

    try {

     const user = await UserModel.findById(req.user._id);
     const oldOrders = await LaundryModel.find({ createdBy:user.email });

          res.status(201)
            .json({message : "The process was fully successfull",
                success:true,
                user:user,
                oldOrders:oldOrders
            })

  } catch (error) {
    console.log(error);
    res.status(500)
          .json({
            message:"Internal Server Error",
            success:false
          })
    
  }
}


const allOrders = async(req,res)=>{

   try {

     const orders = await LaundryModel.find();
          res.status(201)
            .json({message : "The process was fully successfull",
                success:true,
                orders:orders
                
            })

  } catch (error) {
    console.log(error);
    res.status(500)
          .json({
            message:"Internal Server Error",
            success:false
          })
    
  }
}








const updateOrders = async(req,res) =>{
  try {

    const response = req.body;
    // console.log(response.id);
    // console.log(response.status);
    const order = await LaundryModel.findById(response.id);
    order.status = response.status;
    if(response.status === "Completed"){
      orderCompleted(order.createdBy,order.RoomNo,order.clothesCount);
    }
    await order.save();

     res.status(201)
    .json({message : "The process was fully successfull",
        success:true
    })
  } catch (error) {
    console.log(error);
    res.status(500)
          .json({
            message:"Internal Server Error",
            success:false
          })
  }
}


























































export {signup,login,Adminlogin,Adminsignup,Newcomplaint,verifyOtp,oldComplaint,allComplaint,updateComplaint,createOrder,verifyPayment,oldOrders,allOrders,updateOrders};
