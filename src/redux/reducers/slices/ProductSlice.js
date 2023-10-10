import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";
const initialState={
    products:[],
};

export const ProductSlice=createSlice({
    name:"products",
    initialState,
    reducers:{
        fillProducts:(state,action)=>{
           state.products=action.payload;
        },
       

    }
});

export const {fillProducts}=ProductSlice.actions;
export default ProductSlice.reducer;