import React from 'react'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Iron() {



const navigate = useNavigate();
const [isloggedin,setIsLoggedin] = React.useState(false);
const [user,setUser] = React.useState('');
const [RoomNo,setRoomNo] = React.useState('');
const [clothesType,setClothesType] = React.useState('');
const [clothesCount,setClothesCount] = React.useState('');
const [pickupTime,setPickupTime] = React.useState('');
const [phone,setPhone] = React.useState('');
const [paymentMethod,setPaymentMethod] = React.useState('');
const [name,setName] = React.useState('');
const [order,setOrder] = React.useState('');
const [showMore,setShowMore] = React.useState('');

 const handleReset = () => {
    window.location.reload();
  };

  const handleHome =() =>{
    navigate('/home');
  };


const handleOrder = async () => {

      const total_amount = clothesCount* (Number(clothesType));
  const orderResponse = await axios.post('/api/create-Order',{amount:total_amount}); // ₹5.00 in paise = 500
  const {amount, currency } = orderResponse.data;
  const id = orderResponse.data.order.id;
  console.log(id);
  const options = {
    key: import.meta.env.VITE_RAZOR_PAY_KEY,
    amount,
    currency,
    name: "Ironing Service",
    description: "Payment for ironing clothes",
    order_id: id,
     handler: async function (response) {
    try {
      const verifyResponse = await axios.post('/api/verify-payment', {
     
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
      clothesCount,
      user,
      RoomNo,
      pickupTime,
      phone,
      amount: total_amount
    });

    if(verifyResponse.data.success === true){
        setOrder((prevOrder) => [...prevOrder,verifyResponse.data.newOrder])
    }
    alert("Payment Successful!");
    window.location.reload();
  } catch (err) {
    console.log(response.razorpay_signature);
    console.error("Error saving payment to DB:", err);
    alert("Payment processed but failed to save to database.");
  }
}
  };
  const rzp = new window.Razorpay(options);
  rzp.open();
};

























  const handleLogout = (e) =>{
    navigate('/logout');
  };

  React.useEffect(() => {
  const token = localStorage.getItem("token");

  if(!token){
    navigate('/login');
    return;
  }
  const verification = async () => {
    try {
      const response = await axios.get("/api/oldOrders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success && response.data.user.isAdmin === false) {
        setIsLoggedin(true);
        setName(response.data.user.name);
        setUser(response.data.user.email);
        setOrder(response.data.oldOrders);
        
        setRoomNo(response.data.user.RoomNo);
        // setComplaint(response.data.oldComplaints);

      } else {
        navigate('/login');
      }

    } catch (error) {
      console.error("Token verification failed:", error.response?.data || error.message);
      // setIsLoggedin(false); 
    }
  };

  verification(); // Call the function
}, []);




























const displayedOrders = showMore ? order : order.slice(0, 2);

const getStatusColorClasses = (color) => {
    switch(color) {
        case 'yellow':
            return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
        case 'green':
            return 'bg-green-500/20 text-green-400 border-green-500';
        case 'red':
            return 'bg-red-500/20 text-red-400 border-red-500';
        case 'blue':
            return 'bg-blue-500/20 text-blue-400 border-blue-500';
        default:
            return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
};

return (
    <>
        {isloggedin ?   <div className="m-0 p-0 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="w-full px-4 py-4 flex justify-between items-center">
        {/* Left side - HostelVista */}
        <div>
          <h1 className="text-3xl font-bold text-white">
            Iron<span className="text-purple-500">Up</span>
          </h1>
          {/* <p className="text-gray-300 text-sm">Hostel Iron Service</p> */}
        </div>
        
        {/* Right side - User info and logout */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-white font-medium">Welcome, {name || "Student"}</p>
            <p className="text-gray-300 text-sm">Room number - {RoomNo}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
          <button 
            onClick={handleHome}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Home
          </button>
        </div>
      </div>
            
            <div className="px-6 py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-4">Book Iron Service</h2>
                        <p className="text-gray-300 text-lg">Professional ironing service for hostel students - quick, affordable, and convenient</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
<div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 p-8 hover:bg-black/40 transition-all duration-300 hover:scale-105 cursor-pointer group flex flex-col h-full">
    <div className="text-center flex-1 flex flex-col">
        <div className="bg-blue-500/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500/30 transition-colors">
            <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m4 0H3a1 1 0 00-1 1v16a1 1 0 001 1h18a1 1 0 001-1V5a1 1 0 00-1-1zM8 8h8m-8 4h8m-8 4h5"></path>
            </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Cotton Clothes</h3>
        <p className="text-gray-300 mb-6 flex-1">Shirts, t-shirts, casual wear - ₹8 per piece</p>
    </div>
</div>

                        <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 p-8 hover:bg-black/40 transition-all duration-300 hover:scale-105 cursor-pointer group flex flex-col h-full">
                            <div className="text-center flex-1 flex flex-col">
                                <div className="bg-amber-500/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-500/30 transition-colors">
                                    <svg className="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">Formal Wear</h3>
                                <p className="text-gray-300 mb-6 flex-1">Dress shirts, trousers, blazers - ₹15 per piece</p>
                            </div>
                        </div>

                        <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 p-8 hover:bg-black/40 transition-all duration-300 hover:scale-105 cursor-pointer group flex flex-col h-full">
    <div className="text-center flex-1 flex flex-col">
        <div className="bg-purple-500/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-500/30 transition-colors">
            <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 8v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8M6 8V6c0-1.1.9-2 2-2h1V2h2v2h2V2h2v2h1c1.1 0 2 .9 2 2v2M6 8h12"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6M9 16h6"></path>
            </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Woolen Items</h3>
        <p className="text-gray-300 mb-6 flex-1">Sweaters, jackets, heavy fabrics - ₹25 per piece</p>
    </div>
</div>
                    </div>

                    <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
                        <h3 className="text-2xl font-bold text-white mb-6">Iron Service Order Details</h3>
                        
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-gray-300 font-medium mb-2">Number of Clothes *</label>
                                <input 
                                    type="number" 
                                    min="1"
                                    placeholder="Enter number of pieces"
                                    value={clothesCount}
                                    onChange={(e) => setClothesCount(e.target.value)}
                                    className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                                />
                            </div>
                            
                            
<div>
    <label className="block text-gray-300 font-medium mb-2">Type of Clothes *</label>
    <select className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
        style={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            color: 'white'
        }}
        value={clothesType}
        onChange={(e) => setClothesType(e.target.value)}
    >
        <option value="" style={{backgroundColor: '#3b82f6', color: 'white'}}>Select clothes type</option>
        <option value="8" style={{backgroundColor: '#3b82f6', color: 'white'}}>Cotton (₹8/piece)</option>
        <option value="15" style={{backgroundColor: '#3b82f6', color: 'white'}}>Formal Wear (₹15/piece)</option>
        <option value="25" style={{backgroundColor: '#3b82f6', color: 'white'}}>Woolen Items (₹25/piece)</option>
    </select>
</div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-gray-300 font-medium mb-2">Phone Number for Updates</label>
                                <input 
                                    type="tel" 
                                    placeholder="Enter your phone number"
                                    value = {phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                                />
                            </div>

                            
<div>
    <label className="block text-gray-300 font-medium mb-2">Pickup Time *</label>
    <select className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
        style={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            color: 'white'
        }}
        value={pickupTime}
        onChange={(e) => setPickupTime(e.target.value)}
    >
        <option value="" style={{backgroundColor: '#3b82f6', color: 'white'}}>Select pickup time</option>
        <option value="8:00 AM" style={{backgroundColor: '#3b82f6', color: 'white'}}>8:00 AM - 9:00 AM</option>
        <option value="10:00 AM" style={{backgroundColor: '#3b82f6', color: 'white'}}>10:00 AM - 11:00 AM</option>
        <option value="12:00 PM" style={{backgroundColor: '#3b82f6', color: 'white'}}>12:00 PM - 1:00 PM</option>
        <option value="2:00 PM" style={{backgroundColor: '#3b82f6', color: 'white'}}>2:00 PM - 3:00 PM</option>
        <option value="4:00 PM" style={{backgroundColor: '#3b82f6', color: 'white'}}>4:00 PM - 5:00 PM</option>
        <option value="6:00 PM" style={{backgroundColor: '#3b82f6', color: 'white'}}>6:00 PM - 7:00 PM</option>
    </select>
</div>
                        </div>

                        {/* <div className="mb-6">
                            <label className="block text-gray-300 font-medium mb-2">Special Instructions</label>
                            <textarea 
                                rows="4" 
                                placeholder="Any special instructions for ironing (e.g., extra starch, gentle pressing, etc.)"
                                //   value={instructions}
                                //   onChange={(e) => setInstructions(e.target.value)}
                                className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 resize-none">
                            </textarea>
                        </div> */}

                        <div className="grid md:grid-cols-2 gap-6 mb-6">

                            <div>
    <label className="block text-gray-300 font-medium mb-2">Payment Method *</label>
    <select className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
        style={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            color: 'white'
        }}
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
    >
        <option value="" style={{backgroundColor: '#3b82f6', color: 'white'}}>Select payment method</option>
        <option value="online" style={{backgroundColor: '#3b82f6', color: 'white'}}>Online Payment (UPI/Card)</option>
    </select>
</div>

                            {/* <div>
                                <label className="block text-gray-300 font-medium mb-2">Service Priority</label>
                                <select className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                                    // value = {priority}
                                    // onChange={(e) => setPriority(e.target.value)}
                                >     
                                    <option value="">Select priority</option>
                                    <option value="regular">Regular - 24 hours delivery</option>
                                    <option value="express">Express - Same day delivery (+₹5/piece)</option>
                                    <option value="urgent">Urgent - Within 6 hours (+₹10/piece)</option>
                                </select>
                            </div> */}
                        </div>

                        {/* <div className="mb-6">
                            <div className="bg-black/20 rounded-xl p-4 border border-white/10">
                                <h2 className="text-xl font-bold text-white mb-2">Upload Photos (Optional)</h2>
                                <p className="text-gray-400 text-sm mb-4">Upload photos of clothes for better service quality</p>
                                <Widget
                                    publicKey="5249cfcac3ae895834f5"
                                    onChange={handleChange}
                                    clearable
                                />
                            </div>
                        </div> */}


                        <div className="flex justify-center space-x-4">
                            <button onClick={handleOrder} className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
                                Place Iron Order
                            </button>
                            <button onClick={handleReset}  className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
                                Reset Form
                            </button>
                        </div>
                    </div>

                    <div className="mt-12 bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-white">Your Recent Iron Orders</h3>
                            {order.length > 2 && (
                                <button 
                                    onClick={() => setShowMore(!showMore)}
                                    className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 px-4 py-2 rounded-lg border border-purple-500/30 transition-colors"
                                >
                                    {showMore ? 'Show Less' : `Show More (${order.length - 2})`}
                                </button>
                            )}
                        </div>
                        
{displayedOrders.length > 0 ? (
    <div className="space-y-6">
        {displayedOrders.map((orderItem) => (
            <div 
                key={orderItem.id || orderItem._id} 
                className={`bg-black/20 rounded-xl p-6 border-l-4 ${getStatusColorClasses(orderItem.statusColor || 'gray').split(' ')[2]} hover:bg-black/30 transition-all duration-200`}
            >
                {/* Header Section */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/10 rounded-lg p-2">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h4 className="text-white font-semibold text-lg">
                            {orderItem.clothesCount} Pieces
                        </h4>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColorClasses(orderItem.statusColor || 'gray')}`}>
                        {orderItem.status || 'Pending'}
                    </span>
                </div>

                {/* Order Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Date & Time */}
                    <div className="flex items-center gap-2 text-gray-300">
                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div className="text-sm">
                            <span className="text-gray-400">Ordered:</span>{' '}
                            <span className="text-white">
                                {new Date(orderItem.dateOfRequest).toLocaleDateString("en-IN", {
                                    timeZone: "Asia/Kolkata",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                    hour12: true
                                })}
                            </span>
                        </div>
                    </div>

                    {/* Pickup Time */}
                    <div className="flex items-center gap-2 text-gray-300">
                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="text-sm">
                            <span className="text-gray-400">Pickup:</span>{' '}
                            <span className="text-white">{orderItem.pickupTime}</span>
                        </div>
                    </div>
                </div>

                {/* Payment Details */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-gray-300">
                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <span className="text-sm text-gray-400 font-mono">
                            Payment ID: {orderItem.paymentId}
                        </span>
                    </div>
                    <div className="text-right">
                        <span className="text-2xl font-bold text-green-400">₹{orderItem.amount}</span>
                        <p className="text-xs text-gray-400">Amount Paid</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
)  : (
                            <div className="text-center py-8">
                                <p className="text-gray-400 text-lg">No iron orders found</p>
                                <p className="text-gray-500 text-sm mt-2">Place your first iron order using the form above</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
         </div>:<h1>Still coming error </h1>}
    </>
)

}