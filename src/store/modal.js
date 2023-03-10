import { createSlice } from "@reduxjs/toolkit";

const initialModalState = { isShow: false };

const modalSlice = createSlice({
  name: "modalAuth",
  initialState: initialModalState,
  reducers: {
    changeModalState(state) {
      if (state.isShow === false) {
        state.isShow = true;
      } else if (state.isShow === true) {
        state.isShow = false;
      }
    },
  },
});

export const modalAction = modalSlice.actions;

export default modalSlice;
