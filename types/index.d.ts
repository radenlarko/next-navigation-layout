import { IconType } from "react-icons/lib";

export interface LinkItem {
  name: string;
  link: string;
}

export interface LinkItemMobile extends LinkItem {
  icon: IconType;
}

export interface LinkKategoriItem {
  title: string;
  links: LinkItem[];
}

export interface KategoriItem {
  name: string;
  mainImage: string;
  images: string[];
  items: LinkKategoriItem[];
}

export type MenuDesktop =
  | {
      name: "Inspirasi";
      items: LinkItem[];
    }
  | {
      name: "Kategori";
      items: KategoriItem[];
    };
