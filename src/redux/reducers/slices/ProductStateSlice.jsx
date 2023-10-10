import { createSlice } from "@reduxjs/toolkit";


const initialState={
    ascending:false,
    descending:false,
    rating:0,
    filterSearch:"",
    category:"",
    priceRange:0,
};
export const ProductStateSlice=createSlice({
    name:"productState",
    initialState,
    reducers:{
       sortAsc:(state,action)=>{
         return state= {...state,ascending:!state.ascending};
       },
       sortDesc:(state,action)=>{
        return state= {...state,descending:!state.descending};
        
      },
      
      sortByRating:(state,action)=>{
        return state= {...state,rating:action.payload};
        
      },
      clearFilters:(state,action)=>{
        state.ascending=false;
        state.descending=false;
        state.rating=0;
        state.category="";
        state.priceRange=0;
      },searchFilter:(state,action)=>{
    
        return state={...state,filterSearch:action.payload.toLowerCase()};
      },
      setCategory:(state,action)=>{
        return state={...state,category:action.payload};
      },setPriceRange:(state,action)=>{
        return state={...state,priceRange:action.payload};
      }



    }
});

export const{sortAsc,sortDesc,sortByRating,clearFilters,searchFilter,setCategory,setPriceRange}=ProductStateSlice.actions;
export default ProductStateSlice.reducer;