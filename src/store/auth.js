import { createSlice } from "@reduxjs/toolkit";
const initialAuthState = { isLoggedIn: false};



const authSlice =createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        loginAuth(state){
            state.isLoggedIn = true
        },

        logoutAuth(state){
            state.isLoggedIn = false
        },
    }
})

export const authAction = authSlice.actions;

export default authSlice;
