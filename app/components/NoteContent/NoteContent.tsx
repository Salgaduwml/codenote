"use client";
import { Language, SingleNote, SingleTag } from "@/app/Types";
import { useGlobalContext } from "@/ContextApi";
import { v4 as uuidv4 } from "uuid";
import {
  LucideCheck,
  LucideCheckCheck,
  LucideChevronDown,
  LucideCopy,
  LucideEdit,
  LucideEdit2,
  LucideFileCode,
  LucideFileText,
  LucidePencil,
  LucideSearch,
  LucideTags,
  LucideType,
  LucideX,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-tomorrow";
import { allLanguages } from "@/app/localData/Languages";
import { set } from "mongoose";

const NoteContent = () => {
  const [singleNote, setSingleNote] = useState<SingleNote | undefined>();
  const {
    openContentObject: { setOpenContent, openContent },
    selectedNoteObject: { selectedNote, setSelectedNote },
    isNewNoteObject: { isNewNote, setIsNewNote },
    allNotesObject: { allNotes, setAllNotes },
    selectedLanguageObject: { selectedLanguage, setSelectedLanguage },
  } = useGlobalContext();

  useEffect(() => {
    if (openContent) {
      if (selectedNote) {
        setSingleNote(selectedNote);
        setSelectedLanguage(selectedNote.language);
      }
    }
  }, [openContent, selectedNote]);

  useEffect(() => {
    if (isNewNote) {
      if (singleNote && singleNote.title !== "") {
        const updatedAllNotes = [...allNotes, singleNote];
        const sortedAllNotes = updatedAllNotes.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });

        setAllNotes(sortedAllNotes);
        setIsNewNote(false);
      }
    }
  }, [singleNote]);

  return (
    <div
      className="bg-white shadow w-full max-w-[40%] p-4 rounded-md fixed top-0 right-0 z-10 h-screen transition-transform duration-300"
      style={{
        transform: openContent ? "translateX(0)" : "translateX(100%)",
      }}
    >
      <NoteContentHeader
        singleNote={singleNote}
        setSingleNote={setSingleNote}
      />
      <NoteTags setSingleNote={setSingleNote} singleNote={singleNote} />
      <Description singleNote={singleNote} setSingleNote={setSingleNote} />
      <CodeBlock singleNote={singleNote} setSingleNote={setSingleNote} />
    </div>
  );
};

export default NoteContent;

function NoteContentHeader({
  singleNote,
  setSingleNote,
}: {
  singleNote: SingleNote | undefined;
  setSingleNote: React.Dispatch<React.SetStateAction<SingleNote | undefined>>;
}) {
  const [onFocus, setOnFocus] = useState(false);
  const [hovered, setHovered] = useState(false);

  const {
    allNotesObject: { allNotes, setAllNotes },
    openContentObject: { setOpenContent },
    isNewNoteObject: { isNewNote, setIsNewNote },
  } = useGlobalContext();

  const handleTitleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (singleNote) {
      const newSingleNote = { ...singleNote, title: e.target.value };
      setSingleNote(newSingleNote);

      const newAllNotes = allNotes.map((note) => {
        if (note._id === singleNote?._id) {
          return newSingleNote;
        }
        return note;
      });

      setAllNotes(newAllNotes);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <LucideType
          className={onFocus || hovered ? "text-mainColor" : "text-slate-400"}
          size={20}
        />
        <input
          type="text"
          value={singleNote?.title}
          placeholder="New title..."
          onChange={handleTitleUpdate}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
          className="font-bold text-xl outline-none resize-none max-h-min overflow-hidden w-full"
        />
      </div>
      <button
        className=""
        onClick={() => {
          setIsNewNote(false);
          setOpenContent(false);
        }}
      >
        <LucideX strokeWidth={1.5} className="text-slate-600" />
      </button>
    </div>
  );
}

function NoteTags({
  singleNote,
  setSingleNote,
}: {
  singleNote: SingleNote | undefined;
  setSingleNote: React.Dispatch<React.SetStateAction<SingleNote | undefined>>;
}) {
  const {
    selectedTagsObject: { selectedTags, setSelectedTags },
    allNotesObject: { allNotes, setAllNotes },
  } = useGlobalContext();

  const [hovered, setHovered] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  function onClickedTag(tag: SingleTag) {
    if (
      selectedTags.some(
        (t) => t.name.toLocaleLowerCase() === tag.name.toLocaleLowerCase()
      )
    ) {
      setSelectedTags(
        selectedTags.filter(
          (t) => t.name.toLocaleLowerCase() !== tag.name.toLocaleLowerCase()
        )
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  }

  useEffect(() => {
    if (singleNote) {
      const newSingleNote = { ...singleNote, tags: selectedTags };
      const newAllNotes = allNotes.map((note) =>
        note._id === singleNote?._id ? newSingleNote : note
      );
      setAllNotes(newAllNotes);
      setSingleNote(newSingleNote);
    }
  }, [selectedTags]);

  useEffect(() => {
    if (isOpened) {
      setHovered(true);
    }
  }, [isOpened]);

  return (
    <div className="flex items-center gap-3 text-sm mt-8">
      <LucideTags
        className={hovered ? "text-mainColor" : "text-slate-400"}
        strokeWidth={1.5}
        size={20}
      />
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => !isOpened && setHovered(false)}
        className="relative"
      >
        <div className="flex gap-1.5 items-center relative">
          {singleNote?.tags.length === 0 && (
            <div className="text-slate-400 bg-slate-100 p-1 rounded-md px-2">
              Add new
            </div>
          )}
          {singleNote?.tags.map((tag) => (
            <div
              key={tag._id}
              className="text-slate-400 bg-slate-100 p-1 rounded-md px-2"
            >
              {tag.name}
            </div>
          ))}
          {hovered && (
            <button onClick={() => setIsOpened(!isOpened)}>
              <LucidePencil
                strokeWidth={1.5}
                size={18}
                className="text-slate-400"
              />
            </button>
          )}
          {isOpened && <TagsMenu onClickedTag={onClickedTag} />}
        </div>
      </div>
    </div>
  );
}

function TagsMenu({
  onClickedTag,
}: {
  onClickedTag: (tag: SingleTag) => void;
}) {
  const {
    allTagsObject: { allTags },
    selectedTagsObject: { selectedTags },
  } = useGlobalContext();

  return (
    <ul className="absolute top-10 right-0 max-h-[160px] overflow-y-auto bg-slate-100 w-max z-50 p-3 rounded-md flex flex-col gap-2">
      {allTags.map((tag) => {
        const isSame = selectedTags.some(
          (selectedTag) =>
            selectedTag.name.toLocaleLowerCase() ===
            tag.name.toLocaleLowerCase()
        );

        return (
          <li
            key={tag._id}
            onClick={() => onClickedTag(tag)}
            className={`p-1 px-2 select-none cursor-pointer hover:bg-slate-300 text-slate-500 rounded-md transition-all ${
              isSame ? "bg-slate-300" : ""
            }`}
          >
            {tag.name}
          </li>
        );
      })}
    </ul>
  );
}

function Description({
  singleNote,
  setSingleNote,
}: {
  singleNote: SingleNote | undefined;
  setSingleNote: React.Dispatch<React.SetStateAction<SingleNote | undefined>>;
}) {
  const [hovered, setHovered] = useState(false);
  const [onFocus, setOnFocus] = useState(false);

  const {
    allNotesObject: { allNotes, setAllNotes },
  } = useGlobalContext();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (singleNote) {
      const newSingleNote = { ...singleNote, discription: e.target.value };
      setSingleNote(newSingleNote);
    }
  };

  useEffect(() => {
    if (singleNote) {
      const newSingleNote = {
        ...singleNote,
        discription: singleNote?.discription,
      };
      const newAllNotes = allNotes.map((note) =>
        note._id === singleNote?._id ? newSingleNote : note
      );
      setAllNotes(newAllNotes);
    }
  }, [singleNote]);

  return (
    <div className="flex gap-3 text-sm mt-8">
      <LucideFileText
        className={hovered || onFocus ? "text-mainColor" : "text-slate-400"}
        strokeWidth={1.2}
        size={20}
      />
      <textarea
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setOnFocus(true)}
        onBlur={() => setOnFocus(false)}
        name=""
        id=""
        value={singleNote?.discription}
        onChange={handleChange}
        placeholder="Add a description..."
        className={`border w-full rounded-md outline-none px-3 py-2 ${
          hovered || onFocus ? "border-mainColor" : "border-slate-300"
        }`}
      />
    </div>
  );
}

function CodeBlock({
  setSingleNote,
  singleNote,
}: {
  singleNote: SingleNote | undefined;
  setSingleNote: React.Dispatch<React.SetStateAction<SingleNote | undefined>>;
}) {
  const [hovered, setHovered] = useState(false);
  const [onFocus, setOnFocus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const {
    selectedLanguageObject: { selectedLanguage },
    allNotesObject: { allNotes, setAllNotes },
  } = useGlobalContext();

  const handleChange = (code: string) => {
    if (singleNote) {
      const newSingleNote = { ...singleNote, code };

      const newAllNotes = allNotes.map((note) => {
        if (note._id === singleNote?._id) {
          return newSingleNote;
        }
        return note;
      });
      setAllNotes(newAllNotes);
      setSingleNote(newSingleNote);
    }
  };

  const copyToClipboard = () => {
    if (singleNote) {
      navigator.clipboard
        .writeText(singleNote.code)
        .then(() => setIsCopied(true))
        .catch(() => alert("Failed to copy to clipboard"));
      setTimeout(() => setIsCopied(false), 1500);
    }
  };

  useEffect(() => {
    if (selectedLanguage && singleNote) {
      const updatedNote = { ...singleNote, language: selectedLanguage };

      const newAllNotes = allNotes.map((note) => {
        if (note._id === singleNote?._id) {
          return updatedNote;
        }
        return note;
      });

      setAllNotes(newAllNotes);
      setSingleNote(updatedNote);
    }
  }, [selectedLanguage]);

  return (
    <div className="flex gap-3 text-sm mt-8">
      <LucideFileCode
        className={hovered || onFocus ? "text-mainColor" : "text-slate-400"}
        strokeWidth={1.2}
        size={20}
      />
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`border rounded-lg p-3 pt-16 w-full relative ${
          hovered || onFocus ? "border-mainColor" : "border-slate-300"
        }`}
      >
        <div className="absolute top-4 right-4 z-50">
          <button disabled={isCopied} onClick={copyToClipboard}>
            {isCopied ? (
              <LucideCheckCheck
                className="text-slate-400"
                strokeWidth={1.5}
                size={20}
              />
            ) : (
              <LucideCopy
                className="text-slate-400"
                strokeWidth={1.5}
                size={20}
              />
            )}
          </button>
        </div>

        {/* Language Dropdown */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex gap-2 justify-between  p-2 px-3 rounded-md items-center text-xs mt-3 absolute top-1 left-3 bg-slate-100 text-slate-400 cursor-pointer"
        >
          <div className="flex gap-1 items-center">
            {singleNote?.language.icon}
            <span>{singleNote?.language.name}</span>
          </div>
          <LucideChevronDown strokeWidth={1.5} size={16} />
        </div>
        {isOpen && <LanguageMenu isOpen={isOpen} setIsOpen={setIsOpen} />}
        <AceEditor
          onChange={handleChange}
          mode={singleNote?.language.name.toLocaleLowerCase()}
          theme="tomorrow"
          placeholder="Add your code..."
          width="100%"
          height="300px"
          showPrintMargin={false}
          showGutter={false}
          fontSize={14}
          lineHeight={19}
          value={singleNote?.code}
          highlightActiveLine={false}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
}

function LanguageMenu({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLanguages, setFilteredLanguages] = useState(allLanguages);
  const textRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const {
    selectedLanguageObject: { setSelectedLanguage, selectedLanguage },
  } = useGlobalContext();

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleClickLanguage = (language: Language) => {
    setIsOpen(false);
    setSelectedLanguage(language);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    textRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const filtered = allLanguages.filter((language) =>
      language.name
        .toLocaleLowerCase()
        .includes(searchQuery.toLocaleLowerCase())
    );
    setFilteredLanguages(filtered);
  }, [searchQuery]);

  return (
    <div
      ref={menuRef}
      className="absolute flex flex-col gap-2 p-3 w-[200px] rounded-md left-3 bg-slate-100 z-50 text-slate-400"
    >
      <div className="bg-slate-200 p-1 rounded-md flex gap-1 mb-1 items-center">
        <LucideSearch className="shrink-0" size={18} />
        <input
          type="text"
          ref={textRef}
          onChange={onChangeSearch}
          value={searchQuery}
          className="bg-transparent outline-none"
          placeholder="Search..."
        />
      </div>
      <div className="max-h-[160px] overflow-y-auto bg-slate-100">
        {filteredLanguages.map((language) => {
          const isSelected =
            language.name.toLocaleLowerCase() ===
            selectedLanguage?.name.toLocaleLowerCase();
          return (
            <div
              key={language.id}
              onClick={() => handleClickLanguage(language)}
              className="flex mb-2 gap-2 hover:bg-slate-200 bg-transparent px-3 py-1 rounded-md items-center cursor-pointer"
            >
              {language.icon}
              <span>{language.name}</span>
              {isSelected && (
                <LucideCheck
                  className="text-mainColor"
                  strokeWidth={2}
                  size={16}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
