import React from "react";
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from "recoil";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import LoadingPage from "./pages/LoadingPage";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <React.Suspense fallback={LoadingPage}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.Suspense>
  </RecoilRoot>
);

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// ,
//   document.getElementById("root")
// )
