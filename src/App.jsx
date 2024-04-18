import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from './pages/home/Home';
import ContactUs from './components/Contact/ContactUs';
import ShippingPolicy from './components/QuickLinkPages/ShippingPolicy';
import TermsOfService from './components/QuickLinkPages/TermsofService';
import PrivacyPolicy from './components/QuickLinkPages/PrivacyPolicy';
import RefundPolicy from './components/QuickLinkPages/RefundPolicy';

import Order from './pages/order/Order';
import { ReqForm } from './pages/PersonalRequest/ReqForm';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import Error10 from './components/Error/Error'
import MyState from './context/data/myState';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import ProductInfo from './pages/productInfo/ProductInfo';
import AddProduct from './pages/admin/page/AddProduct';
import UpdateProduct from './pages/admin/page/UpdateProduct';
import UserDetails from './pages/registration/User';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Allproducts from './pages/allproducts/Allproducts';
function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allproducts" element={<Allproducts />} />
          <Route path="/Reqform" element={<ReqForm />} />
          <Route path="/order" element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={
            <ProtectedRouteForAdmin>
              <Dashboard />
            </ProtectedRouteForAdmin>
          } />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/UserProfile' element={<UserDetails/>} />
          <Route path='/ContactUs' element={<ContactUs/>} />
          <Route path='/ShippingPolicy' element={<ShippingPolicy/>} />
          <Route path='/RefundPolicy' element={<RefundPolicy/>} />
           <Route path='/TermsofService' element={<TermsOfService/>} />
          <Route path='/PrivacyPolicy' element={<PrivacyPolicy/>} />
          

          
          
          <Route path='/productinfo/:id' element={<ProductInfo/>} />
          <Route path='/addproduct' element={
            <ProtectedRouteForAdmin>
              <AddProduct/>
            </ProtectedRouteForAdmin>
          } />
          <Route path='/updateproduct' element={
            <ProtectedRouteForAdmin>
              <UpdateProduct/>
            </ProtectedRouteForAdmin>
          } />
          <Route path="/*" element={<Error10 />} />
        </Routes>
        <ToastContainer/>
      </Router>
    </MyState>

  )
}

export default App 

// user 

export const ProtectedRoute = ({children}) => {
  const user = localStorage.getItem('user')
  if(user){
    return children
  }else{
    return <Navigate to={'/login'}/>
  }
}

// admin 

const ProtectedRouteForAdmin = ({children})=> {
  const admin = JSON.parse(localStorage.getItem('user'))
  
  if(admin.user.email === 'mehulpbhosale@gmail.com'){
    return children
  }
  else{
    return <Navigate to={'/login'}/>
  }

}