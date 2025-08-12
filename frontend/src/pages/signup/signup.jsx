import React from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Building2 } from 'lucide-react';
// import Success from './success';
import Failure from './failure';
export default function Signup() {
  
  const [name, setName] = React.useState('');
  const [fatherName, setFatherName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [roomNumber, setRoomNumber] = React.useState('');
  const [submit,setSubmit] = React.useState(false);
  const navigate = useNavigate();
  
 const handleSubmit = async (name,email,password,contact,roomNumber,fatherName) =>
  {
    if (!name.trim()) {
    alert("Please fill in your full name.");
    return;
  }
  if (!fatherName.trim()) {
    alert("Please fill in your father's name.");
    return;
  }
  if (!email.endsWith("@niet.co.in")) {
    alert("Email must be an official college email ending with @niet.co.in");
    return;
  }
  if (!password.trim()) {
    alert("Please enter a password.");
    return;
  }

  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(contact)) {
    alert("Contact number must be exactly 10 digits.");
    return;
  }
  if (!roomNumber.trim()) {
    alert("Please enter your room number.");
    return;
  }


        const formData = {
            name: name,
            email: email,
            password: password,
            contact: contact,
            RoomNo: roomNumber,
            FatherName: fatherName
        };


         try {
                const response = await axios.post('/api/signup', formData);
                if(response.data.success){
                   console.log('User created:', response.data);
                   navigate('/Verify',{state : { email }});
                }else{
                  window.location.reload();
                }
               
            } catch (error) {
                  alert("User already exists you can login");
                  window.location.reload();
                console.error('Error creating user:', error);
            }


  }



// React.useEffect(() =>{
//        const postData = async () => {
//         const formData = {
//             name: name,
//             email: email,
//             password: password,
//             contact: contact,
//             RoomNo: roomNumber,
//             FatherName: fatherName
//         };

//         if (submit) {
//             try {
//                 const response = await axios.post('/api/signup', formData);
//                 if(response.data.success){
//                    console.log('User created:', response.data);
//                    navigate('/Verify',{state : { email }});
//                 }else{
//                   navigate('/signup')
//                 }
               
//             } catch (error) {
//                 console.error('Error creating user:', error);
//             }
//         }
//     };

//     postData();

// },[submit])
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
    return (
 <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center space-x-2 mb-2">
            {/* <Building2 className="h-8 w-8 text-purple-400" /> */}
            <h1 className="text-3xl font-bold text-white">
              Hostel<span className="text-purple-500">Vista</span>
            </h1>
          </div>
          <p className="text-gray-300">Student Registration Portal</p>
        </div>

        <div className="bg-black/30 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 p-6">
          <h2 className="text-xl font-semibold text-white mb-6 text-center">
            Create Your Account
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-300">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-black/20 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 rounded-lg transition-all duration-200 outline-none"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-300">
                Father's Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="fatherName"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                className="w-full px-4 py-3 bg-black/20 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 rounded-lg transition-all duration-200 outline-none"
                placeholder="Enter father's name"
                required
              />
            </div>

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
                placeholder="Enter your offcial college email"
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
                placeholder="Create a password"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-300">
                Contact Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                name="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full px-4 py-3 bg-black/20 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 rounded-lg transition-all duration-200 outline-none"
                placeholder="Enter 10-digit mobile number"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-300">
                Room Number <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="roomNumber"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                className="w-full px-4 py-3 bg-black/20 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 rounded-lg transition-all duration-200 outline-none"
                placeholder="Enter room number"
                required
              />
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <button 
              onClick={() => handleSubmit(name, email, password, contact, roomNumber, fatherName)}
              className="px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 transform bg-purple-500 hover:bg-purple-600 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Sign Up
            </button>
          </div>

          <div className="mt-4 text-center text-gray-400 text-sm">
            Already have an account?{' '}
            <span 
              onClick={() => navigate('/login')}
              className="text-purple-400 font-semibold cursor-pointer hover:text-purple-300 transition-colors"
            >
              Sign In
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}














