import viteLogo from '/vite.svg'
import { Route,Routes, useNavigate } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Home from './pages/home/home.jsx'
import { InputOTPForm } from './pages/signup/Verify.jsx'
import Failure from './pages/signup/failure.jsx'
import Success from './pages/signup/success.jsx'
import Login from './pages/login/login.jsx'
import Complaints from './pages/complaints/complaints.jsx'
import ComptSuccess from './pages/complaints/comptSuccess.jsx'
import Adminlogin from './pages/login/adminLogin.jsx'
import './App.css'
import Signup from './pages/signup/signup.jsx'
import Admin from './pages/admin/admin.jsx'
import Logout from './pages/logout/logout.jsx'
import Iron from './pages/ironing/iron.jsx'
import IronAdmin from './pages/admin/ironAdmin.jsx'
import IronAdminlogin from './pages/login/ironAdminlogin.jsx'
import { Navigate } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/Verify' element={<InputOTPForm />} />
        <Route path='/failure' element={<Failure />} />
        <Route path='/success' element={<Success />} />
        <Route path='/adminLogin' element={<Adminlogin />} />
        <Route path='/complaints' element={<Complaints />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/IronUp' element={<Iron />} />
        <Route path='/IronAdmin' element={<IronAdmin />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/IronAdminlogin' element={<IronAdminlogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
