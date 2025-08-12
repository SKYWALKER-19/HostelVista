
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import axios from "axios";
import { Building2, Users, ClipboardCheck, Settings, Zap, Wifi, Wrench, Droplets, Star, ArrowRight, Clock, Shield, Bell } from 'lucide-react';


import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

export default function Home(){

  const navigate = useNavigate();

const [isloggedin,setIsLoggedin] = React.useState(false)


const handleLaundry = ()=>{
  navigate('/IronUp')
}

const handleComplaints = () =>{
  navigate('/complaints');
}




React.useEffect(() => {
  const token = localStorage.getItem("token");

  if(!token ){
    setIsLoggedin(false);
    return;
  }
  const verification = async () => {
    try {
      const response = await axios.get("/api/verifyToken", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success && response.data.user.isAdmin === false) {
        setIsLoggedin(true);
      } else {
        setIsLoggedin(false);
      }
    } catch (error) {
      console.error("Token verification failed:", error.response?.data || error.message);
      // setIsLoggedin(false); 
    }
  };

  verification(); // Call the function
}, []);

  return (

    <>
       {isloggedin ? 
  <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 m-0 p-0 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 w-full z-50 bg-black/20 backdrop-blur-lg shadow-lg border-b border-white/10">
        <div className="flex items-center space-x-2 absolute top-3 left-3">
          <Building2 className="h-10 w-10 text-purple-400" />
          <span className="text-3xl font-extrabold text-white tracking-wide">
            Hostel<span className="text-purple-500">Vista</span>
          </span>
        </div>
        
        <div className="flex items-center space-x-8 absolute top-5 left-1/2 transform -translate-x-1/2">
          <a href="/home" className="text-lg text-white hover:text-purple-400 transition-colors">Home</a>
          <a href="/complaints" className="text-lg text-gray-300 hover:text-purple-400 transition-colors">Complaints</a>
          <a href="/admin" className="text-lg text-gray-300 hover:text-purple-400 transition-colors">Admin</a>
          <a href="/ironUp" className="text-lg text-gray-300 hover:text-purple-400 transition-colors">IronUp</a>
        </div>
        
        <div className="absolute top-3 right-3 flex space-x-3">
          <button onClick={() => navigate("/logout")} className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 px-4 py-2 rounded-lg border border-cyan-500/30 transition-colors hover:scale-105 transform duration-200">
           Logout
          </button>
        </div>
      </nav>


      <div className="pt-8 pb-0 px-0 min-h-screen flex items-start">
        <div className="w-full h-full">
          <div className="bg-black/30 backdrop-blur-lg border-0 px-4 py-12 min-h-screen flex flex-col justify-start pt-20">
            
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Welcome to <span className="text-purple-500">HostelVista</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-5xl mx-auto px-4">
                Your comprehensive hostel management platform for seamless complaint resolution, 
                facility management, and laundry services - all in one place.
              </p>
            </div>

            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-8 leading-tight px-4">
                Your Home Away From Home, Perfected
              </h2>
              
              <p className="text-xl text-gray-300 leading-relaxed mb-12 font-light max-w-6xl mx-auto px-4">
                Every great journey begins with a comfortable space. At HostelVista, we believe your hostel experience should be seamless, 
                worry-free, and inspiring. From the moment you step in, to the day you graduate - we're here to ensure every detail 
                of your stay is taken care of.
              </p>
            </div>

           
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center px-4">
              <div className="flex items-center text-purple-400">
                <div className="w-3 h-3 bg-purple-400 rounded-full mr-4 animate-pulse"></div>
                <span className="text-lg font-medium">Instant Problem Resolution</span>
              </div>
              <div className="flex items-center text-cyan-400">
                <div className="w-3 h-3 bg-cyan-400 rounded-full mr-4 animate-pulse"></div>
                <span className="text-lg font-medium">Premium Laundry Services</span>
              </div>
              <div className="flex items-center text-green-400">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-4 animate-pulse"></div>
                <span className="text-lg font-medium">24/7 Student Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Services */}
      <div className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-gray-300 text-lg">Comprehensive solutions for all your hostel needs</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Complaint Management */}
            <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 p-8 hover:bg-black/40 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-red-500/20 rounded-full w-16 h-16 flex items-center justify-center mr-4">
                  <ClipboardCheck className="w-8 h-8 text-red-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Complaint Management</h3>
                  <p className="text-gray-300">Report and track facility issues</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                  <Droplets className="w-6 h-6 text-blue-400 mb-2" />
                  <p className="text-blue-400 font-medium">Plumbing</p>
                </div>
                <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20">
                  <Zap className="w-6 h-6 text-yellow-400 mb-2" />
                  <p className="text-yellow-400 font-medium">Electrical</p>
                </div>
                <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/20">
                  <Wrench className="w-6 h-6 text-amber-400 mb-2" />
                  <p className="text-amber-400 font-medium">Carpentry</p>
                </div>
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                  <Wifi className="w-6 h-6 text-green-400 mb-2" />
                  <p className="text-green-400 font-medium">WiFi Issues</p>
                </div>
              </div>
              
              <button onClick = {handleComplaints}className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 py-3 rounded-xl font-semibold border border-purple-500/30 transition-colors">
                File a Complaint
              </button>
            </div>

            {/* IronUp Laundry Service */}
            <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 p-8 hover:bg-black/40 transition-all duration-300">               
 <div className="flex items-center mb-6">                 
   <div className="bg-cyan-500/20 rounded-full w-16 h-16 flex items-center justify-center mr-4">                   
     <svg className="w-8 h-8 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
       <polyline points="9,11 12,14 22,4"></polyline>
       <path d="m21,12v7a2,2 0 0,1 -2,2H5a2,2 0 0,1 -2,-2V5a2,2 0 0,1 2,-2h11"></path>
     </svg>                
   </div>                 
   <div>                   
     <h3 className="text-2xl font-bold text-white">IronUp Laundry</h3>                   
     <p className="text-gray-300">Professional laundry services</p>                 
   </div>               
 </div>
              
<div className="space-y-3 mb-6">
  <div className="flex items-center text-gray-300">
    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
    <span>Seamless Order Placement & Flexible Scheduling</span>
  </div>
  <div className="flex items-center text-gray-300">
    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
    <span>Real-time Order Tracking with Live Updates</span>
  </div>
  <div className="flex items-center text-gray-300">
    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
    <span>Secure & Instant Payment Gateway Integration</span>
  </div>
  <div className="flex items-center text-gray-300">
    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
    <span>Detailed Order History & Easy Management</span>
  </div>
  <div className="flex items-center text-gray-300">
    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
    <span>Automated Notifications through email for Order Status</span>
  </div>
  <div className="flex items-center text-gray-300">
    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
    <span>24/7 Support for Hassle-free Experience</span>
  </div>
</div>

              
              <button onClick={handleLaundry} className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 py-3 rounded-xl font-semibold border border-cyan-500/30 transition-colors">
                Order Laundry Service
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose HostelVista?</h2>
            <p className="text-gray-300 text-lg">Advanced features designed for modern hostel management</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 p-6 text-center hover:bg-black/40 transition-all duration-300">
              <div className="bg-purple-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Real-time Updates</h3>
              <p className="text-gray-300">Get instant notifications about complaint status and service updates</p>
            </div>

            <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 p-6 text-center hover:bg-black/40 transition-all duration-300">
              <div className="bg-green-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Secure & Reliable</h3>
              <p className="text-gray-300">Your data is protected with enterprise-grade security measures</p>
            </div>

            <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 p-6 text-center hover:bg-black/40 transition-all duration-300">
              <div className="bg-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Easy Management</h3>
              <p className="text-gray-300">Streamlined dashboards for students, staff, and administrators</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-lg border-t border-white/10 px-6 py-8 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Building2 className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">
              Hostel<span className="text-purple-500">Vista</span>
            </span>
          </div>
          <p className="text-gray-400 mb-4">
            Revolutionizing hostel management with smart solutions for students and administrators
          </p>
          <div className="flex justify-center space-x-6 text-gray-400">
            <a href="/complaints" className="hover:text-purple-400 transition-colors">Complaints</a>
            <a href="/admin" className="hover:text-purple-400 transition-colors">Admin Portal</a>
            <a href="/ironUp" className="hover:text-purple-400 transition-colors">Laundry Service</a>
            <a href="/support" className="hover:text-purple-400 transition-colors">Support</a>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-gray-500">&copy; 2025 HostelVista. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    

  :

  <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 m-0 p-0 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 w-full z-50 bg-black/20 backdrop-blur-lg shadow-lg border-b border-white/10">
        <div className="flex items-center space-x-2 absolute top-3 left-3">
          <Building2 className="h-10 w-10 text-purple-400" />
          <span className="text-3xl font-extrabold text-white tracking-wide">
            Hostel<span className="text-purple-500">Vista</span>
          </span>
        </div>
        
        <div className="flex items-center space-x-8 absolute top-5 left-1/2 transform -translate-x-1/2">
          <a href="/home" className="text-lg text-white hover:text-purple-400 transition-colors">Home</a>
          <a href="/complaints" className="text-lg text-gray-300 hover:text-purple-400 transition-colors">Complaints</a>
          <a href="/admin" className="text-lg text-gray-300 hover:text-purple-400 transition-colors">Admin</a>
          <a href="/ironUp" className="text-lg text-gray-300 hover:text-purple-400 transition-colors">IronUp</a>
        </div>
        
        <div className="absolute top-3 right-3 flex space-x-3">
          <button onClick={() => navigate("/login")} className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 px-4 py-2 rounded-lg border border-purple-500/30 transition-colors hover:scale-105 transform duration-200">
            Login
          </button>
          <button onClick={() => navigate("/signup")}className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 px-4 py-2 rounded-lg border border-cyan-500/30 transition-colors hover:scale-105 transform duration-200">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section with Inspirational Content */}
      <div className="pt-8 pb-0 px-0 min-h-screen flex items-start">
        <div className="w-full h-full">
          <div className="bg-black/30 backdrop-blur-lg border-0 px-4 py-12 min-h-screen flex flex-col justify-start pt-20">
            {/* Welcome Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Welcome to <span className="text-purple-500">HostelVista</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-5xl mx-auto px-4">
                Your comprehensive hostel management platform for seamless complaint resolution, 
                facility management, and laundry services - all in one place.
              </p>
            </div>

            {/* Main Message */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-8 leading-tight px-4">
                Your Home Away From Home, Perfected
              </h2>
              
              <p className="text-xl text-gray-300 leading-relaxed mb-12 font-light max-w-6xl mx-auto px-4">
                Every great journey begins with a comfortable space. At HostelVista, we believe your hostel experience should be seamless, 
                worry-free, and inspiring. From the moment you step in, to the day you graduate - we're here to ensure every detail 
                of your stay is taken care of.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center px-4">
              <div className="flex items-center text-purple-400">
                <div className="w-3 h-3 bg-purple-400 rounded-full mr-4 animate-pulse"></div>
                <span className="text-lg font-medium">Instant Problem Resolution</span>
              </div>
              <div className="flex items-center text-cyan-400">
                <div className="w-3 h-3 bg-cyan-400 rounded-full mr-4 animate-pulse"></div>
                <span className="text-lg font-medium">Premium Laundry Services</span>
              </div>
              <div className="flex items-center text-green-400">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-4 animate-pulse"></div>
                <span className="text-lg font-medium">24/7 Student Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Services */}
      <div className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-gray-300 text-lg">Comprehensive solutions for all your hostel needs</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Complaint Management */}
            <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 p-8 hover:bg-black/40 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-red-500/20 rounded-full w-16 h-16 flex items-center justify-center mr-4">
                  <ClipboardCheck className="w-8 h-8 text-red-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Complaint Management</h3>
                  <p className="text-gray-300">Report and track facility issues</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                  <Droplets className="w-6 h-6 text-blue-400 mb-2" />
                  <p className="text-blue-400 font-medium">Plumbing</p>
                </div>
                <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20">
                  <Zap className="w-6 h-6 text-yellow-400 mb-2" />
                  <p className="text-yellow-400 font-medium">Electrical</p>
                </div>
                <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/20">
                  <Wrench className="w-6 h-6 text-amber-400 mb-2" />
                  <p className="text-amber-400 font-medium">Carpentry</p>
                </div>
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                  <Wifi className="w-6 h-6 text-green-400 mb-2" />
                  <p className="text-green-400 font-medium">WiFi Issues</p>
                </div>
              </div>
              
              <button onClick = {handleComplaints} className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 py-3 rounded-xl font-semibold border border-purple-500/30 transition-colors">
                File a Complaint
              </button>
            </div>

            {/* IronUp Laundry Service */}
<div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 p-8 hover:bg-black/40 transition-all duration-300">               
 <div className="flex items-center mb-6">                 
   <div className="bg-cyan-500/20 rounded-full w-16 h-16 flex items-center justify-center mr-4">                   
     <svg className="w-8 h-8 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
       <polyline points="9,11 12,14 22,4"></polyline>
       <path d="m21,12v7a2,2 0 0,1 -2,2H5a2,2 0 0,1 -2,-2V5a2,2 0 0,1 2,-2h11"></path>
     </svg>                
   </div>                 
   <div>                   
     <h3 className="text-2xl font-bold text-white">IronUp Laundry</h3>                   
     <p className="text-gray-300">Professional laundry services</p>                 
   </div>               
 </div>

              
              
<div className="space-y-3 mb-6">
  <div className="flex items-center text-gray-300">
    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
    <span>Seamless Order Placement & Flexible Scheduling</span>
  </div>
  <div className="flex items-center text-gray-300">
    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
    <span>Real-time Order Tracking with Live Updates</span>
  </div>
  <div className="flex items-center text-gray-300">
    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
    <span>Secure & Instant Payment Gateway Integration</span>
  </div>
  <div className="flex items-center text-gray-300">
    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
    <span>Detailed Order History & Easy Management</span>
  </div>
  <div className="flex items-center text-gray-300">
    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
    <span>Automated Notifications through email for Order Status</span>
  </div>
  <div className="flex items-center text-gray-300">
    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
    <span>24/7 Support for Hassle-free Experience</span>
  </div>
</div>

              
              <button onClick={handleLaundry} className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 py-3 rounded-xl font-semibold border border-cyan-500/30 transition-colors">
                Order Laundry Service
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose HostelVista?</h2>
            <p className="text-gray-300 text-lg">Advanced features designed for modern hostel management</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 p-6 text-center hover:bg-black/40 transition-all duration-300">
              <div className="bg-purple-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Real-time Updates</h3>
              <p className="text-gray-300">Get instant notifications about complaint status and service updates</p>
            </div>

            <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 p-6 text-center hover:bg-black/40 transition-all duration-300">
              <div className="bg-green-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Secure & Reliable</h3>
              <p className="text-gray-300">Your data is protected with enterprise-grade security measures</p>
            </div>

            <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-white/10 p-6 text-center hover:bg-black/40 transition-all duration-300">
              <div className="bg-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Easy Management</h3>
              <p className="text-gray-300">Streamlined dashboards for students, staff, and administrators</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-lg border-t border-white/10 px-6 py-8 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Building2 className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">
              Hostel<span className="text-purple-500">Vista</span>
            </span>
          </div>
          <p className="text-gray-400 mb-4">
            Revolutionizing hostel management with smart solutions for students and administrators
          </p>
          <div className="flex justify-center space-x-6 text-gray-400">
            <a href="/complaints" className="hover:text-purple-400 transition-colors">Complaints</a>
            <a href="/IronAdmin" className="hover:text-purple-400 transition-colors">IronUp Admin</a>
            <a href="/ironUp" className="hover:text-purple-400 transition-colors">Laundry Service</a>
            
          </div>
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-gray-500">&copy; 2025 HostelVista. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    }
    </>
  )

}















































































































































































































































































    






// import React from "react";
// import { Button } from "@/components/ui/button";
// import { Building2 } from "lucide-react";
// import logo from "@/assets/logo.png";


// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuIndicator,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   NavigationMenuViewport,
// } from "@/components/ui/navigation-menu"

// export default function Home() {
// return (
    
//   <body className="bg-violet-200" >
//     {/* <div>
      
//     </div>
    // <div>
    //   <div className="flex items-center space-x-2 absolute top-3 left-3">
    //   <Building2 className="h-10 w-10 text-indigo-600" />
    //   <span className="text-3xl font-extrabold text-gray-800 tracking-wide">
    //     Hostel<span className="text-indigo-600">Vista</span>
    //   </span>
      
    // </div>

      // <div className="flex items-center space-x-8 absolute top-5 left-1/2 transform -translate-x-1/2">
      //        <a href="/home" className="text-lg !text-black hover:text-indigo-600">Home</a>
      //        <a href="/complaints" className="text-lg !text-black hover:text-indigo-600">Complaints</a>
      //       <a href="/admin" className="text-lg !text-black hover:text-indigo-600">Admin</a>
      // </div>
  
{/* <nav className="absolute top-3 right-3">
  <NavigationMenu>
    <NavigationMenuList >
      <NavigationMenuItem>
        <NavigationMenuLink className="text-lg !text-black" href="/login">Login</NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink className="text-lg !text-black bg-stone-500" href="/signup">Signup</NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</nav> */}
//     </div> 

//  <div className="w-full">
//         <img 
//           src={logo} 
//           alt="Hostel Illustration"
//         />
//       </div>

    
//   </body>


  


// );


// }