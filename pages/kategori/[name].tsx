import { KategoriItem, LinkItem } from "@/types";
import { menuDesktop } from "@/utils/listMenu";
import { Box, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";

interface Props {
  data: LinkItem;
}

interface IParams extends ParsedUrlQuery {
  name: string;
}

const initialDetails: LinkItem = {
  name: "",
  link: "",
};

const reduceLinkItem = (data: KategoriItem[]): LinkItem[] => {
  const dataTemp: LinkItem[] = [];

  data.map((item) => {
    item.items.map((child) => {
      child.links.map((link) => {
        dataTemp.push(link);
        return link;
      });
      return child;
    });
    return item;
  });

  return dataTemp;
};

const DetailsKategory: NextPage<Props> = ({ data }) => {
  return (
    <Box>
      <Text fontWeight={500} fontSize="2xl">
        {data.name}
      </Text>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </Box>
  );
};

export default DetailsKategory;

export const getStaticPaths: GetStaticPaths = async () => {
  const idx = menuDesktop.findIndex((val) => val.name === "Kategori");
  const slugs = menuDesktop[idx].items as KategoriItem[];

  const paths = slugs.map((item) => ({
    params: {
      name: item.name,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { name } = params as IParams;
  const idxParrent = menuDesktop.findIndex((val) => val.name === "Kategori");
  const mainData = reduceLinkItem(
    menuDesktop[idxParrent].items as KategoriItem[]
  );
  const idx = mainData.findIndex((item) => item.name === name);
  const dataDetails = idx === -1 ? initialDetails : mainData[idx];
  return {
    props: {
      data: dataDetails,
    },
  };
};
