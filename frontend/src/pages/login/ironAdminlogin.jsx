import React from 'react'
import axios from 'axios';
import { Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function IronAdminlogin() {

    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const navigate = useNavigate();




const handleSubmit = async (e) => {
    e.preventDefault(); // stop page reload

    const formData = { email, password };

    try {
      const response = await axios.post("/api/Adminlogin", formData);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/IronAdmin");
      } else {
        alert("Login failed. Please login again.");
        navigate("/IronAdminlogin");
      }
    } catch (error) {
      window.location.reload();
      alert("Wrong email or password");
      console.error(error);
    }
  };





































































  return (
   <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-3">
            {/* <Building2 className="h-8 w-8 text-purple-400" /> */}
            <h1 className="text-3xl font-bold text-white">
              Iron<span className="text-purple-500">Up</span>
            </h1>
          </div>
          <p className="text-gray-300">IronUp Admin Login</p>
        </div>

        <div className="bg-black/30 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 p-8">
          <h2 className="text-xl font-semibold text-white mb-6 text-center">
            Sign In
          </h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-300">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-black/20 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 rounded-lg transition-all duration-200 outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-300">
                Password <span className="text-red-400">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black/20 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 rounded-lg transition-all duration-200 outline-none"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSubmit}
                className="px-12 py-4 rounded-lg font-semibold text-white transition-all duration-200 transform bg-purple-500 hover:bg-purple-600 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}