"use client";
import { useGlobalContext } from "@/ContextApi";

const DarkMode = () => {
  const {
    darkModeObject: { darkMode, setDarkMode },
  } = useGlobalContext();

  const handleClick = (index: number) => {
    setDarkMode((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false }
      )
    );
  };

  return (
    <div className="bg-slate-100 h-9 w-20 rounded-full flex items-center gap-2 pl-1">
      {darkMode.map((item, index) => (
        <div
          key={item.id}
          className={`${
            item.isSelected
              ? "bg-mainColor text-white"
              : "bg-slate-100 text-mainColor"
          } w-7 h-7 rounded-full flex items-center justify-center cursor-pointer`}
          onClick={() => handleClick(index)}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
};

export default DarkMode;
