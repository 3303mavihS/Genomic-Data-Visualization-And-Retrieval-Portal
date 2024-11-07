import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentDataValue:"",
  breadCrumb:"",
  geneData: "",
};

const dataSlice = createSlice({
  name: "globalData",
  initialState,
  reducers: {
    setCurrentDataValue:(state, { payload })=>{
      state.currentDataValue=payload;
    },
    setBreadCrumb:(state,{payload})=>{
      state.breadCrumb = payload;
    },
    setGeneData: (state, { payload }) => {
      state.geneData = payload;
    },
  },
});

export const { setCurrentDataValue,setBreadCrumb,setGeneData } = dataSlice.actions;
export default dataSlice.reducer;
