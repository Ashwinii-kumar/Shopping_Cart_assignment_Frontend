import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../redux/reducers/slices/CartSlice";
import { NavLink } from "react-router-dom";

const Card = ({ item }) => {
  const [toggle, setToggle] = useState(true);
  const { title, id, thumbnail, price, rating } = item;
  const dispatch = useDispatch();

  const products = useSelector((state) => state.cart.items);
  let a = products.findIndex((item) => item.id === id);
  if (a !== -1 && toggle === true) {
    setToggle((state) => !state);
  }
  const onClickHandler = () => {
    if (toggle) {
      dispatch(addToCart(item));
      setToggle((state) => !state);
    } else {
      dispatch(deleteFromCart(item.id));
      setToggle((state) => !state);
    }
  };

  return (
    <div className=" bg-white min-h-[250px]   shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-xl flex flex-col justify-between border-2 border-slate-700 sm:w-[100%] pb-4 ">
      <img src={thumbnail}  className=" h-[150px] w-[100%] object-contain bg-gray-300" />
      <div className="w-[100%] h-[1px] bg-gray-300 mt-2"></div>
      <div className="flex flex-col mt-4 px-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-500 text-sm">&#8377; {price}</p>
        
        <div className="flex mb-4">
          {[...Array(5)].map((_, index) => (
            <span key={index}>
              {index < rating ? <FaStar style={{color:"gold"}} /> : <FaStar style={{color:"lightGray"}} />}
            </span>
          ))}
        </div>
    
      <div className="flex">
      <NavLink to={`/products/${item.title}`} className='text-white bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-800 to-indigo-900  text-center rounded-md font-bolder py-1 text-sm border-2 w-[50%] '>
        View
        </NavLink>
      
      <button
        className={`${
          toggle ? "bg-gradient-to-b from-yellow-600 to-yellow-500 w-[50%] text-sm py-1" : "bg-red-600"
        }   rounded-md text-white text-sm border-2 py-1  w-2/3 `}
        onClick={onClickHandler}
      >
        {toggle ? "Add To Cart" : "Remove"}
      </button>
      </div>
     
      </div>
      </div>
    
  );
};

export default Card;
