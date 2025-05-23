import React, { useState } from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Carousel() {
  const [slider, setSlider] = useState(null);
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '40px' });

  const cards = [
    {
      title: 'La manera de organizarte',
      text: "Todo lo que necesites en un solo lugar.",
      image: 'https://images.unsplash.com/photo-1745597797513-1ed1bbde4060?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'Tu tiempo es lo más importante',
      text: "Organizar tu tiempo es nuestra prioridad.",
      image: 'https://images.unsplash.com/photo-1739989934229-fd878cc0a20e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'No hay excusas',
      text: "Aqui no habra manera de que pierdas el rumbo.",
      image: 'https://images.unsplash.com/photo-1565891741441-64926e441838?q=80&w=2071&auto=format&fit=crop',
    },
  ];

  return (
    <Box position="relative" height="600px" width="100%" maxW="100%" overflow="hidden">

      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      {/* Flechas */}
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform="translate(0%, -50%)"
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>

      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform="translate(0%, -50%)"
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>

      <Slider {...settings} ref={(s) => setSlider(s)}>
        {cards.map((card, index) => (
          <Box
            key={index}
            height="600px"
            position="relative"
            _before={{
              content: `""`,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${card.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(6px)',
              zIndex: 0,
            }}
          >
            {/* Texto sin fondo visible */}
            <Flex
              direction="column"
              align="center"
              justify="center"
              textAlign="center"
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              zIndex={1}
              p={10}
              color="white"
              maxW="80%"
            >
              <Heading
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                mb={4}
                textShadow="0 0 10px rgba(0, 0, 0, 0.7)"
              >
                {card.title}
              </Heading>
              <Text
                fontSize={{ base: 'md', lg: 'lg' }}
                maxW="3xl"
                textShadow="0 0 8px rgba(0, 0, 0, 0.5)"
              >
                {card.text}
              </Text>
            </Flex>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
