import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "@/components/Layout";
import ContextProvider from "@/store/MainContext";
import { useMemo } from "react";
import { LinkItem } from "@/types";

export default function App({ Component, pageProps }: AppProps) {
  const { data, isCustomLayout } = pageProps;

  const dataLink = useMemo<LinkItem | undefined>(() => {
    if (data?.name && data?.link) {
      return data as LinkItem;
    }
  }, [data]);

  return (
    <ChakraProvider>
      <ContextProvider>
        {isCustomLayout ? (
          <Component {...pageProps} />
        ) : (
          <Layout data={dataLink}>
            <Component {...pageProps} />
          </Layout>
        )}
      </ContextProvider>
    </ChakraProvider>
  );
}
