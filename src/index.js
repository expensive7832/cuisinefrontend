import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import logo from "./assets/images/res-logo.png";
import store from "./store/store";
import { Provider } from "react-redux";
import {persistor} from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={(
    <div className="spinner" style={{display:"flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <img style={{width: "4rem", height: "4rem"}} src={logo} alt="logo" />
    </div>)}>
    <Router>
      <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
        <App/>
       </PersistGate>
      </Provider>
    </Router>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

