import { KategoriItem, LinkItem } from "@/types";
import { Text } from "@chakra-ui/react";

type RenderIndicator = (
  clickHandler: (
    e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => void,
  isSelected: boolean,
  index: number,
  label: string
) => React.ReactNode;

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

export const customIndicatorCarousel: RenderIndicator = (
  onClickHandler,
  isSelected,
  index,
  label
) => {
  return (
    <Text
      as="span"
      key={index}
      ml={4}
      cursor="pointer"
      fontSize="3xl"
      color={isSelected ? "pink.400" : "whiteAlpha.600"}
      onClick={onClickHandler}
      onKeyDown={onClickHandler}
      aria-label={`${label} ${index + 1}`}
    >
      •
    </Text>
  );
};
