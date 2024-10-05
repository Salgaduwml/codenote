"use client";
import { useGlobalContext } from "@/ContextApi";
import { Menu, X } from "lucide-react";
import React from "react";

const SidebarMenuIcon = () => {
  const {
    openSidebarObject: { openSidebar, setOpenSidebar },
  } = useGlobalContext();
  return (
    <button className="md:hidden" onClick={() => setOpenSidebar(!openSidebar)}>
      {openSidebar ? (
        <X size={20} strokeWidth={1.5} />
      ) : (
        <Menu size={20} strokeWidth={1.5} />
      )}
    </button>
  );
};

export default SidebarMenuIcon;
