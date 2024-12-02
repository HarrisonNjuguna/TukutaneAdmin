import React from "react";
import { Box, Text, Icon, Tooltip } from "@chakra-ui/react";

const Information = ({ title, value, icon, boxShadow, tooltipText }) => {
  return (
    <Box
      p="20px"
      borderRadius="8px"
      boxShadow={boxShadow}
      backgroundColor="white"
      transition="0.3s ease-in-out"
      _hover={{ boxShadow: "0px 18px 40px rgba(112, 144, 176, 0.12)" }}
    >
      <Text fontWeight="bold" fontSize="md" color="secondaryGray.900">
        {icon && (
          <Tooltip label={tooltipText} fontSize="sm">
            <span>{icon}</span>
          </Tooltip>
        )}
        {title}
      </Text>
      <Text color="gray.400" fontSize="sm" mt="8px">
        {value}
      </Text>
    </Box>
  );
};

export default Information;
