import { createHashRouter, createBrowserRouter, Navigate } from "react-router-dom";
import React, { Suspense } from 'react';
import HomePC from "../pages/pc/home/index"
import HomeMOBILE from "../pages/mobile/home/index"
import { os } from "@/utils/util"
// pc端路由
let PCRoutes = [
  {
    path: "/",
    element: <Navigate to="/home" />
  },
  {
    path: "/home",
    element: <HomePC />,
  }
];
// 移动端路由
let MOBILERoutes = [
  {
    path: "/",
    element: <Navigate to="/home" />
  },
  {
    path: "/home",
    element: <HomeMOBILE />,
  }
]
let defualtRouters = (os().isAndroid || os().isPhone) ? MOBILERoutes : PCRoutes
// let defualtRouters = PCRoutes

export default defualtRouters;