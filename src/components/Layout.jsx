import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <>
      <Header />
      <div className="d-flex justify-content-center">
        <div className="col-7 ">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
