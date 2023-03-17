import { Box, Text } from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import React from "react";

interface Props {
  isCustomLayout: boolean;
}

const Login: NextPage<Props> = () => {
  return (
    <Box>
      <Text>Custom Layout</Text>
      <Text>Halaman Login</Text>
    </Box>
  );
};

export default Login;

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      isCustomLayout: true,
    },
  };
};
