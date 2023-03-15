export interface LinkItem {
  name: string;
  link: string;
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
