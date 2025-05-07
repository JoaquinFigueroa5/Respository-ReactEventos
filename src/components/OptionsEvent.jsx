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
} from '@chakra-ui/react';
import {
  FcAbout,
  FcAssistant,
  FcCollaboration,
  FcDonate,
  FcManager,
} from 'react-icons/fc';

const Card = ({ heading, description, icon, href }) => {
  return (
    <Box
      maxW="full"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
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
        <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
          Learn more
        </Button>
      </Stack>
    </Box>
  );
};

export default function OptionsEvent() {
  return (
    <Box>
      <Container maxW={'5xl'}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Card
            heading={'Reuniones'}
            icon={<Icon as={FcCollaboration} w={10} h={10} />}
            description={'Lorem ipsum dolor sit amet catetur, adipisicing elit.'}
            href={'#'}
          />
          <Card
            heading={'Personal'}
            icon={<Icon as={FcManager} w={10} h={10} />}
            description={'Lorem ipsum dolor sit amet catetur, adipisicing elit.'}
            href={'#'}
          />
          <Card
            heading={'Trabajo'}
            icon={<Icon as={FcAbout} w={10} h={10} />}
            description={'Lorem ipsum dolor sit amet catetur, adipisicing elit.'}
            href={'#'}
          />
          <Card
            heading={'Custom'}
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            description={'Lorem ipsum dolor sit amet catetur, adipisicing elit.'}
            href={'#'}
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
}
