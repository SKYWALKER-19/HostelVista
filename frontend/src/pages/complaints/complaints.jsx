import React from 'react';
import axios from 'axios';
import { Widget } from '@uploadcare/react-widget';
import { useNavigate } from "react-router-dom";





export default function Complaints() {



   const navigate = useNavigate();
   const [complaint, setComplaint] = React.useState([]);
   const [isloggedin,setIsLoggedin] = React.useState(false);
   const [priority,setPriority] = React.useState('');
   const [category,setCategory] = React.useState('');
   const [description,setDescription] = React.useState('');
   const [availability,setAvailabilty] = React.useState('');
   const [phone,setPhone] = React.useState('');
   const [user,setUser] = React.useState('');
   const [RoomNo,setRoomNo] = React.useState('');
   const [submit,setSubmit] = React.useState(false);
   const [showMore, setShowMore] = React.useState(false);
   const [imageUrl,setImageUrl] = React.useState('');

 
   const handleChange = (fileInfo) => {
         console.log('Uploaded file info:', fileInfo);
         setImageUrl(fileInfo.cdnUrl);
         alert(`File URL: ${fileInfo.cdnUrl}`);
   };

 const handleReset = () => {
    window.location.reload();
  };

  const handleHome =() =>{
    navigate('/home');
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
      const response = await axios.get("/api/oldComplaints", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
       if (response.data.success && response.data.user.isAdmin === true){
        navigate('/login');
        return null;
       }

      if (response.data.success && response.data.user.isAdmin === false) {
        setIsLoggedin(true);
        setUser(response.data.user.name);
        setRoomNo(response.data.user.RoomNo);
        setComplaint(response.data.oldComplaints);

      } 

    } catch (error) {
      console.error("Token verification failed:", error.response?.data || error.message);
      // setIsLoggedin(false); 
    }
    finally {
      setLoading(false);
    }
  };

  verification(); // Call the function
}, []);




















const handleSubmit = async () => {

const formData = {
      description,
      category,
      availability,
      priority,
      phone,
      imageUrl
    };
   try {
        const token = localStorage.getItem("token"); 
        const response = await axios.post('/api/complaints', formData, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        if (response.data.success && response.data.user.isAdmin == false) {
            setComplaint((prevComplaints) => [...prevComplaints,response.data.newComplaint]);
            alert("Complaint submitted successfully!");
            window.location.reload();
        } else {
          alert("Complaint submission failed");
          navigate('/login');
        }
      } catch (error) {
        navigate('/complaints');
        console.log(error);
      }
};



const displayedComplaints = showMore ? complaint : complaint.slice(0, 3);

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
            Hostel<span className="text-purple-500">Vista</span>
          </h1>
          <p className="text-gray-300 text-sm">Student Complaint Portal</p>
        </div>
        
        {/* Right side - User info and logout */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-white font-medium">Welcome, {user || "Student"}</p>
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
                        <h2 className="text-4xl font-bold text-white mb-4">Submit Your Complaint</h2>
                        <p className="text-gray-300 text-lg">Choose the type of problem you're experiencing and provide details</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 mb-12">

<div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 p-8 hover:bg-black/40 transition-all duration-300 hover:scale-105 cursor-pointer group flex flex-col h-full">
    <div className="text-center flex-1 flex flex-col">
        <div className="bg-blue-500/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500/30 transition-colors">
            <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Plumbing & Drainage</h3>
        <p className="text-gray-300 mb-6 flex-1">Water leakage, drainage issues, pipe problems, or any plumbing related complaints</p>
    </div>
</div>

                        <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 p-8 hover:bg-black/40 transition-all duration-300 hover:scale-105 cursor-pointer group flex flex-col h-full">
                            <div className="text-center flex-1 flex flex-col">
                                <div className="bg-amber-500/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-500/30 transition-colors">
                                    <svg className="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 18.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655-5.653a2.548 2.548 0 010-3.586l.823-.823a2.548 2.548 0 013.586 0l5.653 4.655-3.586 3.586z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">Woodwork Repairs</h3>
                                <p className="text-gray-300 mb-6 flex-1">Furniture repair, door/window issues, wooden fixtures, or carpentry work needed</p>
                            </div>
                        </div>

                        <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 p-8 hover:bg-black/40 transition-all duration-300 hover:scale-105 cursor-pointer group flex flex-col h-full">
                            <div className="text-center flex-1 flex flex-col">
                                <div className="bg-yellow-500/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow-500/30 transition-colors">
                                    <svg className="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">Electrical Works</h3>
                                <p className="text-gray-300 mb-6 flex-1">Power outage, switch/socket issues, fan problems, or electrical maintenance</p>
                            </div>
                        </div>

                        <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 p-8 hover:bg-black/40 transition-all duration-300 hover:scale-105 cursor-pointer group flex flex-col h-full">
                            <div className="text-center flex-1 flex flex-col">
                                <div className="bg-green-500/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500/30 transition-colors">
                                    <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path>
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">Wi-Fi Maintenance</h3>
                                <p className="text-gray-300 mb-6 flex-1">Internet connectivity issues, slow speed, or WiFi network problems</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
                        <h3 className="text-2xl font-bold text-white mb-6">Complaint Details</h3>
                        
                        <div className="grid md:grid-cols-2 gap-6 mb-6">

<div>
    <label className="block text-gray-300 font-medium mb-2">Problem Type *</label>
    <select className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
        style={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            color: 'white'
        }}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
    >
        <option value="" style={{backgroundColor: '#3b82f6', color: 'white'}}>Select problem type</option>
        <option value="Plumbing" style={{backgroundColor: '#3b82f6', color: 'white'}}>Plumbing</option>
        <option value="Carpentry" style={{backgroundColor: '#3b82f6', color: 'white'}}>Carpenter</option>
        <option value="Electricity" style={{backgroundColor: '#3b82f6', color: 'white'}}>Electricity</option>
        <option value="WiFi" style={{backgroundColor: '#3b82f6', color: 'white'}}>WiFi</option>
    </select>
</div>
                            
                            <div>
    <label className="block text-gray-300 font-medium mb-2">Priority Level *</label>
    <select className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
        style={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            color: 'white'
        }}
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
    >
        <option value="" style={{backgroundColor: '#3b82f6', color: 'white'}}>Select priority</option>
        <option value="low" style={{backgroundColor: '#3b82f6', color: 'white'}}>Low - Can wait a few days</option>
        <option value="medium" style={{backgroundColor: '#3b82f6', color: 'white'}}>Medium - Needs attention soon</option>
        <option value="high" style={{backgroundColor: '#3b82f6', color: 'white'}}>High - Urgent issue</option>
        <option value="emergency" style={{backgroundColor: '#3b82f6', color: 'white'}}>Emergency - Immediate attention</option>
    </select>
</div>
                </div>

                        <div className="mb-6">
                            <label className="block text-gray-300 font-medium mb-2">Problem Description *</label>
                            <textarea 
                                rows="5" 
                                placeholder="Please describe your problem in detail..."
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}
                                className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 resize-none">
                            </textarea>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-300 font-medium mb-2">Phone Number for Updates</label>
                            <input 
                                
                                type="tel" 
                                placeholder="Enter your phone number"
                                value = {phone}
                                onChange={(e) => setPhone(e.target.value)}
                                
                                className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                            />
                        </div>

                        <div className="mb-6">
                            <div className="bg-black/20 rounded-xl p-4 border border-white/10">
                                <h2 className="text-xl font-bold text-white mb-2">Upload File</h2>
                                
                                <Widget
                                    publicKey= {import.meta.env.VITE_UPLOAD_CARE_KEY}
                                    onChange={handleChange}
                                    clearable
                                />
                            </div>
                        </div>

                        
<div className="mb-6">
    <label className="block text-gray-300 font-medium mb-2">Your Availability for Service</label>
    <select className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
        style={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            color: 'white'
        }}
        value={availability}
        onChange={(e) => setAvailabilty(e.target.value)}
    >
        <option value="" style={{backgroundColor: '#3b82f6', color: 'white'}}>Select your availability</option>
        <option value="always" style={{backgroundColor: '#3b82f6', color: 'white'}}>Always available (keys with reception)</option>
        <option value="morning" style={{backgroundColor: '#3b82f6', color: 'white'}}>Morning (8 AM - 12 PM)</option>
        <option value="afternoon" style={{backgroundColor: '#3b82f6', color: 'white'}}>Afternoon (12 PM - 4 PM)</option>
        <option value="evening" style={{backgroundColor: '#3b82f6', color: 'white'}}>Evening (4 PM - 8 PM)</option>
        <option value="weekend" style={{backgroundColor: '#3b82f6', color: 'white'}}>Weekends only</option>
        <option value="emergency" style={{backgroundColor: '#3b82f6', color: 'white'}}>Emergency - come anytime</option>
    </select>
</div>

                        <div className="flex justify-center space-x-4">
                            <button onClick={handleSubmit} className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
                                Submit Complaint
                            </button>
                            <button onClick={handleReset} className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
                                Reset Form
                            </button>
                        </div>
                    </div>

                    <div className="mt-12 bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-white">Your Recent Complaints</h3>
                            {complaint.length > 3 && (
                                <button 
                                    onClick={() => setShowMore(!showMore)}
                                    className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 px-4 py-2 rounded-lg border border-purple-500/30 transition-colors"
                                >
                                    {showMore ? 'Show Less' : `Show More (${complaint.length - 3})`}
                                </button>
                            )}
                        </div>
                        
                        {displayedComplaints.length > 0 ? (
                            <div className="space-y-4">
                                {displayedComplaints.map((complaintItem) => (
                                    <div key={complaintItem.id || complaintItem._id} className={`bg-black/20 rounded-xl p-4 border-l-4 ${getStatusColorClasses(complaintItem.statusColor || 'gray').split(' ')[2]}`}>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-white font-semibold">{complaintItem.category} Problem </h4>
                                                <p className="text-gray-300 text-sm mt-1">
                                                    Submitted on: {new Date(complaintItem.createdAt).toLocaleDateString("en-IN", {
                                                      timeZone: "Asia/Kolkata",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        second: "2-digit",
                                                        hour12: true
                                                    })} | Priority: {complaintItem.priority}
                                                </p>
                                                <p className="text-gray-400 text-sm mt-2">{complaintItem.description}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColorClasses(complaintItem.statusColor || 'gray')}`}>
                                                {complaintItem.status || 'Pending'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-400 text-lg">No complaints found</p>
                                <p className="text-gray-500 text-sm mt-2">Submit your first complaint using the form above</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>:<h1>Still coming error </h1>}
    </>
)
}











