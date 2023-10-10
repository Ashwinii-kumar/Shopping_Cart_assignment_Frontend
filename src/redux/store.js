import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import CartSlice from "./reducers/slices/CartSlice";
import ProductSlice from "./reducers/slices/ProductSlice";
import ProductStateSlice from "./reducers/slices/ProductStateSlice";
import AuthSlice  from "./reducers/AuthSlice";

export const store=configureStore({
    reducer:{
        cart:CartSlice,
        products:ProductSlice,
        productState:ProductStateSlice,
        user:AuthSlice,
    },
    devTools: import.meta.env.MODE !== 'production',
    
    middleware:(getDefaultMiddleware)=>  getDefaultMiddleware({
        serializableCheck: false, // Disable serializable state check
      }),
});