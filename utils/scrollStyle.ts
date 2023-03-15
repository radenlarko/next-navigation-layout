import { SystemStyleObject } from "@chakra-ui/react";

const sx: SystemStyleObject = {
  "&::-webkit-scrollbar": {
    width: "10px",
    height: "10px",
    bg: "whiteAlpha.100",
  },
  "&::-webkit-scrollbar-thumb": {
    bg: "blackAlpha.100",
    borderRadius: "3px",
  },
};

export default sx;
