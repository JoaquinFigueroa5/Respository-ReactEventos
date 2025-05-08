'use client';

import {
  Box,
  Button,
  Container,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  SimpleGrid,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  FormErrorMessage,
  useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import {
  FcAbout,
  FcAssistant,
  FcCollaboration,
  FcManager,
} from 'react-icons/fc';
import { useEvents } from '../context/EventsContext';

const Card = ({ heading, description, icon, onOpen }) => {
  const bgCard = useColorModeValue('gray.200', 'gray.600')

  return (
    <Box
      maxW="full"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
      cursor="pointer"
      onClick={onOpen}
      sx={{
        transition: "transform 0.2s ease-in-out",
        _hover: {
          transform: "scale(1.05)",
          zIndex: 1,
          boxShadow: "md",
          bg: bgCard,
        },
      }}

    >
      <Stack align={'start'} spacing={2}>
        <Box
          w={16}
          h={16}
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          rounded="full"
          bg={useColorModeValue('gray.100', 'gray.700')}
        >
          {icon}
        </Box>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={'sm'}>
            {description}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default function OptionsEvent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { events, dispatch } = useEvents();
  const toast = useToast();

  const [form, setForm] = useState({
    title: '',
    descripcion: '',
    date: '',
    startTime: '',
    endTime: '',
    priority: '',
    status: '',
    category: '',
    notifications: ''
  });

  const [formValidation, setFormValidation] = useState({
    title: undefined,
    descripcion: undefined,
    date: undefined,
    startTime: undefined,
    endTime: undefined,
    priority: undefined,
    status: undefined,
  });

  const handleAddEvent = () => {
    const newEvent = {
      id: Date.now(),
      title: form.title,
      descripcion: form.descripcion,
      date: form.date,
      startTime: form.startTime,
      endTime: form.endTime,
      priority: form.priority,
      status: form.status,
      category: form.category,
      notification: form.notifications
    };

    dispatch({ type: 'add', payload: newEvent });
    toast({
      title: "Evento agregado.",
      description: "El nuevo evento se ha añadido correctamente.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();
  }

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setFormValidation(prev => ({
      ...prev,
      title: value.trim() === '' ? 'Título es requerido' : ''
    }));
    setForm(prev => ({ ...prev, title: value }));
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setFormValidation(prev => ({
      ...prev,
      descripcion: value.trim() === '' ? 'Descripción es requerida' : ''
    }));
    setForm(prev => ({ ...prev, descripcion: value }));
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setFormValidation(prev => ({
      ...prev,
      date: value.trim() === '' ? 'Fecha es requerida' : ''
    }));
    setForm(prev => ({ ...prev, date: value }));
  };

  const handleStartTimeChange = (e) => {
    const value = e.target.value;
    let error = '';
    if (value.trim() === '') {
      error = 'Hora de inicio es requerida';
    } else if (form.endTime && value >= form.endTime) {
      error = 'Hora de inicio debe ser antes de la hora de finalización';
    }
    setFormValidation(prev => ({
      ...prev,
      startTime: error
    }));
    setForm(prev => ({ ...prev, startTime: value }));
  };

  const handleEndTimeChange = (e) => {
    const value = e.target.value;
    let error = '';
    if (value.trim() === '') {
      error = 'Hora de finalización es requerida';
    } else if (form.startTime && value <= form.startTime) {
      error = 'Hora de finalización debe ser después de la hora de inicio';
    }
    setFormValidation(prev => ({
      ...prev,
      endTime: error
    }));
    setForm(prev => ({ ...prev, endTime: value }));
  };

  const handlePriorityChange = (e) => {
    const value = e.target.value;
    setFormValidation(prev => ({
      ...prev,
      priority: value.trim() === '' ? 'Prioridad es requerida' : ''
    }));
    setForm(prev => ({ ...prev, priority: value }));
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setFormValidation(prev => ({
      ...prev,
      status: value.trim() === '' ? 'Estatus es requerido' : ''
    }));
    setForm(prev => ({ ...prev, status: value }));
  };

  const handleOpen = (category) => {
    setForm(prev => ({ ...prev, category }));
    onOpen();
  };


  return (
    <Box>
      <Container maxW={'5xl'}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Card
            heading={'Reuniones'}
            icon={<Icon as={FcCollaboration} w={10} h={10} />}
            description={'Gestiona todos los eventos de tus reuniones.'}
            onOpen={() => handleOpen('Reuniones')}
          />
          <Card
            heading={'Personal'}
            icon={<Icon as={FcManager} w={10} h={10} />}
            description={'Gestiona todos los eventos personales que tengas.'}
            onOpen={() => handleOpen('Personal')}
          />
          <Card
            heading={'Trabajo'}
            icon={<Icon as={FcAbout} w={10} h={10} />}
            description={'Gestiona todos los eventos de trabajo.'}
            onOpen={() => handleOpen('Trabajo')}
          />
          <Card
            heading={'Custom'}
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            description={'Gestiona todos los eventos de cualquier índole.'}
            onOpen={() => handleOpen('Custom')}
          />
        </SimpleGrid>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Eventos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={2} spacing={4}>
              <FormControl isRequired isInvalid={!!formValidation.title}>
                <FormLabel>Título</FormLabel>
                <Input
                  name="title"
                  value={form.title}
                  onChange={handleTitleChange}
                />
                <FormErrorMessage>{formValidation.title}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!!formValidation.priority}>
                <FormLabel>Prioridad</FormLabel>
                <Select name='priority' value={form.priority} onChange={handlePriorityChange}>
                  <option value="">Seleccione la prioridad</option>
                  <option value="Baja">Baja 🟢</option>
                  <option value="Media">Media 🟡</option>
                  <option value="Alta">Alta 🔴</option>
                </Select>
                <FormErrorMessage>{formValidation.priority}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!!formValidation.descripcion} gridColumn='span 2'>
                <FormLabel>Descripción</FormLabel>
                <Input
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleDescriptionChange}
                />
                <FormErrorMessage>{formValidation.desc}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!!formValidation.date}>
                <FormLabel>Fecha</FormLabel>
                <Input
                  type='date'
                  name="date"
                  value={form.date}
                  onChange={handleDateChange}
                />
                <FormErrorMessage>{formValidation.date}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!!formValidation.startTime}>
                <FormLabel>Hora de inicio</FormLabel>
                <Input
                  type='time'
                  name="startTime"
                  value={form.startTime}
                  onChange={handleStartTimeChange}
                />
                <FormErrorMessage>{formValidation.startTime}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!!formValidation.endTime}>
                <FormLabel>Hora de finalización</FormLabel>
                <Input
                  type='time'
                  name="endTime"
                  value={form.endTime}
                  onChange={handleEndTimeChange}
                />
                <FormErrorMessage>{formValidation.endTime}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!!formValidation.status}>
                <FormLabel>Estatus</FormLabel>
                <Select name='status' value={form.status} onChange={handleStatusChange}>
                  <option value="">Seleccione el estatus</option>
                  <option value="Pendiente">Pendiente 🔴</option>
                  <option value="Proceso">En proceso 🟡</option>
                  <option value="Hecha">Hecha 🟢</option>
                </Select>
                <FormErrorMessage>{formValidation.status}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Categoría</FormLabel>
                <Select name='category' value={form.category} disabled>
                  <option value="Personal">Personal</option>
                  <option value="Reuniones">Reuniones</option>
                  <option value="Trabajo">Trabajo</option>
                  <option value="Custom">Custom</option>
                </Select>
              </FormControl>

            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={handleAddEvent}
              isDisabled={!!formValidation.title}
            >
              Agregar
            </Button>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Delete
            </Button>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
