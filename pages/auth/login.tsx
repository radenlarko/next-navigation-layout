import { LoginInputs } from "@/types/formValue";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
  isCustomLayout: boolean;
}

const defaultValues: LoginInputs = {
  username: "",
  password: "",
};

const Login: NextPage<Props> = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginInputs>({ defaultValues });

  const onSubmit: SubmitHandler<LoginInputs> = (dataSubmit) => {
    console.log(dataSubmit);
  };

  return (
    <Box bg="rgb(238, 77, 45)" minH="100vh">
      <Box position="fixed" w="full" bg="white">
        <HStack
          maxW="7xl"
          mx="auto"
          px={2}
          py={4}
          justifyContent="space-between"
        >
          <HStack spacing={4}>
            <Box as={Link} position="relative" href="/">
              <Image
                src="/logo-brand.svg"
                alt="logo-brand"
                width={68}
                height={30}
                style={{ objectFit: "contain" }}
              />
            </Box>
            <Box>
              <Text
                fontSize="2xl"
                fontWeight={500}
                textTransform="uppercase"
                letterSpacing="10px"
              >
                Login
              </Text>
            </Box>
          </HStack>
          <Box>
            <Text
              fontSize="sm"
              textDecoration="underline"
              color="rgb(238, 77, 45)"
              cursor="pointer"
              _hover={{ color: "orange.300" }}
            >
              Butuh bantuan?
            </Text>
          </Box>
        </HStack>
      </Box>
      <Box
        maxW="7xl"
        mx="auto"
        pt={{ base: 32, md: 60 }}
        px={{ base: 4, md: 0 }}
        position="relative"
      >
        <Box
          display={{ base: "none", md: "block" }}
          position="relative"
          h={400}
        >
          <Image
            src="/shopee.jpg"
            alt="shopee"
            fill
            sizes="100vw"
            style={{ objectFit: "contain" }}
          />
        </Box>
        <Box
          position={{ base: "relative", md: "absolute" }}
          top={{ base: undefined, md: 60 }}
          right={{ base: undefined, md: 10 }}
          w={{ base: "full", md: "420px" }}
          p={4}
          bg="white"
          borderRadius="xl"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl isInvalid={errors.username ? true : false}>
                <FormLabel>User Name</FormLabel>
                <Input
                  type="text"
                  placeholder="input email address"
                  {...register("username", {
                    required: "username tidak boleh kosong!",
                  })}
                />
                <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password ? true : false}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="input password"
                    {...register("password", {
                      required: "password tidak boleh kosong!",
                    })}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
              <Button type="submit">Masuk</Button>
            </Stack>
          </form>
        </Box>
      </Box>
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
