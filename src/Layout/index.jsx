import React from "react";
import Title from "../components/Title";
import { Outlet } from 'react-router-dom'
function Index() {
  return (
    <div className="">
      <div className="">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default React.memo(Index);
