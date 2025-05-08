import {
    Box,
    useColorModeValue,
    Flex,
    CloseButton,
    Text,
    VStack,
    Badge
} from "@chakra-ui/react";
import { useEvents } from "../context/EventsContext";

const SidebarAlert = () => {
    const { events } = useEvents();

    return (
        <Box
            w={{ base: "full", md: "220px" }}
            p={4}
            borderRight="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.600")}
            minH="100vh"
            bgColor={useColorModeValue('gray.100', 'gray.700')}
            overflowY="auto"
        >
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Text fontSize="xl" fontWeight="bold">Eventos</Text>
                <CloseButton display={{ base: "flex", md: "none" }} />
            </Flex>

            <VStack align="start" spacing={3}>
                {events.length === 0 ? (
                    <Text fontSize="sm" color="gray.500">No hay eventos registrados</Text>
                ) : (
                    events.map(event => (
                        <Box
                            key={event.id}
                            p={2}
                            w="full"
                            borderWidth="1px"
                            borderRadius="md"
                            bg={useColorModeValue("white", "gray.800")}
                            boxShadow="sm"
                        >
                            <Text fontWeight="bold" fontSize="sm">{event.title}</Text>
                            <Text fontSize="xs" color="gray.500">{event.date} {event.startTime}-{event.endTime}</Text>
                            <Text fontSize="xs">{event.desc}</Text>
                            <Badge colorScheme={
                                event.priority === 'Alta' ? 'red' :
                                event.priority === 'Media' ? 'yellow' : 'green'
                            }>
                                {event.priority}
                            </Badge>
                        </Box>
                    ))
                )}
            </VStack>
        </Box>
    );
};

export default SidebarAlert;
