import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Text,
  Flex,
  useColorModeValue
} from "@chakra-ui/react";
import dayjs from "dayjs";

const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);

  const startOfMonth = currentDate.startOf("month");
  const startDay = startOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();

  const handlePrevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const bgSelected = useColorModeValue("gray.300", "gray.600");
  const bgToday = useColorModeValue("gray.300", "gray.600");

  const today = dayjs();

  const renderCalendarDays = () => {
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<Box key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = currentDate.date(day);
      const isSelected = selectedDate?.isSame(date, 'day');
      const isToday = date.isSame(today, 'day');

      let bg = "transparent";
      if (isSelected) bg = bgSelected;
      else if (isToday) bg = bgToday;

      days.push(
        <Button
          key={day}
          onClick={() => setSelectedDate(date)}
          bg={bg}
          _hover={{ bg: useColorModeValue('gray.300', 'black') }}
        >
          {day}
        </Button>
      );
    }

    return days;
  };

  return (
    <Box p={5} maxW="md" mx="auto" borderWidth={1} borderRadius="lg">
      <Flex justify="space-between" align="center" mb={4}>
        <Button onClick={handlePrevMonth}>&lt;</Button>
        <Text fontWeight="bold">
          {currentDate.format("MMMM YYYY")}
        </Text>
        <Button onClick={handleNextMonth}>&gt;</Button>
      </Flex>

      <Grid templateColumns="repeat(7, 1fr)" textAlign="center" fontWeight="bold">
        {daysOfWeek.map((day) => (
          <Box key={day}>{day}</Box>
        ))}
      </Grid>

      <Grid templateColumns="repeat(7, 1fr)" gap={2} mt={2}>
        {renderCalendarDays()}
      </Grid>
    </Box>
  );
}
