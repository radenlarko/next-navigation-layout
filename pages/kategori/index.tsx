import Link from "next/link";
import { KategoriItem, LinkItem } from "@/types";
import { menuDesktop } from "@/utils/listMenu";
import { reduceLinkItem } from "@/utils/myFunction";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import React from "react";

interface Props {
  data: LinkItem[];
}

const Kategori: NextPage<Props> = ({ data }) => {
  return (
    <Box>
      <Text fontWeight={500} fontSize="2xl">
        Kategori List
      </Text>
      <SimpleGrid columns={3} gap={4} mt={8}>
        {data.map((item) => (
          <Flex
            key={item.link}
            as={Link}
            bg="gray.200"
            alignItems="center"
            justifyContent="center"
            p={2}
            borderRadius="lg"
            _hover={{ bg: "pink.100" }}
            href={`/kategori/${item.name}`}
          >
            <Text textAlign="center" fontSize="sm">
              {item.name}
            </Text>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Kategori;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const idx = menuDesktop.findIndex((val) => val.name === "Kategori");
  const mainData = reduceLinkItem(menuDesktop[idx].items as KategoriItem[]);
  return {
    props: {
      data: mainData,
    },
  };
};
