import React from "react";
import Sidebar from "../components/Sidebar";
import ContentArea from "../components/contentArea/ContentArea";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex">
      <Sidebar />
      <ContentArea>{children}</ContentArea>
    </div>
  );
};

export default DashboardLayout;
