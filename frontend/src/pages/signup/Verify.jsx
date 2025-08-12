import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Building2 } from 'lucide-react';
import React, { forwardRef } from "react";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

export function InputOTPForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })

  function onSubmit(data) {

    const postOtp = async() =>{

                try {
                
                const email = location.state?.email;
                const payload ={
                   ...data,
                   email
                }
                const response = await axios.post('/api/verifyOtp', payload);
                if(response.data.success){
                  navigate('/success')
                }else{
                   alert("Wrong OTP Signup again");
                   navigate('/signup');
                }
              
            } catch (error) {
                console.error('Error creating user:', error);
            }
    };
    postOtp();
  }
  
  return (
 <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-4xl mx-auto">
        {/* HostelVista Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-2xl mb-4 shadow-2xl border border-purple-400/30">
            <Building2 className="w-6 h-6 text-purple-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">Hostel<span className="text-purple-500">Vista</span></h1>
          <p className="text-gray-300 text-base">Your journey awaits verification</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-black/30 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 p-8 max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-2xl mb-4 border border-purple-400/30">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Verify Your OTP</h2>
            <p className="text-gray-300 text-sm">Enter the 6-digit code sent to your official email</p>
          </div>

          <Form {...form}>
            <div className="space-y-6">
              <FormField
               control={form.control}
               name="pin"
              render={({ field }) => (
           <FormItem className="space-y-4">
            <FormLabel className="text-center block text-gray-300 font-medium">
              One-Time Password
              </FormLabel>
            <FormControl>
        <div className="flex justify-center">
          <InputOTP 
            maxLength={6} 
            value={field.value}
            onChange={field.onChange}
            className="gap-3"
          >
            <InputOTPGroup className="flex gap-3">
              <InputOTPSlot index={0} className="w-12 h-12 border-2 border-white/20 rounded-lg text-lg font-semibold text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 bg-black/20 transition-all duration-200 text-center outline-none placeholder-gray-400" />
              <InputOTPSlot index={1} className="w-12 h-12 border-2 border-white/20 rounded-lg text-lg font-semibold text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 bg-black/20 transition-all duration-200 text-center outline-none placeholder-gray-400" />
              <InputOTPSlot index={2} className="w-12 h-12 border-2 border-white/20 rounded-lg text-lg font-semibold text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 bg-black/20 transition-all duration-200 text-center outline-none placeholder-gray-400" />
              <InputOTPSlot index={3} className="w-12 h-12 border-2 border-white/20 rounded-lg text-lg font-semibold text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 bg-black/20 transition-all duration-200 text-center outline-none placeholder-gray-400" />
              <InputOTPSlot index={4} className="w-12 h-12 border-2 border-white/20 rounded-lg text-lg font-semibold text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 bg-black/20 transition-all duration-200 text-center outline-none placeholder-gray-400" />
              <InputOTPSlot index={5} className="w-12 h-12 border-2 border-white/20 rounded-lg text-lg font-semibold text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 bg-black/20 transition-all duration-200 text-center outline-none placeholder-gray-400" />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </FormControl>
      <FormDescription className="text-center text-gray-400 text-xs">
        Please enter the one-time password sent to your email.
      </FormDescription>
      <FormMessage className="text-center text-red-500" />
    </FormItem>
  )}
/>

              <Button  
                type="submit" 
                onClick={form.handleSubmit(onSubmit)}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
              >
                Verify & Continue
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}