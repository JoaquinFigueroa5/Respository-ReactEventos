import {
    Box, Heading, Text, Stack, Badge, Flex,
    useDisclosure, Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalBody, ModalFooter, ModalCloseButton,
    Button, Input, FormControl, FormLabel, SimpleGrid,
    FormErrorMessage, Select, useColorModeValue, useToast
} from "@chakra-ui/react";
import EventsList from "./EventList";
import NavBar from "./NavBar";
import Calendar from "./Calendar";
import { useState } from "react";
import { useEvents } from "../context/EventsContext";

const TrabajosView = () => {
    const { events, dispatch } = useEvents();
    const filteredEvents = events.filter(event => event.category.toLowerCase() === 'trabajo');
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [editedEvent, setEditedEvent] = useState({});
    const [formValidation, setFormValidation] = useState({});

    if (filteredEvents.length === 0) {
        return <Text>No hay eventos de trabajo registrados</Text>
    }

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "hecha":
                return "green.500";
            case "proceso":
                return "yellow.500";
            case "pendiente":
                return "red.500";
            default:
                return "gray.700";
        }
    };

    const handleCardClick = (event) => {
        setSelectedEvent(event);
        setEditedEvent(event);
        setFormValidation({});
        onOpen();
    };

    const validateForm = () => {
        const errors = {};
        if (!editedEvent.title) errors.title = "El título es obligatorio";
        if (!editedEvent.priority) errors.priority = "La prioridad es obligatoria";
        if (!editedEvent.descripcion) errors.description = "La descripción es obligatoria";
        if (!editedEvent.date) errors.date = "La fecha es obligatoria";
        if (!editedEvent.startTime) errors.startTime = "La hora de inicio es obligatoria";
        if (!editedEvent.endTime) errors.endTime = "La hora de fin es obligatoria";
        if (!editedEvent.status) errors.status = "El estatus es obligatorio";
        return errors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedEvent((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        const errors = validateForm();
        setFormValidation(errors);
        if (Object.keys(errors).length > 0) return;

        dispatch({ type: 'update', payload: editedEvent });
        toast({
            title: "Evento actualizado.",
            description: "El evento se ha actualizado correctamente.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
        onClose();
    };

    const handleDelete = () => {
        dispatch({ type: 'delete', payload: editedEvent.id });
        toast({
            title: "Evento eliminado.",
            description: "El evento se ha eliminado correctamente.",
            status: "error",
            duration: 5000,
            isClosable: true,
        });
        onClose();
    };


    return (
        <>
            <NavBar />
            <Flex p={10} gap={8} align="flex-start">
                <Box flex="1">
                    <Heading size="lg" mb={4}>Eventos Guardados</Heading>
                    <Stack spacing={4}>
                        {filteredEvents.map(event => (
                            <Box
                                key={event.id}
                                borderWidth="1px"
                                borderRadius="lg"
                                p={4}
                                bg={getStatusColor(event.status)}
                                cursor="pointer"
                                sx={{
                                    transition: "transform 0.2s ease-in-out",
                                    _hover: {
                                        transform: "scale(1.05)",
                                        zIndex: 1,
                                        boxShadow: "md"
                                    },
                                }}
                                onClick={() => handleCardClick(event)}
                            >
                                <Heading size="md">
                                    {event.title} <Badge ml={2}>{event.category}</Badge>
                                </Heading>
                                <Text><b>Descripción:</b> {event.descripcion}</Text>
                                <Text><b>Fecha:</b> {event.date}</Text>
                                <Text><b>Hora:</b> {event.startTime} - {event.endTime}</Text>
                                <Text><b>Prioridad:</b> {event.priority}</Text>
                                <Text><b>Estatus:</b> {event.status}</Text>
                            </Box>
                        ))}
                    </Stack>
                </Box>

                <Box flex="0 0 300px">
                    <Calendar events={filteredEvents} />
                </Box>
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Editar Evento</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <SimpleGrid columns={2} spacing={4}>
                            <FormControl isRequired isInvalid={!!formValidation.title}>
                                <FormLabel>Título</FormLabel>
                                <Input
                                    name="title"
                                    value={editedEvent.title || ""}
                                    onChange={handleInputChange}
                                />
                                <FormErrorMessage>{formValidation.title}</FormErrorMessage>
                            </FormControl>

                            <FormControl isRequired isInvalid={!!formValidation.priority}>
                                <FormLabel>Prioridad</FormLabel>
                                <Select
                                    name="priority"
                                    value={editedEvent.priority || ""}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Seleccione la prioridad</option>
                                    <option value="Baja">Baja 🟢</option>
                                    <option value="Media">Media 🟡</option>
                                    <option value="Alta">Alta 🔴</option>
                                </Select>
                                <FormErrorMessage>{formValidation.priority}</FormErrorMessage>
                            </FormControl>

                            <FormControl isRequired isInvalid={!!formValidation.description} gridColumn="span 2">
                                <FormLabel>Descripción</FormLabel>
                                <Input
                                    name="descripcion"
                                    value={editedEvent.descripcion || ""}
                                    onChange={handleInputChange}
                                />
                                <FormErrorMessage>{formValidation.description}</FormErrorMessage>
                            </FormControl>

                            <FormControl isRequired isInvalid={!!formValidation.date}>
                                <FormLabel>Fecha</FormLabel>
                                <Input
                                    type="date"
                                    name="date"
                                    value={editedEvent.date || ""}
                                    onChange={handleInputChange}
                                />
                                <FormErrorMessage>{formValidation.date}</FormErrorMessage>
                            </FormControl>

                            <FormControl isRequired isInvalid={!!formValidation.startTime}>
                                <FormLabel>Hora de inicio</FormLabel>
                                <Input
                                    type="time"
                                    name="startTime"
                                    value={editedEvent.startTime || ""}
                                    onChange={handleInputChange}
                                />
                                <FormErrorMessage>{formValidation.startTime}</FormErrorMessage>
                            </FormControl>

                            <FormControl isRequired isInvalid={!!formValidation.endTime}>
                                <FormLabel>Hora de fin</FormLabel>
                                <Input
                                    type="time"
                                    name="endTime"
                                    value={editedEvent.endTime || ""}
                                    onChange={handleInputChange}
                                />
                                <FormErrorMessage>{formValidation.endTime}</FormErrorMessage>
                            </FormControl>

                            <FormControl isRequired isInvalid={!!formValidation.status}>
                                <FormLabel>Estatus</FormLabel>
                                <Select
                                    name="status"
                                    value={editedEvent.status || ""}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Seleccione el estatus</option>
                                    <option value="Pendiente">Pendiente 🔴</option>
                                    <option value="Proceso">En proceso 🟡</option>
                                    <option value="Hecha">Hecha 🟢</option>
                                </Select>
                                <FormErrorMessage>{formValidation.status}</FormErrorMessage>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Categoría</FormLabel>
                                <Select name="category" value={editedEvent.category || ""} disabled>
                                    <option value="Personal">Personal</option>
                                    <option value="Reuniones">Reuniones</option>
                                    <option value="Trabajo">Trabajo</option>
                                    <option value="Custom">Custom</option>
                                </Select>
                            </FormControl>
                        </SimpleGrid>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSave}>
                            Guardar Cambios
                        </Button>
                        <Button colorScheme="red" mr={3} onClick={handleDelete}>
                            Eliminar
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default TrabajosView
