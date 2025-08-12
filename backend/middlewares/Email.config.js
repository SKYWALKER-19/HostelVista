import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();



const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP,
    pass: process.env.PASS,
  },
});

export const sendVerification = async(email,verificationCode) =>{

    try {
        const info = await transporter.sendMail({
    from: 'HostelVista" <hostelvista4@gmail.com>',
    to: email,
    subject: "Verify your email",
     text: `Your One-Time Password (OTP) is ${verificationCode}. Please use this code to complete your verification. Do not share it with anyone.`,
     html: `<p>Your One-Time Password (OTP) is <strong>${verificationCode}</strong>.</p>
       <p>Please enter this code to complete your verification. <br>
       <em>Do not share this code with anyone for security reasons.</em></p>`
  });



    } catch (error) {
        console.log(error);
    }
}



export const completed = async(email,roomNumber) =>{

    try {
        const info = await transporter.sendMail({
    from: 'HostelVista" <hostelvista4@gmail.com>',
    to: email,
    subject: "Good news — your complaint has been resolved",
    text: `Hello,

Your complaint regarding room no. ${roomNumber} has been successfully resolved.

If you have any further issues or feedback, feel free to reach out again.

Thank you for using HostelVista!

Best regards,
HostelVista Team`,
html: `<p>Hello,</p>
<p>Your complaint regarding <strong>room no. ${roomNumber}</strong> has been <strong>successfully resolved</strong>.</p>
<p>If you have any further issues or feedback, feel free to submit another complaint.</p>
<p>Thank you for using <strong>HostelVista</strong>!</p>
<p>Best regards,<br>HostelVista Team</p>`

  });
    } catch (error) {
        console.log(error);
    }
}



export const orderCompleted = async(email,RoomNo,clothesCount) =>{

    try {
        const info = await transporter.sendMail({
    from: 'HostelVista" <hostelvista4@gmail.com>',
    to: email,
    subject: "Good news — your laundry has been ironed & delivered! 👔✨",
    text: `Hello,

Great news — your clothes have been freshly ironed and delivered to your room (Room No. ${RoomNo}).

Items delivered:
${clothesCount}

We hope you’re happy with our service! If you notice anything missing or have any concerns, feel free to let us know.

Warm regards,  
HostelVista Team`
  });
    } catch (error) {
        console.log(error);
    }
}








export const paymentCompleted = async(email,orderId,paymentId,pickupTime,clothesCount,RoomNo) =>{

    try {
        const info = await transporter.sendMail({
    from: 'HostelVista" <hostelvista4@gmail.com>',
    to: email,
    subject: "Payment Confirmation - Thank You for Your Order",
    text: `Dear Customer,

We are pleased to inform you that your payment has been successfully processed.  
Here are your payment and order details:

- Payment ID: ${paymentId}
- Order ID: ${orderId}
- Pickup Time: ${pickupTime}
- Clothes Count: ${clothesCount}
- Room Number: ${RoomNo}

Your order has been confirmed and will be processed as per the provided pickup time.  
If you have any questions or need to make changes, please contact our support team at support@example.com.

Thank you for choosing our service. We look forward to serving you again.

Best regards,
HostelVista Team
`
  });
    } catch (error) {
        console.log(error);
    }
}

