import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
//import {books} from "../assets/data"
export const ShopContext=createContext()
import {toast} from "react-toastify"
import axios from "axios"


const ShopContextProvider = (props) => {
    const currency="$"
    const delivery_charges=5
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const[books,setBooks]=useState([])
    const navigate=useNavigate();
    const[token,setToken]=useState("")
    const[cartItem,setCartItem]=useState({})
 

    const addToCart=async(ItemId)=>{
      const cartData={...cartItem}

      if(cartData[ItemId]){
        cartData[ItemId]+=1
      }
      else{
        cartData[ItemId]=1
      }
      setCartItem(cartData)
      if(token){
        try{
  await axios.post(
  backendUrl + "/api/cart/add",
  { itemId: ItemId },  
  { headers: { token } }
)        }catch(e){
          console.log(e);
          toast.error(e.message)

        }
      }

    }


    //getting the item details

    const getCartCount=()=>{
      let totalCount=0
      for(const item in cartItem){
        try{
          if(cartItem[item]>0){
            totalCount+=cartItem[item]
          }

        }
        catch(e){
        console.log(e);
        
      }
      }
      return totalCount;
    
    }


    //getting total cart amount
    const getCartAmount=()=>{
      let totalAmount=0;
      for(const item in cartItem){
        if(cartItem[item]>0){
          let itemInfo=books.find((book)=>book._id===item)
          if(itemInfo){
            totalAmount+=itemInfo.price*cartItem[item]
          }
        }
      }
      return totalAmount
    }



    //updating the quaintity 
   const updateQuantity = async (itemId, quantity) => {
  const cartData = { ...cartItem };

  cartData[itemId] = quantity;
  setCartItem(cartData);

  if (token) {
    try {
      await axios.post(
        backendUrl + "/api/cart/update",
        { itemId, quantity },   
        { headers: { token } }
      );
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  }
};

    //getting all products data

    const getProductsData = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/product/list`);

    // console.log("API Response:", response.data);

    if (response.data.success) {
      setBooks(response.data.products);
    }

  } catch (e) {
    console.log("API ERROR:", e.response?.data || e.message);
  }
};

// getting cart data

// Getting userCart data
const getUserCart = async (token) => {
  try {
    const response = await axios.post(
      backendUrl + '/api/cart/get',
      {},
      { headers: { token } }
    )

    if (response.data.success) {
      setCartItem(response.data.cartData)
    }

  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}




    useEffect(()=>{
      if(!token && localStorage.getItem("token")){
        
        setToken(localStorage.getItem("token"))   //prevent logout
        getUserCart(localStorage.getItem("token"))
      }
      getProductsData()
    },[])




    const contextValue={books,currency,navigate,token,setToken,cartItem,setCartItem,addToCart,getCartCount,getCartAmount,updateQuantity,delivery_charges,backendUrl}

  return (
   <ShopContext.Provider value={contextValue}>
    {props.children}
   </ShopContext.Provider>
  )
}

export default ShopContextProvider 