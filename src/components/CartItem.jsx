import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { addToCart, deleteFromCart, deleteFromCartQuantity } from "../redux/reducers/slices/CartSlice";
import { useDispatch } from "react-redux";
const CartItem = ({ item }) => {
  const [counter, setCounter] = useState(item.quantity);
  const dispatch = useDispatch();

  const increase = () => {

        setCounter((prev) => prev + 1);
        dispatch(addToCart(item));

    
  };
  const decrease = () => {
   
    setCounter((prev) => prev - 1);
 dispatch(deleteFromCartQuantity(item.id));
  };

  return (
    <>
      <div
        className="flex w-[100%] bg-white justify-between items-center px-4 py-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] border-b-slate-600 border-b-2"
        key={item.id}
      >
        <div>
          <img src={item.images[0]} className="w-24 h-24 rounded-full" />
        </div>
        <p>{item.title}</p>
        <p>&#8377; {item.price}</p>
        <div>
          {[...Array(5)].map((star, index) => {
            index += 1;

            if (index <= item.rating) {
              return (
                <span className="star on" key={uuid()}>
                  &#9733;
                </span>
              );
            } else {
              return (
                <span className="star off" key={uuid()}>
                  &#9733;
                </span>
              );
            }
          })}
        </div>
        <div className="flex space-x-4">
          <div className="flex w-[15] space-x-2 border-2 border-gray-500 rounded-2xl ">
            <button
              type="button"
              className="bg-black text-white px-1 rounded-full"
              onClick={increase}
              disabled={counter===5}
            >
              <AiOutlinePlus className="h-3" />
            </button>
            <p>{counter}</p>
            <button
              type="button"
              className="bg-black text-white px-1 rounded-full"
              onClick={decrease}
              disabled={counter==1}
            >
              <AiOutlineMinus className="h-3" />
            </button>
          </div>
          <button type="button"></button>
          <button
            className="bg-red-500 h-8 w-8 flex items-center justify-center rounded-2xl"
            type="button"
            onClick={() => dispatch(deleteFromCart(item.id))}
          >
            <span>
              <AiOutlineDelete style={{ color: "white", background: "red" }} />
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
