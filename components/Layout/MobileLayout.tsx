import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";

const MobileLayout = () => {
  return (
    <>
      <Box
        display={{ base: "block", md: "none" }}
        bg="white"
        position="fixed"
        zIndex={51}
        w="full"
      >
        <Text>Header</Text>
      </Box>
      <Box
        display={{ base: "block", md: "none" }}
        pos="fixed"
        bottom={4}
        right={4}
        zIndex={53}
      >
        <Button colorScheme="pink">Footer Mobile</Button>
      </Box>
    </>
  );
};

export default MobileLayout;
