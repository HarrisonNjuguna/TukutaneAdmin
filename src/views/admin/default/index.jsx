import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Kenya from "assets/img/dashboards/flag.png";
// Custom components
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
  MdEvent,
} from "react-icons/md";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }} gap="20px" mb="20px">
        {/* Earnings */}
        <MiniStatistics
          startContent={
            <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />} />
          }
          name="Earnings"
          value="Ksh 350.4"
        />
        {/* Spend this month */}
        <MiniStatistics
          startContent={
            <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />} />
          }
          name="Spend this month"
          value="Ksh 642.39"
        />
        {/* Sales Growth */}
        <MiniStatistics growth="+23%" name="Sales" value="Ksh 574.34" />
        {/* Balance & Currency Select */}
        <MiniStatistics
          endContent={
            <Flex me="-16px" mt="10px">
              <FormLabel htmlFor="balance">
                <Avatar src={Kenya} />
              </FormLabel>
              <Select id="balance" variant="mini" mt="5px" me="0px" defaultValue="ksh">
                <option value="ksh">Ksh</option>
              </Select>
            </Flex>
          }
          name="Your balance"
          value="Ksh 1,000"
        />
        {/* New Tasks */}
        <MiniStatistics
          startContent={
            <IconBox w="56px" h="56px" bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)" icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />} />
          }
          name="New Tasks"
          value="154"
        />
        {/* Total Projects */}
        <MiniStatistics
          startContent={
            <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={MdFileCopy} color={brandColor} />} />
          }
          name="Total Projects"
          value="2935"
        />
      </SimpleGrid>

      {/* Ticket Sales Overview */}
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap="20px" mb="20px">
        <MiniStatistics
          startContent={
            <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={MdEvent} color={brandColor} />} />
          }
          name="Tickets Sold"
          value="1,200"
          growth="+10%"
        />
        <MiniStatistics
          startContent={
            <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />} />
          }
          name="Upcoming Events"
          value="3"
        />
        <MiniStatistics
          startContent={
            <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />} />
          }
          name="Revenue from Tickets"
          value="Ksh 3,400"
          growth="+15%"
        />
      </SimpleGrid>

      {/* Financial Overview */}
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid>

    </Box>
  );
}
