import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentDataValue:"",
  breadCrumb:"",
  geneData: "",
  searchKeyword:"",
  dialogGeneData:"",
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
    setSearchKeyword: (state, { payload }) => {
      state.searchKeyword = payload;
    },
    setDialogGeneData: (state, { payload }) => {
      state.dialogGeneData = payload;
    },
  },
});

export const { setCurrentDataValue,setBreadCrumb,setGeneData,setSearchKeyword,setDialogGeneData } = dataSlice.actions;
export default dataSlice.reducer;
