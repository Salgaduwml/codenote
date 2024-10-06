"use client";
import { v4 as uuidv4 } from "uuid";
import { SingleNote } from "@/app/Types";
import { useGlobalContext } from "@/ContextApi";
import { Search } from "lucide-react";
import { allLanguages } from "@/app/localData/Languages";

const SearchBar = () => {
  return (
    <div className="pl-3 relative w-[60%] h-9 bg-slate-100 rounded-3xl flex items-center gap-2">
      <Search size={20} strokeWidth={1.5} />
      <input
        type="text"
        placeholder="Search a snippet..."
        className="w-[70%] outline-none text-sm bg-slate-100 text-slate-500 flex-1"
      />
      <SnippetButton />
    </div>
  );
};

export default SearchBar;

function SnippetButton() {
  const {
    allNotesObject: { allNotes, setAllNotes },
    openContentObject: { setOpenContent },
    selectedNoteObject: { setSelectedNote },
    isNewNoteObject: { isNewNote, setIsNewNote },
  } = useGlobalContext();

  const handleClick = () => {
    const newSingleNote: SingleNote = {
      _id: uuidv4(),
      title: "",
      createdAt: formatDate(new Date()),
      code: "",
      isFavorite: false,
      discription: "",
      language: allLanguages[0],
      tags: [],
    };
    setIsNewNote(true);
    setSelectedNote(newSingleNote);
    setOpenContent(true);
  };

  function formatDate(date: Date) {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  return (
    <div
      onClick={handleClick}
      className="bg-mainColor rounded-full px-0 md:px-4 w-9 md:w-auto h-full py-1 text-sm text-white cursor-pointer select-none flex items-center justify-center gap-2"
    >
      <div className="font-bold">+</div>
      <div className="max-md:hidden">Snippet</div>
    </div>
  );
}
