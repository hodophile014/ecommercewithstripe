
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { CartContextProvider } from './context/cartContext';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Cancel from './pages/Cancel';
import Success from './pages/Success';
import SignUp from './pages/SignUp';

const App = () => {
  const [cookies,setCookies,removeCookies] = useCookies(['authToken']);
  const authToken = cookies.authToken
 
  return (
    <BrowserRouter>
      <CartContextProvider>
        <Routes>
          <Route path="/cart" element={<Cart cookies={cookies} /> } />
          <Route exact path="/" element={ <Navigate to="/home" /> } />
          <Route path="/home" element={<Home removeCookies={removeCookies}/>} />
          <Route path='/success' element={<Success />} />
          <Route path='/cancel' element={<Cancel />} />
          <Route path='/register' element={<SignUp setCookies={setCookies} />} />

        </Routes>
      </CartContextProvider>
    </BrowserRouter>
  );
};

export default App;