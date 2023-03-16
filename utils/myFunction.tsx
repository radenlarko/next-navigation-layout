import { KategoriItem, LinkItem } from "@/types";

export const reduceLinkItem = (data: KategoriItem[]): LinkItem[] => {
  const dataTemp: LinkItem[] = [];

  data.map((item) => {
    item.items.map((child) => {
      child.links.map((link) => {
        dataTemp.push(link);
        return link;
      });
      return child;
    });
    return item;
  });

  return dataTemp;
};
