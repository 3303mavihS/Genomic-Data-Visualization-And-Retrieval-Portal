import { createSlice } from "@reduxjs/toolkit";

const currentTheme = localStorage.getItem("currentTheme") || "light";

const initialState = {
  toggleSideBar: true,
  toggleTheme: currentTheme,
  toggleDialogBox: false,
};

const elementSlice = createSlice({
  name: "element",
  initialState,
  reducers: {
    setToggleSidebar: (state, { payload }) => {
      state.toggleSideBar = payload;
    },
    setToggleTheme: (state, { payload }) => {
      state.toggleTheme = payload;
    },
    setToggleDialogBox: (state, { payload }) => {
      state.toggleDialogBox = payload;
    },
  },
});

export const { setToggleSidebar, setToggleTheme, setToggleDialogBox } =
  elementSlice.actions;
export default elementSlice.reducer;
