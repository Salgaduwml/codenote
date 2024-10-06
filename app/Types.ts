export interface SidebarMenu {
  id: number;
  name: string;
  isSelected: boolean;
  icons: React.ReactNode;
}

export interface DarkModeType {
  id: number;
  icon: React.ReactNode;
  isSelected: boolean;
}

export interface SingleNote {
  _id: string;
  title: string;
  isFavorite: boolean;
  tags: SingleTag[];
  discription: string;
  code: string;
  language: Language;
  createdAt: string;
}

export interface SingleTag {
  _id: string;
  name: string;
}

export interface Language {
  id: string;
  name: string;
  icon: React.ReactNode;
}
