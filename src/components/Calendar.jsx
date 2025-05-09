import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Text,
  Flex,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import dayjs from "dayjs";

const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export default function Calendar({ events = [] }) {
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

      const hasEvent = events && events.some(event => dayjs(event.date).isSame(date, 'day'));
      const event = events.find(event => dayjs(event.date).isSame(date, 'day'));

      const statusColors = {
        "Hecha": "green.500",
        "Proceso": "yellow.500",
        "Pendiente": "red.500"
      };

      let bg = "transparent";

      if (hasEvent) {
        bg = statusColors[event.status] || 'teal.500';
      } else if (isSelected) {
        bg = bgSelected;
      } else if (isToday) {
        bg = bgToday;
      }

      days.push(
        <Tooltip
          key={day}
          label={hasEvent ? `${event?.title} - ${event?.descripcion}  ${event?.startTime} - ${event?.endTime} ` : ""}
          aria-label="Event Information"
          placement="top"
          maxWidth="200px"
          fontSize="sm"
          padding="8px"
          whiteSpace="normal"
        >
          <Button
            onClick={() => setSelectedDate(date)}
            bg={bg}
            border={isSelected ? '2px solid black' : isToday ? '4px solid gray' : 'none'}
            _hover={{ bg: useColorModeValue('gray.300', 'black') }}
            color={event ? "white" : "inherit"}
          >
            {day}
          </Button>
        </Tooltip>
      );
    }

    return days;
  };

  return (
    <Box p={5} maxW="4xl" mx="auto" borderWidth={1} borderRadius="lg">
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
      <Text textAlign="center"> 🔴 Pendiente 🟡 En proceso 🟢 Hecho </Text>
    </Box>
  );
}
