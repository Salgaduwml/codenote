"use client";
import type { Language, SingleNote, SingleTag } from "@/app/Types";
import { useGlobalContext } from "@/ContextApi";
import { LucideDelete, LucideHeart, LucideTrash } from "lucide-react";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const AllNotesSection = () => {
  const {
    allNotesObject: { allNotes },
  } = useGlobalContext();
  return (
    <div className="mt-5 flex flex-wrap gap-4">
      {allNotes.map((note) => (
        <div key={note._id}>
          <SingleNote note={note} />
        </div>
      ))}
    </div>
  );
};

export default AllNotesSection;

function SingleNote({ note }: { note: SingleNote }) {
  return (
    <div className="bg-white rounded p-4 flex-1">
      <NoteHeader title={note.title} isFavorite={note.isFavorite} note={note} />
      <NoteDate date={note.createdAt} />
      <NoteTags tags={note.tags} />
      <NoteDescription description={note.discription} />
      <CodeBlock language={note.language} codeString={note.code} />
      <NoteFooter language={note.language} />
    </div>
  );
}

function NoteHeader({
  title,
  isFavorite,
  note,
}: {
  title: string;
  isFavorite: boolean;
  note: SingleNote;
}) {
  const {
    openContentObject: { setOpenContent },
    selectedNoteObject: { setSelectedNote },
  } = useGlobalContext();

  const handleClick = () => {
    setOpenContent(true);
    setSelectedNote(note);
  };

  return (
    <div className="flex justify-between gap-4">
      <h3
        className="font-bold hover:text-mainColor transition-colors duration-300 cursor-pointer"
        onClick={() => handleClick()}
      >
        {title}
      </h3>
      <LucideHeart
        className={`cursor-pointer shrink-0 ${
          isFavorite ? "fill-mainColor text-mainColor" : "text-slate-400"
        }`}
        size={20}
        strokeWidth={1.5}
      />
    </div>
  );
}

function NoteDate({ date }: { date: string }) {
  return <div className="text-slate-400 text-xs mt-1">{date}</div>;
}

function NoteTags({ tags }: { tags: SingleTag[] }) {
  return (
    <div className="flex text-slate-500 text-xs flex-wrap gap-1 mt-4">
      {tags.map((tag) => (
        <span
          key={tag._id}
          className="bg-mainColor/10 text-mainColor p-1 rounded-md px-2"
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
}

function NoteDescription({ description }: { description: string }) {
  return <div className="text-slate-600 text-sm mt-4">{description}</div>;
}

interface CodeBlockProps {
  language: Language;
  codeString: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, codeString }) => {
  return (
    <div className="rounded-md overflow-hidden text-sm mt-4">
      <SyntaxHighlighter language={language.name} style={docco}>
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

function NoteFooter({ language }: { language: Language }) {
  return (
    <div className="text-slate-400 text-sm mt-4 flex justify-between items-center gap-4">
      <div className="text-sm flex items-center gap-1">
        {language.icon}
        {language.name}
      </div>
      <div className="">
        <LucideTrash size={18} strokeWidth={1.5} />
      </div>
    </div>
  );
}
