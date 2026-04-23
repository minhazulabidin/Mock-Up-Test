import NavbarDemo from "@/components/resizable-navbar-demo";
import SyncUser from "@/utils/SyncUser";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <NavbarDemo />
      <SyncUser />
      {children}
    </div>
  );
};

export default DashboardLayout;
