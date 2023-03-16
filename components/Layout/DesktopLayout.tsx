import { MenuDesktop } from "@/types";
import { menuDesktop } from "@/utils/listMenu";
import { Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import MainNavbar from "./MainNavbar";
import MainSubNavbar from "./MainSubNavbar";
import TopNavbar from "./TopNavbar";

interface Props {
  setOpacity: React.Dispatch<React.SetStateAction<number>>;
}

const DesktopLayout = ({ setOpacity }: Props) => {
  const [menuType, setMenuType] = useState<MenuDesktop>(menuDesktop[0]);
  return (
    <>
      <Box
        display={{ base: "none", md: "block" }}
        position="fixed"
        zIndex={50}
        w="full"
      >
        <TopNavbar />
        <Box bg="white">
          <MainNavbar menuType={menuType} setMenuType={setMenuType} />
          <MainSubNavbar menuType={menuType} setOpacity={setOpacity} />
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
