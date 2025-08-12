import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Building2 } from 'lucide-react';

export default function login() {

    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const navigate = useNavigate();





    const handleSubmit = async (email, password) => {

        if (!email.endsWith("@niet.co.in")) {
        alert("Email must be an official college email ending with @niet.co.in");
        return;
        }

         try {
            const formData = {
            email,
            password
            };

         const response = await axios.post('/api/login',formData);
         if(response.data.success){
             localStorage.setItem("token", response.data.token);
             navigate('/home'); 
         }
         else{
         window.location.reload();
         }

        } catch (error)
         {
         alert("No such User exists or Wrong password");
         window.location.reload();
         console.log(error);
         }


    }


    // React.useEffect(()=>{
        
    //     const postData = async () => {
    //         const formData = {
    //             email,
    //             password
    //         };

    //         if(login){
    //             try {
    //                 const response = await axios.post('/api/login',formData);
    //                    if(response.data.success){
    //                        localStorage.setItem("token", response.data.token);
    //                        navigate('/home'); 
    //                    }else{
    //                     alert("Login failed login again");
    //                     navigate('/login');
    //                    }
    //             } catch (error) {
    //                 console.log(error);
    //             }
    //         }
    //     }
        
    //     postData();

    // },[login])















  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            {/* <Building2 className="h-10 w-10 text-purple-400" /> */}
            <h1 className="text-4xl font-bold text-white">
              Hostel<span className="text-purple-500">Vista</span>
            </h1>
          </div>
          <p className="text-gray-300 text-lg">Student Login Portal</p>
        </div>

        <div className="bg-black/30 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 p-12">
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">
            Sign In
          </h2>

          <div className="space-y-8">
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

            <div className="mt-8 flex justify-center">
              <button 
                onClick={() => handleSubmit(email, password)}
                type="submit"
                className="px-12 py-4 rounded-lg font-semibold text-white transition-all duration-200 transform bg-purple-500 hover:bg-purple-600 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Sign In
              </button>
            </div>

            <div className="mt-6 text-center text-gray-400 text-sm">
              Don't have an account?{' '}
              <span 
              className="text-purple-400 font-semibold cursor-pointer hover:text-purple-300 transition-colors"
              onClick={() => navigate('/signup')}>
                Sign Up
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}