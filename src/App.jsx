import React, { useEffect,useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './pages/MainLayout'
import Home from './pages/Home'
import Cart from './pages/Cart'
import { useDispatch, useSelector } from 'react-redux'
import { fillProducts } from './redux/reducers/slices/ProductSlice'
import { v4 as uuid } from 'uuid'
import ProductItem from './pages/ProductItem'
import Checkout from './pages/Checkout'
import Payment from './pages/Payment'
import ErrorPage from './pages/ErrorPage'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const App = () => {
  
  const dispatch=useDispatch();
  const user=useSelector(state=> state.user.user);
  const[products,setProducts]=useState(null);


  useEffect(()=>{
    const fetchData = async () => {
      let response = await fetch("https://dummyjson.com/products");
      let data = await response.json();
     
      let ratingStars = [1, 2, 3, 4, 5];
      data.products.map((item) => {
        let j = Math.floor(Math.random() * 5);
       

        item.rating = ratingStars[j];
        item.id=uuid();
      });
      
      
      dispatch(fillProducts(data.products));
      setProducts(data.products);

      
    };

    
      fetchData();
  },[])

     
      
    
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout/>}>
           <Route index element={<Home/>} />
           <Route path='cart' element={<Cart/>} />
           <Route path='products/:id' element={<ProductItem />} />
           <Route path='cart/checkout' element={user!==null ? <Checkout /> : <ErrorPage />} />
           <Route path='cart/checkout/payment' element={user!==null ? <Payment /> : <ErrorPage/>} />
          
           
           <Route path="*" element={<ErrorPage/>} />

        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

// export {sortByAsc};
export default App;









   {/* {
            loading && (
                <div className="spinner">
                <SwishSpinner size={50} frontColor="red" backColor="white" 
                        loading={loading} />
                </div>
import {SwishSpinner} from "react-spinners-kit";

            )
        } */}