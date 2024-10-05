"use client";
import { SingleNote, SingleTag } from "@/app/Types";
import { useGlobalContext } from "@/ContextApi";
import { on } from "events";
import {
  LucideEdit,
  LucideEdit2,
  LucideFileText,
  LucidePencil,
  LucideTags,
  LucideType,
  LucideX,
} from "lucide-react";
import React, { use, useEffect, useRef, useState } from "react";

const NoteContent = () => {
  const [singleNote, setSingleNote] = useState<SingleNote | undefined>();
  const {
    openContentObject: { setOpenContent, openContent },
    selectedNoteObject: { selectedNote, setSelectedNote },
    isNewNoteObject: { isNewNote, setIsNewNote },
    allNotesObject: { allNotes, setAllNotes },
  } = useGlobalContext();

  useEffect(() => {
    if (openContent) {
      if (selectedNote) {
        setSingleNote(selectedNote);
      }
    }
  }, [openContent, selectedNote]);

  useEffect(() => {
    if (isNewNote) {
      if (singleNote && singleNote.title !== "") {
        setAllNotes([...allNotes, singleNote]);
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

  const handleTitleUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <LucideType
          className={onFocus || hovered ? "text-mainColor" : "text-slate-400"}
          size={20}
        />
        <textarea
          value={singleNote?.title}
          placeholder="New title..."
          onChange={handleTitleUpdate}
          onKeyDown={handleKeyDown}
          rows={1}
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
    <ul className="absolute top-10 right-0 bg-slate-100 w-[60%] p-3 rounded-md flex flex-col gap-2">
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
