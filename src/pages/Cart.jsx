import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  deleteFromCart,
  setCartEmpty,
} from "../redux/reducers/slices/CartSlice";
import CartItem from "../components/CartItem";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [totalPrice, setTotalPrice] = useState(0);
  const [counter, setCounter] = useState([]);
  useEffect(() => {
    setTotalPrice(cartItems.reduce((acc, curr) => acc + (Number(curr.price)* curr.quantity), 0));
  }, [cartItems]);
  const dispatch = useDispatch();
  const navigate=useNavigate();

  return (
    <div className=" flex   bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900 justify-between mt-[-15px] min-h-[120vh] overflow-scroll ">
      {cartItems.length === 0 ? (
        <span className="hii">
          <h1 className="hello">No Items In Cart...</h1>
          <NavLink
            to="/"
            className="bg-yellow-500 text-teal-900 px-2 py-2 rounded-md "
          >
            Go To Home
          </NavLink>
        </span>
      ) : (
        <div className="w-[100%]  flex md:flex-row  sm:flex-col sm:items-center  ">
        <div className="md:w-[60%] mx-auto md:mt-20 sm:mt-8 sm:w-[80%] sm:min-h-[40%] sm:mb-6 md:min-h-full ">
       
        {cartItems.map((item) => (
            <CartItem item={item} key={item.id} />
          ))}
        </div>
         

          <div className="md:bg-slate-800 sm:bg-black sm:rounded-md flex flex-col sm:justify-between sm:items-start md:w-[20%] sm:w-[80%] md:min-h-[100vh] md:rounded-none md:items-start md:pl-10 md:justify-start md:space-y-10 sm:pl-10 sm:py-6 items-left md:mt-[-112px] md:pt-16 sm:space-y-6 ">
            <h2 className="text-white">Subtotal: {cartItems.length} items</h2>
            <h1 className="mb-5 sm:mb-0 text-green-400">Total: &#8377; {totalPrice}</h1>
            
            <button
              className="bg-green-500 rounded-full md:w-[80%] sm:w-[55%] py-2  md:rounded-md text-gray-800 border-2 border-teal-200"
              onClick={() => navigate('/cart/checkout')}
              disabled={totalPrice===0}
            >
              Proceed to Buy
            </button>
            <button
              className="bg-blue-500 rounded-full md:w-[80%] sm:px-8 py-2 sm:w-[55%] md:rounded-md text-white border-2 border-teal-200 mb-2"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;
