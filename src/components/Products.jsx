import React, { useState, useEffect } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from 'uuid';
import { searchFilter } from '../redux/reducers/slices/ProductStateSlice'
import { BsSearch } from "react-icons/bs";

const Products = () => {
  const products = useSelector((state) => state.products.products);
  const productStates = useSelector((state) => state.productState);
  const [flag, setFlag] = useState(false);
  const[currentPage,setCurrentPage]=useState(1);
  const dispatch=useDispatch();
  const perPage=8;
  const startIndex=(currentPage-1)*perPage ;
  const lastIndex=startIndex+perPage;

  const transformedProducts = () => {
    let ab = products;

    if (productStates.ascending === true) {
      if (ab.length > 0) {
        ab = ab.slice().sort((a, b) => a.price - b.price);
        
      }
    }
    if (productStates.descending === true) {
      if (ab.length > 0) {
        ab = ab.slice().sort((a, b) => b.price - a.price);
      }
    }
    if (productStates.outOfStock === true) {
      if (ab.length > 0) {
        ab = ab.filter((item) => item.stock === 0);
      }
    }
    if (productStates.primeDelivery === true) {
      if (ab.length > 0) {
        ab = ab.filter((item) => item.fastDelivery === "true");
      }
    }
    if (productStates.rating !== 0) {
      if (ab.length > 0) {
        ab = ab.filter((item) => item.rating >= productStates.rating);
      }
    }

     if(productStates.filterSearch){
      if (ab.length > 0) {
        ab = ab.filter((item) => item.title.toLowerCase().includes(productStates.filterSearch));
      }
     }
     if(productStates.category!==""){
      if (ab.length > 0) {
        if(productStates.category==="all"){
          ab=products;
        }else{
          ab = ab.filter((item) => item.category===productStates.category);

        }
      }
    }

   if(productStates.priceRange!==0){
     if(ab.length>0){
      if(productStates.priceRange===2500){
        ab=products;
      }else{
        ab=ab.filter((item)=> ((item.price>=productStates.priceRange-500) && (item.price<=productStates.priceRange)));
      }
     }
   }

    return ab;
  };
const totalPages=Math.ceil(transformedProducts().length/perPage);
  const currentProducts = transformedProducts().slice(startIndex, lastIndex);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
    <div className="relative min-w-[100%] md:mt-5">
    <input type="search" placeholder='Search a product...' className=" hidden md:block w-[100%] mx-auto md:px-10 md:py-2 sm:px-2 text-sm py-2 rounded-lg mb-3 mr-3 " 
          name="searchText "
          onChange={(e)=>dispatch(searchFilter(e.target.value))}

        />
        <BsSearch className="absolute " style={{top:"11px",left:"12px"}}/>

    </div>
    
      <div className="products  mb-4">
        {(currentProducts.length!==0)?(currentProducts.map((item) => (
          <Card item={item} key={uuid()} />
        ))):(
          <p  className="w-[100%] text-center text-white">No items to display...</p>
        )}
     

      </div>
      {(currentProducts.length!==0) && 
      <div className="pagination mb-4 w-[100%] flex justify-between items-center ">
      <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-lime-700 text-white px-4 py-1 rounded-md focus:border-2 border-lime-600"
        >
          Previous
        </button>
        <span className=" w-[70%] text-center text-white focus:border-2 border-lime-600 ">
           {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-lime-700 text-white px-4 py-1 rounded-md focus:border-2 active:border-lime-600"
        >
          Next
        </button>
      </div>}
    
    </>
  );
};

export default Products;

