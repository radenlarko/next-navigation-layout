import { KategoriItem, MenuDesktop } from "@/types";
import sx from "@/utils/scrollStyle";
import { Box, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";

interface Props {
  menuType: MenuDesktop;
  menuProp: KategoriItem;
  setMenuProp: React.Dispatch<React.SetStateAction<KategoriItem>>;
}

const initialMenuProp = {
  name: "",
  mainImage: "",
  images: [],
  items: [],
};

const MegaMenu = ({ menuType, menuProp, setMenuProp }: Props) => {
  const isMegaMenu = useMemo(() => {
    if (menuType.name === "Kategori" && menuProp.name) {
      return true;
    }

    return false;
  }, [menuType.name, menuProp.name]);
  return (
    <Stack
      direction="row"
      maxW="7xl"
      px={2}
      mx="auto"
      h={0}
      pb={isMegaMenu ? 8 : 0}
      spacing={6}
      _groupHover={{
        h: isMegaMenu ? "360px" : 0,
      }}
      transition="all 0.3s ease"
      overflow="hidden"
    >
      <Box flex={1} overflow="auto" sx={sx} opacity={isMegaMenu ? 1 : 0}>
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
                    as={Link}
                    cursor="pointer"
                    onClick={() => setMenuProp(initialMenuProp)}
                    href={`/kategori/${link.name}`}
                  >
                    <Text fontSize="sm" _hover={{ color: "pink.400" }}>
                      {link.name}
                    </Text>
                  </Box>
                ))}
              </Stack>
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        w="460px"
        display={{ base: "none", lg: "block" }}
        opacity={isMegaMenu ? 1 : 0}
      >
        <Box position="relative" borderRadius="lg" overflow="hidden">
          {isMegaMenu ? (
            <Image
              src={menuProp.mainImage}
              alt="main-section"
              width={460}
              height={210}
              style={{ objectFit: "cover", width: 460, height: 210 }}
            />
          ) : null}
        </Box>
        <Box mt={4}>
          <Grid templateColumns="repeat(3, 1fr)" gap={2}>
            {menuProp.images.map((img) => (
              <GridItem key={img}>
                <Box position="relative" borderRadius="lg" overflow="hidden">
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
  );
};

export default MegaMenu;
