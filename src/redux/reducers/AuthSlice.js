import { createSlice } from "@reduxjs/toolkit";

const abc=JSON.parse(localStorage.getItem('user'));

const initialState={
    user:abc,
};

export const AuthSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.user=action.payload;
        },
        logout:(state,action)=>{
            state.user=null;
        },
        addAddress: (state, action) => {
            state.user.address = action.payload;
          }
    }
});


export const{login,logout,addAddress}=AuthSlice.actions;
export default AuthSlice.reducer;