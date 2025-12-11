import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Link,
  VStack,
  HStack,
  Heading,
  Text,
  Image,
  Wrap,
  Badge,
} from "@chakra-ui/react";
import { useAccordionContext } from "../../context/AccordionContext";
import { GoogleMap, LoadScript, Marker, MarkerF } from "@react-google-maps/api";

const solutionImages = import.meta.glob('../../assets/solutions_images/*.{jpg,jpeg,png}', { eager: true });


const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '8px'
};

const SolutionAccordian = ({solution}) => {

const getHeroImage = useCallback(() => {
    const imageId = solution.solution_node_id; 

    const possiblePaths = [
      `../../assets/solutions_images/${imageId}.jpg`,
      `../../assets/solutions_images/${imageId}.jpeg`,
      `../../assets/solutions_images/${imageId}.png`,
    ];

    for (const path of possiblePaths) {
      const imageModule = solutionImages[path];
      if (imageModule?.default) {
        return imageModule.default;
      }
    }

    return new URL('../../assets/old.png', import.meta.url).href;
  }, [solution.solution_node_id]);

  const { isOnline, activeSolutionAccordion, setActiveSolutionAccordion } = useAccordionContext();
  // const accordionId = `solution-${solution.solution_node_id}-${Math.random()}`
  const accordionId = `solution-${solution.solution_node_id}`
    var isOpen = activeSolutionAccordion === accordionId 
  // const [isOpen, setIsOpen] = useState(false);

  // const toggleAccordion = () => setIsOpen(prev => !prev);

  const handleAccordionClick = () => {
    if (activeSolutionAccordion === accordionId) {
      // console.log(1);
      setActiveSolutionAccordion(null);
    } else {
      // console.log(2);
      setActiveSolutionAccordion(accordionId);
    }
  };


  const getZoomLevel = useMemo(() => {
    if (!solution.coordinates?.length) return 6;
    return solution.coordinates.length > 1 ? 4 : 6;
  }, [solution.coordinates]);

  const mapRef = useRef(null);

  const onLoad = useCallback(map => {
    mapRef.current = map;

    if (solution.coordinates?.length) {
      const bounds = new window.google.maps.LatLngBounds();
      solution.coordinates.forEach(coord => {
        bounds.extend({ lat: coord[1], lng: coord[0] });
      });

      if (solution.coordinates.length === 1) {
        // Single marker — zoom in
        map.setZoom(10); // Adjust this as per desired zoom level
        map.setCenter(bounds.getCenter());
      } else {
        // Multiple markers — fit bounds
        map.fitBounds(bounds);
      }
    }
  }, [solution.coordinates]);

  const MapComponent = () => (
    // <LoadScript 
    //   googleMapsApiKey={apiKey} 
    //   key={`marker-${solution.serial_no}+${new Date()}`}
    // >
      <GoogleMap 
      // key={apiKey}
      onLoad={onLoad}
        mapContainerStyle={containerStyle}
        // center={center}
        zoom={getZoomLevel}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          tiltInteractionEnabled: true
        }}
      >
        {solution.coordinates?.map((coord, index) => (
          <MarkerF
            key={`marker-${index}+${new Date()}`}
            position={{ lat: coord[1], lng: coord[0] }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
            }}
          />
        ))}
        {/* <MarkerF position={center}
         icon={{
          url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        }}
        /> */}
      </GoogleMap>
    // </LoadScript>
  );
  
// console.log(accordionId,"accordian id");
// console.log(activeSolutionAccordion,"activeSolutionAccordion");

  return (
    <>
      <Accordion mb="4" 
       allowToggle 
       width="100%" 
       allowMultiple={false}
       index={activeSolutionAccordion === accordionId ? 0 : -1}
       onChange={() => handleAccordionClick()}
      // onChange={toggleAccordion}
       className="solution-accordion">
      <AccordionItem 
      id="solution-accordian"
        border="1px solid #5ae6b8"
        borderRadius="8px"
        boxShadow={'none'}
        bg="#212529"
        
        // overflow="hidden"
      >
          <h1>
          <AccordionButton fontWeight={500}>
  <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
    <Text as="span" >
      Solution {solution.solution_node_id}{' '}:{' '}
      <Text as="span" display="inline">
        {solution.title}
      </Text>
    </Text>
  </Box>
  <AccordionIcon />
</AccordionButton>
          </h1>
          <AccordionPanel pb={4}>
            <Box mx="auto" p={0}>
              <VStack align="start" spacing={6} width="100%">
                {/* Title and hero image */}
                <Box width="100%">
                 {/* {isOnline && solution.hero_image && ( */}
                   <Image 
                  //  src={solution.hero_image}
                   src={getHeroImage()}
                 alt={`Solution ${solution.title}`}
                   borderRadius="md"
                   width="100%"
                   height="400px"
                   objectFit="cover"
                   mb={4}
                 />
                 {/* )} */}
                  <Heading size="lg" color="teal.400" mb={2}>
                    {solution.title}
                  </Heading>
                  <Text fontSize="md">
                    {solution.summary}
                  </Text>
                </Box>
 {/* Map section */}
 {isOnline && isOpen && solution.location_on_the_map && (
                  <Box width="100%">
                    <Heading size="md" mb={4}>Project Location</Heading>
                    <Box 
                      borderRadius="md" 
                      overflow="hidden" 
                      border="1px solid" 
                      borderColor="gray.200"
                    >
                      <MapComponent />
                    </Box>
                    <Text fontSize="sm" fontStyle="italic" mt={2}>
                      Location: {solution.location_on_the_map}
                    </Text>
                  </Box>
                )}
               

                                {/* Impact and Challenges */}
                                <Box width="100%">
                  <Heading size="md" mb={2}>Impacts</Heading>
                  {solution.impacts?.split('\n\n').map((paragraph, index) => (
      <Text key={index} mb={2}>
        {paragraph.trim()}
      </Text>
    ))}                    
                </Box>

                <Box width="100%">
                  <Heading size="md" mb={2}>Challenges</Heading>
                  {solution.challenges?.split('\n\n').map((paragraph, index) => (
      <Text key={index} mb={2}>
        {paragraph.trim()}
      </Text>
    ))}                  
                </Box>

{/* Story */}
{solution.story && (
                  <Box width="100%">
                    <Heading size="md" mb={2}>Story</Heading>
                    {solution.story?.split('\n\n').map((paragraph, index) => (
      <Text key={index} mb={2}>
        {paragraph.trim()}
      </Text>
    ))}                  
                  </Box>
                )}

                {/* Ecosystems and Themes */}
<Box width="100%">
  {solution.ecosystem && (
    <>
      <Heading size="sm" mb={1}>Ecosystems</Heading>
      <Wrap mb={2}>
        {solution.ecosystem.split(',').map((eco, index) => (
          <Badge key={index} colorScheme="green" borderRadius="full" px={2} py={1}>
            {eco.trim()}
          </Badge>
        ))}
      </Wrap>
    </>
  )}

  {solution.theme && (
    <>
      <Heading size="sm" mb={1}>Themes</Heading>
      <Wrap mb={2}>
        {solution.theme.split(',').map((theme, index) => (
          <Badge key={index} colorScheme="purple" borderRadius="full" px={2} py={1}>
            {theme.trim()}
          </Badge>
        ))}
      </Wrap>
    </>
  )}
</Box>

                 {/* Footer */}
                <HStack justifyContent="space-between" width="100%">
                  <Text fontSize="sm">Region: {solution.region}</Text>
                  <Text fontSize="sm">Community: {solution.panaroma_community}</Text>
                </HStack>
              </VStack>

              {isOnline && solution.solution_link && (
 <Link href={solution.solution_link} color="blue" isExternal textDecoration="underline">
 View Full Solution on Panorama...
</Link>
)}
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default SolutionAccordian;