"use client";
import { v4 as uuidv4 } from "uuid";
import { SingleNote } from "@/app/Types";
import { useGlobalContext } from "@/ContextApi";
import { Search } from "lucide-react";

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
      createdAt: "",
      code: "",
      isFavorite: false,
      discription: "",
      language: "",
      tags: [],
    };
    setIsNewNote(true);
    setSelectedNote(newSingleNote);
    setOpenContent(true);
  };

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
