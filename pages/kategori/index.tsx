import Link from "next/link";
import { KategoriItem } from "@/types";
import { menuDesktop } from "@/utils/listMenu";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import React from "react";

interface Props {
  data: KategoriItem[];
}

const Kategori: NextPage<Props> = ({ data }) => {
  return (
    <Box>
      <Text fontWeight={500} fontSize="2xl">
        Kategori List
      </Text>
      {data.map((item) => (
        <Box key={item.name} mt={8}>
          <Text fontWeight={500} fontSize="xl">
            {item.name}
          </Text>
          {item.items.map((child) => (
            <Box key={child.title} mt={2}>
              <Text textDecoration="underline">{child.title}</Text>
              <SimpleGrid columns={3} gap={4} mt={1}>
                {child.links.map((link) => (
                  <Flex
                    key={link.link}
                    as={Link}
                    bg="gray.200"
                    alignItems="center"
                    justifyContent="center"
                    p={2}
                    borderRadius="lg"
                    _hover={{ bg: "pink.100" }}
                    href={`/kategori/${link.name}`}
                  >
                    <Text textAlign="center" fontSize="sm">
                      {link.name}
                    </Text>
                  </Flex>
                ))}
              </SimpleGrid>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default Kategori;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const idx = menuDesktop.findIndex((val) => val.name === "Kategori");
  const mainData = menuDesktop[idx].items as KategoriItem[];
  return {
    props: {
      data: mainData,
    },
  };
};
