import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCartEmpty } from "../redux/reducers/slices/CartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [totalPrice, setTotalPrice] = useState(0);
  const [counter, setCounter] = useState([]);
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
  return (
    <div className="min-h-[100vh] w-[100vw] px-8 py-6">
      <div className="flex  justify-between md:px-10 mb-4 items-center">
        <h1 className=" text-yellow-400 font-bolder text-xl mx-auto">
          Payment
        </h1>
        <button
          className="bg-blue-500 rounded-full md:w-[10rem] px-1 py-1  md:rounded-md text-white border-2 border-teal-200 mb-2 w-[5rem]"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
      <div className="md:w-1/2 md:pl-4 mb-24 flex md:flex-col">
        <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Select Payment Method:</label>
          <select
            //   value={paymentMethod}
            //   onChange={handlePaymentMethodChange}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="cash">Cash On Delivery</option>
            <option value="paypal">PayPal</option>
            {/* Add more payment options here */}
          </select>
        </div>
        {/* Add payment details fields for the selected payment method */}
      </div>
      <div className="md:bg-slate-800 sm:bg-black sm:rounded-lg flex flex-col  justify-between items-start w-[50%] min-h-[10vh] rounded-md px-4 py-6 space-y-6">
        <h2 className="text-white">Subtotal: {cartItems.length} items</h2>
        <h1 className="mb-5 sm:mb-0 text-green-400">
          Total: &#8377; {totalPrice}
        </h1>

        <button
          className="bg-green-500 rounded-full md:w-[80%] sm:w-2/3 py-2 px-3 md:rounded-md text-gray-800 border-2 border-teal-200 font-bold"
          onClick={() => {
            dispatch(setCartEmpty());
            // alert("Congratulations, Your Order Is Placed");
            toast.success("Your Order is placed.....", {
                      autoClose: 2000,
                      className: "custom-toast-container",
                      bodyClassName: "custom-toast-message",
                    });
            navigate("/");
          }}
        >
          Pay  &#8377; {totalPrice}
        </button>
      </div>
    </div>
  );
};

export default Payment;
