import { MenuDesktop } from "@/types";
import { menuDesktop } from "@/utils/listMenu";
import { Box, Button, HStack, IconButton, Input, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { BsBellFill, BsCartFill, BsSearch } from "react-icons/bs";

interface Props {
  menuType: MenuDesktop;
  setMenuType: React.Dispatch<React.SetStateAction<MenuDesktop>>;
}

const MainNavbar = ({ menuType, setMenuType }: Props) => {
  return (
    <HStack maxW="7xl" p={2} spacing={6} mx="auto">
      <Box position="relative">
        <Image
          src="/logo-brand.svg"
          alt="logo-brand"
          width={68}
          height={30}
          style={{ objectFit: "contain" }}
        />
      </Box>
      <HStack>
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
      <HStack flex={1}>
        <Box flex={1}>
          <Input placeholder="search.." />
        </Box>
        <IconButton
          aria-label="search"
          icon={<BsSearch />}
          colorScheme="pink"
        />
      </HStack>
      <HStack>
        <IconButton
          aria-label="notification"
          icon={<BsBellFill />}
          variant="ghost"
        />
        <IconButton
          aria-label="notification"
          icon={<BsCartFill />}
          variant="ghost"
        />
      </HStack>
      <HStack>
        <Button variant="outline" colorScheme="pink">
          Masuk
        </Button>
        <Button colorScheme="pink">Daftar</Button>
      </HStack>
    </HStack>
  );
};

export default MainNavbar;
