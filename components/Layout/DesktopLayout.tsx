import { MainContext } from "@/store/MainContext";
import { KategoriItem, LinkItem, MenuDesktop } from "@/types";
import { menuDesktop } from "@/utils/listMenu";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import debounce from "lodash.debounce";
import Link from "next/link";
import React, { useContext, useRef, useState } from "react";
import MegaMenu from "./MegaMenu";

interface Props {
  setOpacity: React.Dispatch<React.SetStateAction<number>>;
}

const initialMenuProp = {
  name: "",
  mainImage: "",
  images: [],
  items: [],
};

const DesktopLayout = ({ setOpacity }: Props) => {
  const {dataLink} = useContext(MainContext);
  const [menuType, setMenuType] = useState<MenuDesktop>(menuDesktop[0]);
  const [menuProp, setMenuProp] = useState<KategoriItem>(initialMenuProp);

  const setMenuPropDebounce = useRef(
    debounce((value: KategoriItem) => setMenuProp(value), 300)
  ).current;
  return (
    <>
      <Box
        display={{ base: "none", md: "block" }}
        bg="white"
        position="fixed"
        zIndex={50}
        w="full"
      >
        <HStack maxW="7xl" px={2} h={30} alignItems="center" mx="auto">
          {menuDesktop.map((item) => (
            <Box
              key={item.name}
              cursor="pointer"
              color={menuType.name === item.name ? "pink.400" : "inherit"}
              _hover={{ color: "pink.400" }}
              onClick={() => setMenuType(item)}
            >
              <Text>{item.name}</Text>
            </Box>
          ))}
        </HStack>
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
      </Box>
      <Box
        display={{ base: "none", md: "block" }}
        pos="fixed"
        bottom={10}
        right={10}
        zIndex={52}
      >
        <Button colorScheme="pink">Contact Us</Button>
      </Box>
    </>
  );
};

export default DesktopLayout;
