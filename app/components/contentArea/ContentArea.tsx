import NoteContent from "../NoteContent/NoteContent";
import AllNotesSection from "./notesArea/AllNotesSection";
import SwiperSelection from "./notesArea/SwiperSelection";
import DarkMode from "./topbar/DarkMode";
import ProfileUser from "./topbar/ProfileUser";
import SearchBar from "./topbar/SearchBar";
import SidebarMenuIcon from "./topbar/SidebarMenuIcon";

const ContentArea = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[80%] bg-slate-100 p-5 flex-1">
      <TopBar />
      <NotesArea />
      {children}
    </div>
  );
};

export default ContentArea;

function TopBar() {
  return (
    <div className="rounded-lg flex justify-between items-center bg-white p-2">
      <ProfileUser />
      <SearchBar />
      <DarkMode />
      <SidebarMenuIcon />
    </div>
  );
}

function NotesArea() {
  return (
    <div className="mt-5 flex gap-4 relative">
      <div className={`w-full`}>
        <SwiperSelection />
        <AllNotesSection />
      </div>
      <NoteContent />
    </div>
  );
}
