import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbars from './components/Navbars';
import CartPage from './CartPage';
import Succesfull from './Succesfull';
import AdminLogin from './admin/AdminLogin';
import Payment from './components/Payment';
import StripeProvider from './components/StripeProvider';
import PaymentSuccess from './components/PaymentSuccess';
import ShowProduct from './admin/ShowProduct';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbars />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Succesfull />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/admin/orders" element={<ShowProduct />} />
          <Route path="/admin/dashboard" element={<ShowProduct />} />
          <Route 
            path="/payment" 
            element={
              <StripeProvider>
                <Payment />
              </StripeProvider>
            } 
          />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" />
    </>
  );
}

export default App;