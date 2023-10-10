import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {BsQuestionCircleFill} from 'react-icons/bs';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addAddress } from "../redux/reducers/AuthSlice";
import {FaAddressCard} from 'react-icons/fa';

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const user=useSelector((state)=>state.user.user);
  const [totalPrice, setTotalPrice] = useState(0);
  const [counter, setCounter] = useState([]);
  const[address,setAddress]=useState("");
  const[hovering,setIsHovering]=useState(false);
  const[flag,setFlag]=useState(!user?.address);

  useEffect(() => {
    setTotalPrice(
      cartItems.reduce(
        (acc, curr) => acc + Number(curr.price) * curr.quantity,
        0
      )
    );
  }, [cartItems]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  
const onSubmitHandler=(e)=>{
    e.preventDefault();
    if(!address || address.trim().length<10){
        toast.error("Something Went Wrong", {
            autoClose: 1000,
            className: "custom-toast-container",
            bodyClassName: "custom-toast-message",
          });
          return;
    }
    
    dispatch(addAddress(address));
    toast.success("Address Added Successfully", {
        autoClose: 1000,
        className: "custom-toast-container",
        bodyClassName: "custom-toast-message",
      });
    // console.log(address);
    setAddress("");
    setFlag(false);
}







  return (
    <>
      <div className="min-h-[100vh] w-[100vw] px-10 py-6">
        {/* <div className="flex flex-col justify-center md:flex-row md:justify-between md:px-10 mb-4 items-center"> */}
        <h1 className=" text-yellow-600 font-bolder text-xl mx-auto mb-2 md:mb-10 pl-6 sm:mb-6">
          Add Address For Delivery
        </h1>

        <div className="md:flex md:flex-row md:space-x-4 md:justify-between px-6">
          <div className="md:w-1/2 md:pr-4 bg-white mb-8 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] px-8 py-8 md:space-y-8 rounded-lg min-h-max">
            <h2 className="text-xl text-black font-bolde mb-2 inline ">
              Shipping Address <i className="inline-block pl-2 pt-[-1]" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}><BsQuestionCircleFill /></i>
            </h2>
            {hovering && (
          
            <h4 className="text-red-500 ">Please add the address including street address,pincode,state,etc.</h4>
          
        )}
        {flag ? (
            <form onSubmit={onSubmitHandler}>
              <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700">
                  Address:
                </label>
                <input
                  type="text"
                  id="address"
                  className="w-[80%] border border-gray-300 rounded-md p-2 md:mb-6 md:mt-2"
                  value={address}
                  onChange={(e)=>setAddress(e.target.value)}
                  required
                />
              </div>
              {/* Add more address fields here (e.g., city, postal code, etc.) */}
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 "
                  
              >
                Add Address
              </button>
            </form>
        ):(
            <div className="flex flex-col space-y-4">
          
           <p className="mb-6 text-sm "><FaAddressCard  /> {user?.address}</p>
           <button
                type="button"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 "
                  onClick={()=>setFlag((prev)=>!prev)}
              >
                Edit Address
              </button>
          
           </div>
        )}
           

          



          </div>
          <div className="md:w-1/3 md:bg-slate-800  sm:rounded-lg md:min-h-[40vh] md:rounded-md md:items-start md:pl-10 md:justify-start md:space-y-10 sm:px-4 sm:py-4 items-left sm:space-y-6 px-24 ">
            <h2 className="text-white sm:pl-3 md:pl-0 md:mt-2">
              Subtotal: {cartItems.length} items
            </h2>
            <h1 className=" sm:mb-0 text-green-400">
              Total: &#8377; {totalPrice}
            </h1>

            <button
              className="bg-green-500 rounded-full md:w-[80%] sm:w-[35%] md:py-2 py-1  md:rounded-md text-gray-800 border-2 border-teal-200 sm:text-sm"
              onClick={() => navigate("/cart/checkout/payment")}
              disabled={flag}
            >
              Proceed to Payment
            </button>
            <button
              className="bg-blue-500 rounded-full md:w-[80%] md:py-2 py-1 sm:ml-6 sm:w-[35%] md:rounded-md text-white border-2 border-teal-200  sm:text-sm md:ml-0"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
