import srces from "@/utils/listImage";
import { customIndicatorCarousel } from "@/utils/myFunction";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { Carousel } from "react-responsive-carousel";

const MainCarousel = () => {
  return (
    <Box borderRadius={{ base: "none", md: "xl" }} overflow="hidden">
      <Carousel
        autoPlay
        interval={5000}
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        showIndicators
        renderIndicator={customIndicatorCarousel}
      >
        {srces.map((item) => (
          <Box key={item} position="relative" w="full" h="300px">
            <Image
              src={item}
              alt="carousel"
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default MainCarousel;
