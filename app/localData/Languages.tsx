import { FaJava } from "react-icons/fa6";
import {
  SiJavascript,
  SiPython,
  SiCplusplus,
  SiRuby,
  SiPhp,
  SiSwift,
  SiGo,
  SiKotlin,
  SiRust,
  SiTypescript,
} from "react-icons/si";
import { v4 as uuidv4 } from "uuid";

const iconSize = 16;
const iconStyle = "text-slate-400";

export const allLanguages = [
  {
    id: uuidv4(),
    name: "Javascript",
    icon: <SiJavascript size={iconSize} className={iconStyle} />,
  },
  {
    id: uuidv4(),
    name: "Python",
    icon: <SiPython size={iconSize} className={iconStyle} />,
  },
  {
    id: uuidv4(),
    name: "Java",
    icon: <FaJava size={iconSize} className={iconStyle} />,
  },
  {
    id: uuidv4(),
    name: "C++",
    icon: <SiCplusplus size={iconSize} className={iconStyle} />,
  },
  {
    id: uuidv4(),
    name: "Ruby",
    icon: <SiRuby size={iconSize} className={iconStyle} />,
  },
  {
    id: uuidv4(),
    name: "PHP",
    icon: <SiPhp size={iconSize} className={iconStyle} />,
  },
  {
    id: uuidv4(),
    name: "Swift",
    icon: <SiSwift size={iconSize} className={iconStyle} />,
  },
  {
    id: uuidv4(),
    name: "Go",
    icon: <SiGo size={iconSize} className={iconStyle} />,
  },
  {
    id: uuidv4(),
    name: "Kotlin",
    icon: <SiKotlin size={iconSize} className={iconStyle} />,
  },
  {
    id: uuidv4(),
    name: "Rust",
    icon: <SiRust size={iconSize} className={iconStyle} />,
  },
  {
    id: uuidv4(),
    name: "TypeScript",
    icon: <SiTypescript size={iconSize} className={iconStyle} />,
  },
];
