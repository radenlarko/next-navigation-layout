import { useRouter } from "next/router";
import Link from "next/link";
import { MenuDesktop } from "@/types";
import { menuDesktop } from "@/utils/listMenu";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  Menu,
  MenuButton,
  Text,
  Icon,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useCallback, useContext } from "react";
import { BsBellFill, BsCartFill, BsSearch } from "react-icons/bs";
import { FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";
import { MainContext } from "@/store/MainContext";

interface Props {
  menuType: MenuDesktop;
  setMenuType: React.Dispatch<React.SetStateAction<MenuDesktop>>;
}

const MainNavbar = ({ menuType, setMenuType }: Props) => {
  const { push } = useRouter();
  const { username, signOut } = useContext(MainContext);

  const handleLogout = useCallback(() => {
    signOut();
    setTimeout(() => {
      push("/auth/login");
    }, 500);
  }, [push, signOut]);

  return (
    <HStack maxW="7xl" p={2} spacing={6} mx="auto">
      <Box as={Link} position="relative" href="/">
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
      {username ? (
        <Menu>
          <MenuButton
            as={Button}
            fontWeight={400}
            variant="ghost"
            _hover={{ color: "pink.400" }}
            _active={{ bg: "inherit" }}
          >
            <HStack>
              <Box textAlign="left">
                <Text fontSize="xs">Selamat Datang</Text>
                <Text fontSize="sm" fontWeight={500}>
                  {username}
                </Text>
              </Box>
              <Icon as={FiChevronDown} />
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} href="/profile" icon={<FiUser />}>
              Profile
            </MenuItem>
            <MenuItem icon={<FiLogOut />} onClick={handleLogout}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <HStack>
          <Button
            as={Link}
            variant="outline"
            colorScheme="pink"
            href="/auth/login"
          >
            Masuk
          </Button>
          <Button colorScheme="pink">Daftar</Button>
        </HStack>
      )}
    </HStack>
  );
};

export default MainNavbar;
