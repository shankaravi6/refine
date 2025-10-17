import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  adminLogin : false
};

export const modeSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    setMode: (state,action) => {
      state.mode = action.payload;
    },
    setAdminLogin: (state,action) => {
      state.adminLogin = action.payload;
    }
  },
});

export const { setMode, setAdminLogin } = modeSlice.actions;
export default modeSlice.reducer;
