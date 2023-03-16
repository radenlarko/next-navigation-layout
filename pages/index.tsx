import Head from "next/head";
import { Inter } from "next/font/google";
import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Image as ChakraImage,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import debounce from "lodash.debounce";
import { menuDesktop } from "@/utils/listMenu";
import { KategoriItem, MenuDesktop } from "@/types";
import sx from "@/utils/scrollStyle";
import Image from "next/image";
import srces from "@/utils/listImage";

const inter = Inter({ subsets: ["latin"] });

const initialMenuProp = {
  name: "",
  mainImage: "",
  images: [],
  items: [],
};

export default function Home() {
  const [menuType, setMenuType] = useState<MenuDesktop>(menuDesktop[0]);
  const [menuProp, setMenuProp] = useState<KategoriItem>(initialMenuProp);

  const setMenuPropDebounce = useRef(
    debounce((value: KategoriItem) => setMenuProp(value), 300)
  ).current;
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <Box bg="gray.100" minH="100vh" position="relative">
          <Box bg="white" position="fixed" zIndex={50} w="full">
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
              boxShadow="sm"
              onMouseLeave={() => setMenuProp(initialMenuProp)}
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
                        onMouseOver={() => setMenuPropDebounce(item)}
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
                        cursor="pointer"
                        _hover={{ color: "pink.400" }}
                      >
                        <Text>{item.name}</Text>
                      </Box>
                    ))}
                  </>
                )}
              </HStack>
              {menuType.name === "Kategori" && menuProp.name ? (
                <Stack
                  direction="row"
                  maxW="7xl"
                  px={2}
                  mx="auto"
                  h="360px"
                  pb={8}
                  spacing={6}
                  display="none"
                  _groupHover={{ display: "flex" }}
                >
                  <Box flex={1} overflow="auto" sx={sx}>
                    <Box sx={{ columnCount: [1, 2, 3], columnGap: "16px" }}>
                      {menuProp.items.map((val) => (
                        <Box key={val.title} mb={4} display="inline-block">
                          <Text fontWeight={500} fontSize="lg">
                            {val.title}
                          </Text>
                          <Stack spacing={1}>
                            {val.links.map((link) => (
                              <Box
                                key={link.link}
                                cursor="pointer"
                                onClick={() => setMenuProp(initialMenuProp)}
                              >
                                <Text
                                  fontSize="sm"
                                  _hover={{ color: "pink.400" }}
                                >
                                  {link.name}
                                </Text>
                              </Box>
                            ))}
                          </Stack>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  <Box w="460px" display={{ base: "none", lg: "block" }}>
                    <Box
                      position="relative"
                      borderRadius="lg"
                      overflow="hidden"
                    >
                      <Image
                        src={menuProp.mainImage}
                        alt="main-section"
                        width={460}
                        height={210}
                        style={{ objectFit: "cover", width: 460, height: 210 }}
                      />
                    </Box>
                    <Box mt={4}>
                      <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                        {menuProp.images.map((img) => (
                          <GridItem key={img}>
                            <Box
                              position="relative"
                              borderRadius="lg"
                              overflow="hidden"
                            >
                              <Image
                                src={img}
                                alt="sub-section"
                                width={153}
                                height={90}
                                style={{
                                  objectFit: "cover",
                                  width: 153,
                                  height: 90,
                                }}
                              />
                            </Box>
                          </GridItem>
                        ))}
                      </Grid>
                    </Box>
                  </Box>
                </Stack>
              ) : null}
            </Box>
          </Box>
          <Box pos="fixed" bottom={10} right={10} zIndex={52}>
            <Button colorScheme="pink">Contact Us</Button>
          </Box>
          <Box
            p={2}
            pt={24}
            maxW="7xl"
            mx="auto"
            sx={{ columnCount: [1, 2, 4], columnGap: 2 }}
          >
            {srces.map((src) => (
              <Box
                key={src}
                borderRadius="xl"
                mb={1}
                display="inline-block"
                overflow="hidden"
              >
                <ChakraImage src={src} alt="Alt" />
              </Box>
            ))}
          </Box>
        </Box>
      </main>
    </>
  );
}
