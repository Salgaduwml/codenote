"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  Heart,
  LogOut,
  Moon,
  Sun,
  TableProperties,
  Trash2,
} from "lucide-react";
import { DarkModeType, SidebarMenu, SingleNote, SingleTag } from "./app/Types";

interface GlobalContexType {
  sidebarMenuObject: {
    sidebarMenu: SidebarMenu[];
    setSidebarMenu: React.Dispatch<React.SetStateAction<SidebarMenu[]>>;
  };
  darkModeObject: {
    darkMode: DarkModeType[];
    setDarkMode: React.Dispatch<React.SetStateAction<DarkModeType[]>>;
  };
  openSidebarObject: {
    openSidebar: boolean;
    setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  };
  openContentObject: {
    openContent: boolean;
    setOpenContent: React.Dispatch<React.SetStateAction<boolean>>;
  };
  allNotesObject: {
    allNotes: SingleNote[];
    setAllNotes: React.Dispatch<React.SetStateAction<SingleNote[]>>;
  };
  selectedNoteObject: {
    selectedNote: SingleNote | null;
    setSelectedNote: React.Dispatch<React.SetStateAction<SingleNote | null>>;
  };
  isNewNoteObject: {
    isNewNote: boolean;
    setIsNewNote: React.Dispatch<React.SetStateAction<boolean>>;
  };
  allTagsObject: {
    allTags: SingleTag[];
    setAllTags: React.Dispatch<React.SetStateAction<SingleTag[]>>;
  };
  selectedTagsObject: {
    selectedTags: SingleTag[];
    setSelectedTags: React.Dispatch<React.SetStateAction<SingleTag[]>>;
  };
}

const contextProvider = createContext<GlobalContexType>({
  sidebarMenuObject: {
    sidebarMenu: [],
    setSidebarMenu: () => {},
  },
  darkModeObject: {
    darkMode: [],
    setDarkMode: () => {},
  },
  openSidebarObject: {
    openSidebar: false,
    setOpenSidebar: () => {},
  },
  openContentObject: {
    openContent: false,
    setOpenContent: () => {},
  },
  allNotesObject: {
    allNotes: [],
    setAllNotes: () => {},
  },
  selectedNoteObject: {
    selectedNote: null,
    setSelectedNote: () => {},
  },
  isNewNoteObject: {
    isNewNote: false,
    setIsNewNote: () => {},
  },
  allTagsObject: {
    allTags: [],
    setAllTags: () => {},
  },
  selectedTagsObject: {
    selectedTags: [],
    setSelectedTags: () => {},
  },
});

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarMenu, setSidebarMenu] = useState<SidebarMenu[]>([
    {
      id: 1,
      name: "All Codes",
      isSelected: true,
      icons: <TableProperties size={20} strokeWidth={1.5} />,
    },
    {
      id: 2,
      name: "Favorites",
      isSelected: false,
      icons: <Heart size={20} strokeWidth={1.5} />,
    },
    {
      id: 3,
      name: "Trash",
      isSelected: false,
      icons: <Trash2 size={20} strokeWidth={1.5} />,
    },
    {
      id: 4,
      name: "Log Out",
      isSelected: false,
      icons: <LogOut size={20} strokeWidth={1.5} />,
    },
  ]);

  const [darkMode, setDarkMode] = useState<DarkModeType[]>([
    {
      id: 1,
      icon: <Sun size={20} strokeWidth={1.5} />,
      isSelected: true,
    },
    {
      id: 2,
      icon: <Moon size={20} strokeWidth={1.5} />,
      isSelected: false,
    },
  ]);

  const [openSidebar, setOpenSidebar] = useState(false);
  const [openContent, setOpenContent] = useState(false);
  const [allNotes, setAllNotes] = useState<SingleNote[]>([]);
  const [selectedNote, setSelectedNote] = useState<SingleNote | null>(null);
  const [isNewNote, setIsNewNote] = useState(false);
  const [allTags, setAllTags] = useState<SingleTag[]>([]);
  const [selectedTags, setSelectedTags] = useState<SingleTag[]>([]);

  useEffect(() => {
    function updateNotes() {
      const allNotes: SingleNote[] = [
        {
          _id: "1",
          title: "JavaScript Basics",
          isFavorite: true,
          tags: [
            { _id: "1", name: "JavaScript" },
            { _id: "2", name: "Basics" },
            { _id: "3", name: "Programming" },
          ],
          discription:
            "This note covers the basic concepts of JavaScript, including variables, data types, and control structures.",
          code: `const greet = () => console.log("Hello, world!");`,
          language: "JavaScript",
          createdAt: "2024-09-29T10:00:00Z",
        },
        {
          _id: "2",
          title: "CSS Flexbox Guide",
          isFavorite: false,
          tags: [
            { _id: "1", name: "CSS" },
            { _id: "2", name: "Flexbox" },
            { _id: "3", name: "Web Design" },
          ],
          discription:
            "A guide to using Flexbox to create responsive web layouts.",
          code: `
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
      }`,
          language: "CSS",
          createdAt: "2024-09-28T15:30:00Z",
        },
        {
          _id: "3",
          title: "Python List Comprehension",
          isFavorite: true,
          tags: [
            { _id: "1", name: "Python" },
            { _id: "2", name: "List" },
          ],
          discription:
            "Explanation of list comprehensions in Python with examples.",
          code: `squares = [x * x for x in range(10)]`,
          language: "Python",
          createdAt: "2024-09-27T08:45:00Z",
        },
      ];

      setTimeout(() => {
        setAllNotes(allNotes);
      }, 1000);
    }

    function updateAllTags() {
      const allTags: SingleTag[] = [
        {
          _id: "1",
          name: "JavaScript",
        },
        {
          _id: "2",
          name: "Basics",
        },
        {
          _id: "3",
          name: "Programming",
        },
        {
          _id: "4",
          name: "CSS",
        },
        {
          _id: "5",
          name: "Flexbox",
        },
        {
          _id: "6",
          name: "Web Design",
        },
        {
          _id: "7",
          name: "Python",
        },
        {
          _id: "8",
          name: "List",
        },
      ];
      setAllTags(allTags);
    }
    updateAllTags();
    updateNotes();
  }, []);

  useEffect(() => {
    setSelectedTags(selectedNote?.tags || []);
  }, [selectedNote]);

  return (
    <contextProvider.Provider
      value={{
        sidebarMenuObject: { sidebarMenu, setSidebarMenu },
        darkModeObject: { darkMode, setDarkMode },
        openSidebarObject: { openSidebar, setOpenSidebar },
        openContentObject: { openContent, setOpenContent },
        allNotesObject: { allNotes, setAllNotes },
        selectedNoteObject: { selectedNote, setSelectedNote },
        isNewNoteObject: { isNewNote, setIsNewNote },
        allTagsObject: { allTags, setAllTags },
        selectedTagsObject: { selectedTags, setSelectedTags },
      }}
    >
      {children}
    </contextProvider.Provider>
  );
}

export const useGlobalContext = () => {
  const context = useContext(contextProvider);

  if (!context) {
    throw new Error(
      "useGlobal context must be used within a GlobalContextProvider"
    );
  }
  return context;
};
