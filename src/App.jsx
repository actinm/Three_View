import React from "react";
import { useRoutes } from "react-router-dom";
import routers from "./router/index";

function Index() {
  return <div className="">{useRoutes(routers)}</div>;
}

export default React.memo(Index);
