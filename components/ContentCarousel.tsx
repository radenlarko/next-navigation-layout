import { sxNone } from "@/utils/scrollStyle";
import { Flex, FlexProps, IconButton, IconButtonProps } from "@chakra-ui/react";
import debounce from "lodash.debounce";
import React, { useCallback, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Props extends FlexProps {
  children: React.ReactNode;
  iconSize?: "sm" | "md" | "lg" | "xs";
}

const IconNavigate = ({ ...rest }: IconButtonProps) => {
  return (
    <IconButton
      display={{ base: "none", md: "flex" }}
      position="absolute"
      opacity={0}
      bg="whiteAlpha.800"
      borderRadius="full"
      boxShadow="md"
      transition="all 0.3s ease"
      _disabled={{ opacity: 0 }}
      _hover={{ bg: "white" }}
      _groupHover={{
        opacity: 1,
        _disabled: { opacity: 0, cursor: "default" },
      }}
      {...rest}
    />
  );
};

const ContentCarousel = ({ children, iconSize, ...rest }: Props) => {
  const [navScroll, setNavScroll] = useState({
    prev: false,
    next: true,
  });
  const hscroll = useRef<HTMLDivElement | null>(null);

  const moveRight = useCallback(() => {
    const el = hscroll.current;
    if (el) {
      return (el.scrollLeft += 800);
    }
  }, []);

  const moveLeft = useCallback(() => {
    const el = hscroll.current;
    if (el) {
      return (el.scrollLeft -= 800);
    }
  }, []);

  const handleSetHscrollVal = useRef(
    debounce((scrollLeft: number, currentWidth: number, totalWidth: number) => {
      setNavScroll({
        prev: scrollLeft > 50,
        next: currentWidth !== totalWidth,
      });
    }, 300)
  ).current;
  return (
    <Flex
      direction="column"
      position="relative"
      justifyContent="center"
      role="group"
      {...rest}
    >
      <Flex
        ref={hscroll}
        overflowX="scroll"
        scrollBehavior="smooth"
        onScroll={(e) => {
          const scrollLeft = e.currentTarget.scrollLeft;
          const currentWidth = scrollLeft + e.currentTarget.clientWidth;
          const totalWidth = e.currentTarget.scrollWidth;
          handleSetHscrollVal(scrollLeft, currentWidth, totalWidth);
        }}
        sx={sxNone}
      >
        {children}
      </Flex>
      <IconNavigate
        left={-6}
        aria-label="previous"
        icon={<FiChevronLeft />}
        onClick={moveLeft}
        isDisabled={!navScroll.prev}
        size={iconSize || "lg"}
      />
      <IconNavigate
        right={-6}
        aria-label="next"
        icon={<FiChevronRight />}
        onClick={moveRight}
        isDisabled={!navScroll.next}
        size={iconSize || "lg"}
      />
    </Flex>
  );
};

export default ContentCarousel;
