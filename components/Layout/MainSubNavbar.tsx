import { MainContext } from "@/store/MainContext";
import { KategoriItem, MenuDesktop } from "@/types";
import { Box, HStack, Text } from "@chakra-ui/react";
import debounce from "lodash.debounce";
import Link from "next/link";
import React, { useContext, useRef, useState } from "react";
import MegaMenu from "./MegaMenu";

interface Props {
  menuType: MenuDesktop;
  setOpacity: React.Dispatch<React.SetStateAction<number>>;
}

const initialMenuProp = {
  name: "",
  mainImage: "",
  images: [],
  items: [],
};

const MainSubNavbar = ({ menuType, setOpacity }: Props) => {
  const { dataLink } = useContext(MainContext);
  const [menuProp, setMenuProp] = useState<KategoriItem>(initialMenuProp);

  const setMenuPropDebounce = useRef(
    debounce((value: KategoriItem) => setMenuProp(value), 300)
  ).current;
  return (
    <Box
      role="group"
      boxShadow={menuProp.name ? "2xl" : "sm"}
      onMouseLeave={() => {
        setMenuProp(initialMenuProp);
        setOpacity(1);
      }}
    >
      <HStack
        maxW="7xl"
        px={2}
        h={50}
        alignItems="center"
        mx="auto"
        spacing={6}
      >
        {menuType.name === "Kategori" ? (
          <>
            {menuType.items.map((item) => (
              <Box
                key={item.name}
                cursor="pointer"
                color={menuProp === item ? "pink.400" : "inherit"}
                _hover={{ color: "pink.400" }}
                onMouseOver={() => {
                  setMenuPropDebounce(item);
                  setOpacity(0.5);
                }}
              >
                <Text>{item.name}</Text>
              </Box>
            ))}
          </>
        ) : (
          <>
            {menuType.items.map((item) => (
              <Box
                key={item.name}
                as={Link}
                cursor="pointer"
                color={dataLink.name === item.name ? "pink.400" : "inherit"}
                _hover={{ color: "pink.400" }}
                href={`/inspirasi/${item.name}`}
              >
                <Text>{item.name}</Text>
              </Box>
            ))}
          </>
        )}
      </HStack>
      <MegaMenu
        menuType={menuType}
        menuProp={menuProp}
        setMenuProp={setMenuProp}
      />
    </Box>
  );
};

export default MainSubNavbar;
