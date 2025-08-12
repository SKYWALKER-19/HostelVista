import React from 'react'
import {Check, Building2 } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

function Success() {
  const navigate = useNavigate();
   return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="max-w-3xl w-full relative">
        {/* Success Card */}
        <div className="bg-black/30 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 p-12 text-center transform transition-all duration-500 hover:scale-105">
          {/* Animated Checkmark */}
          <div className="mx-auto w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mb-8 animate-pulse border border-purple-400/30">
            <Check className="w-10 h-10 text-purple-400 animate-bounce" />
          </div>
          
          {/* Success Message */}
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-white mb-6">Registration Successful!</h2>
            <p className="text-gray-300 text-xl leading-relaxed">
              You have successfully registered. Now you can{' '}
              <button onClick ={() => navigate('/login')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded transition-colors duration-200">
                login
              </button>
              .
            </p>
          </div>
          
          {/* HostelVista Branding */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Building2 className="h-8 w-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">
                Hostel<span className="text-purple-500">Vista</span>
              </h1>
            </div>
            <p className="text-gray-400">
              Welcome to HostelVista</p>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-6 h-6 bg-purple-400/60 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-10 w-8 h-8 bg-purple-500/40 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-4 h-4 bg-purple-600/50 rounded-full animate-bounce"></div>
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-slate-400/40 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-16 w-5 h-5 bg-purple-300/30 rounded-full animate-ping"></div>
      </div>
    </div>
);

}

export default Success