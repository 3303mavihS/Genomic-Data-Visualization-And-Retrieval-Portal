import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  geneData: "",
};

const dataSlice = createSlice({
  name: "globalData",
  initialState,
  reducers: {
    setGeneData: (state, { payload }) => {
      state.geneData = payload;
    },
  },
});

export const { setGeneData } = dataSlice.actions;
export default dataSlice.reducer;
