import {  Routes, Route } from "react-router-dom";
import Header from "./components/Header"
import './App.css'
import Home from "./Pages/Home"
import Shop from "./Pages/Shop";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import PlaceOrder from "./Pages/PlaceOrder";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Orders from "./Pages/Orders";
import Verify from "./Pages/Verify";
function App() {


  return (
    <main className="overflow-hidden bg-[#f8f6fb]">
      <ToastContainer/>
      <Header/>
      <Routes>


        <Route path="/" element={<Home/>}></Route>
        <Route path="/shop" element={<Shop/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/place-order" element={<PlaceOrder/>}></Route>
        <Route path="/orders" element={<Orders/>}></Route>
     
        <Route path="/verify" element={<Verify/>}></Route>
      </Routes>

     
    
    </main>
    
  )
}

export default App
