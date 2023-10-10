import React, { useState,useEffect } from "react";
import { FaInfoCircle, FaRegStar, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart, deleteFromCart } from "../redux/reducers/slices/CartSlice";

const ProductItem = () => {
  const { id } = useParams();
  const products = useSelector((state) => state.products.products);
  const product = products.find((item) => item.title === id);
  const [addCart, setAddCart] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const cartItems=useSelector(state=>state.cart.items);
  
  useEffect(() => {
    // Check if the product is in the cart
    let a = cartItems.find((item) => item.title === id);
    if (a) {
      setAddCart(true);
    }
  }, [cartItems, id]);

 
  return (
    <div className="max-w-screen-xl mx-auto p-4 min-h-[100vh] text-white mb-20">
      <div className=" rounded-lg shadow-lg p-4 md:flex">
        <div className="md:w-1/2">
          {/* Product Image */}
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-auto md:max-h-[400px] object-cover"
          />
        </div>
        <div className="md:w-1/2 md:ml-4 mt-4 md:mt-0">
          {/* Product Name */}
          <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
          <p className="text-md  mb-2">{product.description}</p>

          {/* Product Price */}
          <p className=" text-lg mb-2">&#8377; {product.price}</p>
          {/* Buy Now Button */}

          

          <div className="flex mb-4">
            {[...Array(5)].map((_, index) => (
              <span key={index}>
                {index < product.rating ? <FaStar style={{color:"gold"}} /> : <FaStar style={{color:"white"}} />}
              </span>
            ))}
          </div>
          <button
            className={(!addCart)? "bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500 w-[50%] mx-auto  font-semibold py-2 px-4 rounded-full text-green-800 focus:outline-none focus:ring focus:border-blue-300 mb-4":"bg-red-500 w-[50%] mx-auto  font-semibold py-2 px-4 rounded-full text-gray-200 focus:outline-none focus:ring focus:border-red-300 mb-4"}

            onClick={() => {
// setAddCart((prev)=>!addCart);
                if(!addCart){
                    dispatch(addToCart(product));
                setAddCart(true);


                }else{
                    dispatch(deleteFromCart(product.id));
                setAddCart(false);

                }
                }}
            // disabled={addCart}
          >
            {(!addCart)? "Add To Cart" : "Remove From Cart"}
          </button>
          <br />
          <button
            className="bg-blue-500 w-[50%] mx-auto hover:bg-blue-600  font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring focus:border-blue-300 mb-4"
            onClick={() => navigate(-1)}
          >
            Back To Products
          </button>
          <br />
          <button
            className="bg-gradient-to-r from-red-800 via-orange-600 to-yellow-700 w-[50%] mx-auto hover:bg-blue-600  font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring focus:border-blue-300"
            onClick={() => {
              // Add logic to handle the "Buy Now" button click
              if(addCart){
                navigate('/cart');

              }else{
                alert('You Need To Add Item To Cart ')
              }
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
