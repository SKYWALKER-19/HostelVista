import express from 'express'
import { signupValidation, loginupValidation , AdminloginupValidation,} from '../middlewares/AuthValidation.js'
import { login,Newcomplaint,signup,Adminlogin,Adminsignup,verifyOtp, oldComplaint,allComplaint,updateComplaint,createOrder,verifyPayment,oldOrders, allOrders, updateOrders} from '../controllers/AuthController.js'
import { verifyToken } from '../middlewares/verifyToken.js';
import { verifyTokenNew } from '../middlewares/verifyTokenNew.js';

const router = express.Router();
router.get('/oldOrders',verifyTokenNew,oldOrders);
router.post('/signup',signupValidation,signup);
router.get('/oldComplaints',verifyTokenNew,oldComplaint);
router.get('/allComplaints',allComplaint);
router.get('/allOrders',allOrders)
router.post('/updateComplaint',updateComplaint);
router.post('/updateOrders',updateOrders);
router.get('/verifyToken',verifyToken);
router.post('/verifyOtp',verifyOtp)
router.post('/login',loginupValidation,login);
router.post('/Adminsignup',Adminsignup);
router.post('/Adminlogin',AdminloginupValidation,Adminlogin);
router.post('/complaints',verifyTokenNew,Newcomplaint);
router.post('/create-Order',createOrder);
router.post('/verify-payment',verifyPayment)

export default router;
