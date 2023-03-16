import { useRouter } from "next/router";
import { MainContext } from "@/store/MainContext";
import { LinkItem } from "@/types";
import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import React, { useContext, useEffect, useState } from "react";
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";

interface Props extends BoxProps {
  data: LinkItem;
  children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children, data, ...rest }: Props) => {
  const { pathname } = useRouter();
  const { setLinkItem } = useContext(MainContext);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (data) {
      setLinkItem(data);
    }
  }, [data, setLinkItem]);
  return (
    <Box
      className={inter.className}
      bg={useColorModeValue(
        opacity === 1 ? "gray.50" : "blackAlpha.500",
        "gray.800"
      )}
      minH="100vh"
      position="relative"
      transition="all 0.5s ease"
    >
      <DesktopLayout setOpacity={setOpacity} />
      <MobileLayout />
      <Box
        opacity={opacity}
        p={pathname === "/" ? { base: 0, md: 2 } : 2}
        pt={pathname === "/" ? { base: 0, md: 44 } : { base: 14, md: 44 }}
        pb={pathname === "/" ? { base: 16, md: 8 } : { base: 24, md: 8 }}
        maxW="7xl"
        mx="auto"
        transition="opacity 0.5s ease"
        {...rest}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
