import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get token from headers

  if (!token) {
    return res.status(401).json({ message: "No token provided",
        success:false
     });
  }

  try {
    const decoded = jwt.verify(token,  process.env.JWT_SECRET); // Replace with your secret
    req.user = decoded;

    return res.status(201).json({
        user:req.user,
        success:true,
        message:"Valid and verified token"
    })
  
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
