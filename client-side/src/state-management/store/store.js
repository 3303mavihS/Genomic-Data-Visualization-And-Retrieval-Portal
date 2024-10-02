import { configureStore } from "@reduxjs/toolkit";
import elementReducer from "../feature/elementReducer";
import globalDataReducer from "../feature/dataReducer";

const store = configureStore({
  reducer: {
    element: elementReducer,
    globalData: globalDataReducer,
  },
});

export default store;
