import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "@/components/Layout";
import ContextProvider from "@/store/MainContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ContextProvider>
        <Layout data={pageProps.data}>
          <Component {...pageProps} />
        </Layout>
      </ContextProvider>
    </ChakraProvider>
  );
}
