import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/tailwind/compiled.css";
import store from "./state-management/store/store.js";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
