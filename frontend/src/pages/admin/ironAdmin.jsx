import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function IronAdmin() {

    const navigate = useNavigate();
    const [isloggedin,setIsLoggedin] = React.useState(false)
    const [orders,setOrders] = React.useState([]);




  const handleLogout = () => {
    navigate('/logout');
  };

const handleUpdate = async (id, status) => {
  window.location.reload();
  const data = {
    id,
    status
  }
  try {
    const response = await axios.post('/api/updateOrders',data);

    if (response.data.success) {
      console.log("Complaint status updated successfully");

    } else {
      console.error("Failed to update complaint status");
    }
  } catch (error) {
    console.error("Error while updating:", error);
  }
};


  
React.useEffect(() => {
  const token = localStorage.getItem("token");

  if(!token ){
    setIsLoggedin(false);
    navigate('/IronAdminlogin');
    return;
  }

  const verification = async () => {
    try {
      const response = await axios.get("/api/verifyToken", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success && response.data.user.isAdmin === true && response.data.user.isIron === true) {
        setIsLoggedin(true);
      } else {
        setIsLoggedin(false);
        navigate('/IronAdminlogin');
      }
    } catch (error) {
      console.error("Token verification failed:", error.response?.data || error.message);
      // setIsLoggedin(false); 
    }
  };

  verification(); // Call the function
}, []);




React.useEffect(() => {
  const display = async () => {
    try {
      const response = await axios.get("/api/allOrders");

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        console.error("Fetching orders failed:", response.data.message);
      }

    } catch (error) {
      console.error("Error orders complaints:", error.response?.data || error.message);
    }
  };

  display();
}, []);














































  return (
    <>
    {isloggedin ?<div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 p-6 shadow-2xl w-full border-b border-purple-400/30 backdrop-blur-lg">
        <div className="flex justify-between items-center px-8 max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent">
                Iron<span className="text-purple-300">Up</span>
              </h1>
              <p className="text-purple-300 text-sm font-medium tracking-wide">Admin Laundry Management Portal</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3 bg-black/20 rounded-full px-4 py-2 backdrop-blur-sm border border-purple-400/30">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </div>
              <span className="text-white font-medium">Welcome, Admin</span>
            </div>
            <button onClick={handleLogout} className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25 font-medium">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Full Screen Orders Section */}
      <div className="flex-1 p-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="mb-8 text-center">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4">
              Orders Dashboard
            </h2>
            <p className="text-purple-300 text-lg font-light tracking-wide">Track and manage all laundry orders with precision</p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-500 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Enhanced Orders Table */}
          <div className="bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-purple-900/95 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-lg border border-purple-400/20 hover:shadow-purple-500/20 transition-shadow duration-500">
            {/* Table Header */}
            <div className="p-6 bg-gradient-to-r from-purple-800/50 to-blue-800/50 border-b border-purple-400/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-pulse"></div>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-wide">All Orders</h3>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-medium border border-green-400/30">
                    <span className="w-2 h-2 bg-green-400 rounded-full inline-block mr-2 animate-pulse"></span>
                    Live Updates
                  </div>
                </div>
              </div>
            </div>
            
            {/* Table Content */}
            <div className="">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-800 to-purple-900 border-b border-purple-400/20">
                  <tr>
                    <th className="text-left p-3 text-purple-200 font-semibold text-sm uppercase tracking-wider w-16">ID</th>
                    <th className="text-left p-3 text-purple-200 font-semibold text-sm uppercase tracking-wider w-32">Issued By</th>
                    <th className="text-left p-3 text-purple-200 font-semibold text-sm uppercase tracking-wider w-28">Payment ID</th>
                    <th className="text-left p-3 text-purple-200 font-semibold text-sm uppercase tracking-wider w-24">Amount</th>
                    <th className="text-left p-3 text-purple-200 font-semibold text-sm uppercase tracking-wider w-28">Status</th>
                    <th className="text-left p-3 text-purple-200 font-semibold text-sm uppercase tracking-wider w-28">Clothes Count</th>
                    <th className="text-left p-3 text-purple-200 font-semibold text-sm uppercase tracking-wider w-28">Pickup Time</th>
                    <th className="text-left p-3 text-purple-200 font-semibold text-sm uppercase tracking-wider w-32">Contact</th>
                    <th className="text-left p-3 text-purple-200 font-semibold text-sm uppercase tracking-wider w-32">Date of Order</th>
                    <th className="text-left p-3 text-purple-200 font-semibold text-sm uppercase tracking-wider w-24">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map through complaints array or show no orders message */}
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="p-12 text-center">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-slate-300 mb-2">No Orders Yet</h3>
                            <p className="text-slate-400 text-sm">All clear! No orders have been submitted.</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    orders.map((order, index) => (
                      <tr key={order._id} className="border-b border-purple-400/10 hover:bg-gradient-to-r hover:from-purple-800/20 hover:to-blue-800/20 transition-all duration-300 group">
                      <td className="p-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-xs">{index+1}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div>
                          <p className="text-white font-medium text-sm">{order.createdBy}</p>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="bg-slate-800/50 px-2 py-1 rounded border border-slate-600/50">
                          <p className="text-blue-300 font-mono text-xs">{order.paymentId}</p>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="bg-green-500/20 text-green-300 px-2 py-1 rounded border border-green-400/30">
                          <p className="font-semibold text-sm">{order.amount}</p>
                        </div>
                      </td>
                      <td className="p-3">
                        <select 
                        className={`bg-gradient-to-r ${order.statusColor} text-white px-3 py-2 rounded-lg text-xs border-none focus:outline-none font-medium cursor-pointer w-full`}
                           value={order.status}
                           onChange={(e) =>
                             setOrders((prev) =>
                               prev.map((c) =>
                                 c._id === order._id
                                   ? { ...c, status: e.target.value } // Update status only for this  order
                                   : c
                               )
                             )
                           }                   
                        >
                          <option value="Pending" >Pending</option>
                          <option value="In Process">Recieved clothes</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <div className="bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded border border-indigo-400/30">
                          <p className="font-medium text-sm">{order.clothesCount}</p>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded border border-purple-400/30">
                          <p className="font-medium text-sm">{order.pickupTime}</p>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="bg-slate-800/50 px-2 py-1 rounded border border-slate-600/50">
                          <p className="text-green-300 font-mono text-xs">{order.phone}</p>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-purple-200 text-xs">
                          <p className="font-medium">{new Date(order.dateOfRequest).toLocaleDateString("en-IN", {
                                                      timeZone: "Asia/Kolkata",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        second: "2-digit",
                                                        hour12: true
                                                    })}</p>
                        </div>
                      </td>
                      <td className="p-3">
                        <button onClick={() => handleUpdate(order._id, order.status)}
                         className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 py-1 rounded-lg text-xs transition-all duration-300 transform hover:scale-105 shadow-lg font-medium w-full">
                          Update
                        </button>
                      </td>
                    </tr>
                  )))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>:<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 p-12 text-center">
        
        <div className="mb-6">
          <h1 className="text-5xl font-bold text-white">
            Hostel<span className="text-purple-500">Vista</span>
          </h1>
          <p className="text-gray-300 text-lg mt-2">Student Complaint Portal</p>
        </div>
        
        
        <div className="mb-8">
          <div className="text-2xl font-semibold text-white mb-4">
            <span className="inline-block animate-pulse">Loading</span>
            <span className="inline-block animate-bounce ml-1">.</span>
            <span className="inline-block animate-bounce ml-1" style={{animationDelay: '0.1s'}}>.</span>
            <span className="inline-block animate-bounce ml-1" style={{animationDelay: '0.2s'}}>.</span>
          </div>
          
          
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
          </div>
        </div>
        
       
        <div className="w-64 mx-auto">
          <div className="bg-black/20 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        
        <p className="text-gray-400 mt-6 text-sm animate-pulse">
          Please wait while we set up your experience...
        </p>
      </div>
    </div>}
    </>
  );
};

