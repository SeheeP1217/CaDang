import React from "react"
import { RecoilRoot } from 'recoil';
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"


import "./index.css"
import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <RecoilRoot>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>
)

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// ,
//   document.getElementById("root")
// )
