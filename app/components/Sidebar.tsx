"use client";
import { useGlobalContext } from "@/ContextApi";
import { TableProperties } from "lucide-react";

const Sidebar = () => {
  const {
    openSidebarObject: { openSidebar },
  } = useGlobalContext();
  return (
    <div
      className={`p-5 flex flex-col gap-2 h-screen pt-7 border-r w-[265px] bg-white z-[999] max-md:fixed ${
        openSidebar ? "flex" : "max-md:hidden"
      }`}
    >
      <Logo />
      <QuickLinks />
      <Languages />
    </div>
  );
};

export default Sidebar;

function Logo() {
  return (
    <div className="text-xl">
      <span className="text-mainColor font-bold">Code</span>
      <span className="text-slate-400">Note</span>
    </div>
  );
}

function QuickLinks() {
  const {
    sidebarMenuObject: { sidebarMenu, setSidebarMenu },
  } = useGlobalContext();

  const handleClick = (id: number) => {
    setSidebarMenu((prev) =>
      prev.map((cur) =>
        cur.id === id
          ? { ...cur, isSelected: true }
          : { ...cur, isSelected: false }
      )
    );
  };
  return (
    <div className="mt-20 text-sm text-slate-400">
      <div className="font-bold">Quick Links</div>
      <ul className="mt-4 flex flex-col gap-2">
        {sidebarMenu.map((item) => (
          <li
            onClick={() => handleClick(item.id)}
            key={item.id}
            className={`cursor-pointer list-none flex gap-1 items-center px-6 py-2 rounded-md w-full ${
              item.isSelected
                ? "bg-mainColor text-white"
                : "text-slate-400 hover:bg-mainColor hover:text-white transition-colors"
            }`}
          >
            {item.icons}
            <span className="shrink-0">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Languages() {
  return (
    <div className="mt-12 text-sm text-slate-400">
      <div className="font-bold">Languages</div>
      <div className="mt-5 flex flex-col gap-4">
        <div className="">Javascript</div>
      </div>
    </div>
  );
}
