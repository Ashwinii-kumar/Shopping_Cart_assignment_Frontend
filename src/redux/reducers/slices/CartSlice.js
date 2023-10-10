import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};
export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        const newItem = {
          id: action.payload.id,
          quantity: 1,
          ...action.payload,
        };
        state.items = [...state.items,newItem];
      }

    },
    deleteFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    deleteFromCartQuantity:(state,action)=>{
      let itemD=state.items.find((item)=>item.id===action.payload);

      itemD.quantity=itemD.quantity-1;

    },
    setCartEmpty: (state, action) => {
      state.items = [];
    },
    getCart:(state,action)=>{
         state.items;
    }
  },
});

export const { addToCart, deleteFromCart,deleteFromCartQuantity, setCartEmpty,getCart } = CartSlice.actions;
export default CartSlice.reducer;
