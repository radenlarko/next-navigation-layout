import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";

const TopNavbar = () => {
  return (
    <Box bg="pink.100">
      <HStack
        maxW="7xl"
        px={2}
        py={1}
        spacing={6}
        mx="auto"
        justifyContent="space-between"
        fontSize="xs"
      >
        <HStack cursor="pointer">
          <Text _hover={{ color: "pink.400" }}>Download App</Text>
          <Text _hover={{ color: "pink.400" }}>Pusat Bantuan</Text>
        </HStack>
        <HStack cursor="pointer">
          <Text _hover={{ color: "pink.400" }}>Solusi Bisnis</Text>
          <Text _hover={{ color: "pink.400" }}>Jasa Desain Interior</Text>
          <Text _hover={{ color: "pink.400" }}>Gratis Ongkir</Text>
        </HStack>
      </HStack>
    </Box>
  );
};

export default TopNavbar;
