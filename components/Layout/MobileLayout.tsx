import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  HStack,
  IconButton,
  Input,
  Text,
  Icon,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsBellFill, BsCartFill } from "react-icons/bs";
import { mobileMenu } from "@/utils/listMenu";

const MobileLayout = () => {
  const { pathname } = useRouter();
  const [scrollActive, setScrollActive] = useState(false);

  useEffect(() => {
    const handleSetScroll = () => {
      setScrollActive(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleSetScroll);

    return () => {
      window.removeEventListener("scroll", handleSetScroll);
    };
  }, []);
  return (
    <>
      <Box
        display={{ base: "block", md: "none" }}
        bg={scrollActive ? "white" : undefined}
        position="fixed"
        zIndex={51}
        w="full"
      >
        <HStack minH="48px" px={2}>
          <Box flex={1}>
            <Input
              placeholder="search"
              size="sm"
              bg="whiteAlpha.800"
              borderRadius="lg"
            />
          </Box>
          <HStack>
            <IconButton
              aria-label="notification"
              icon={<BsBellFill />}
              variant={scrollActive ? "ghost" : "solid"}
              bg="whiteAlpha.800"
              size="sm"
            />
            <IconButton
              aria-label="notification"
              icon={<BsCartFill />}
              variant={scrollActive ? "ghost" : "solid"}
              bg="whiteAlpha.800"
              size="sm"
            />
          </HStack>
        </HStack>
      </Box>
      <Box
        display={{ base: "block", md: "none" }}
        bg="white"
        pos="fixed"
        bottom={0}
        left={0}
        zIndex={53}
        w="full"
      >
        <HStack minH="64px" px={2} justifyContent="space-around">
          {mobileMenu.map((item) => (
            <Flex
              key={item.link}
              as={Link}
              flexDir="column"
              alignItems="center"
              color={pathname === item.link ? "pink.400" : "gray.600"}
              href={item.link}
            >
              <Icon as={item.icon} boxSize={5} />
              <Text fontSize="sm">{item.name}</Text>
            </Flex>
          ))}
        </HStack>
      </Box>
    </>
  );
};

export default MobileLayout;
