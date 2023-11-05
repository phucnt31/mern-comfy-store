import React from "react";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      <nav>nav</nav>
      <section className="align-element py-20">
        <Outlet />
      </section>
    </>
  );
};

export default HomeLayout;
