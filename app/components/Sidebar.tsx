import { TableProperties } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="p-5 flex flex-col gap-2 h-screen pt-7 border-r w-[265px] max-sm:fixed">
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
  return (
    <div className="mt-20 text-sm text-slate-400">
      <div className="font-bold">Quick Links</div>
      <ul className="mt-4 flex flex-col gap-2">
        <li className="list-none flex gap-1 items-center bg-mainColor text-white px-6 py-2 rounded-md w-full">
          <TableProperties size={20} strokeWidth={1.5} />
          <span>All Codes</span>
        </li>
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
