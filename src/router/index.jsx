import { Navigate } from "react-router-dom";
// 为大布局会先执行
import Layout1 from "../Layout/index";

import Home from "../views/home";

import View from "../views/view";
let reters = [
  // 重定向
  { path: "/", element: <Navigate to="/home"></Navigate> },

  // home
  {
    path: "/home",
    element: <Layout1></Layout1>,
    children: [{ path: "", element: <Home></Home> }],
  },

  {
    path: "/view",
    element: <Layout1></Layout1>,
    children: [{ path: "", element: <View></View> }],
  },

];

export default reters;
