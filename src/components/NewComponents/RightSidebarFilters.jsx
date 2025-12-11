import React, { useEffect } from 'react';
import {
  Box,
  Text,
  VStack,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import PanoramaFilters from './PanoramaFilters';

const RightSidebarFilters = ({
  ecosystemOptions,
  themeOptions,
  panoramaEcosystemFilters,
  panoramaThemeFilters,
  setPanoramaEcosystemFilters,
  setPanoramaThemeFilters,
  setDisplay,
  setSearchTerm,
  setSearchMenu,
  setTitleHeading,
  setToolNumber,
  setClicked,
  setThemeFilters,
  setEcosystemFilters,
   setIsSolutionsTabClicked
}) => {
  const bgColor = useColorModeValue("#212529", "#212529");
  const borderColor = useColorModeValue("#5ae6b8", "#5ae6b8");
  const textColor = useColorModeValue("white", "white");

  // Effect to handle filter changes
  useEffect(() => {
    if (panoramaEcosystemFilters.length > 0 || panoramaThemeFilters.length > 0) {
      // Clear existing data
      setSearchTerm("");
      setSearchMenu("");
      setTitleHeading("");
      setToolNumber();
      setClicked(false);
      setThemeFilters([]);
      setEcosystemFilters([]);
      setIsSolutionsTabClicked(false)
      
      // Show PANORAMA solutions
      setDisplay("panorama_results");
    }
  }, [panoramaEcosystemFilters, panoramaThemeFilters]);

  const handlePanoramaClick = () => {
    // Clear existing data
    setSearchTerm("");
    setSearchMenu("");
    setTitleHeading("");
    setToolNumber();
    setClicked(false);
    
    // Show PANORAMA solutions
    setDisplay("panorama_results");
    setIsRightSideBarClicked(true);
  };

  return (
    <Box
      className="right-sidebar"
      bg={bgColor}
      marginLeft={0}
      position="sticky"
      top="250"
      width="100%"
      zIndex="3"
    >
      <VStack spacing={4} align="stretch">
        <Box>
          <Text 
            color="white" 
            fontSize="md" 
            textAlign="center" 
            mb={0} 
            mt={5}  
            onClick={handlePanoramaClick}
            cursor="pointer"
            _hover={{ color: borderColor }}
          >
            PANORAMA Solutions
          </Text>
        </Box>

        <Divider borderColor={borderColor} margin={0} />

        <Box position="relative" zIndex="4">
          <PanoramaFilters
            title="Ecosystem"
            options={ecosystemOptions}
            selectedOptions={panoramaEcosystemFilters}
            onChange={setPanoramaEcosystemFilters}
          />
        </Box>

        <Box position="relative" zIndex="3">
          <PanoramaFilters
            title="Theme"
            options={themeOptions}
            selectedOptions={panoramaThemeFilters}
            onChange={setPanoramaThemeFilters}
          />
        </Box>
      </VStack>

      <style jsx>{`
        .right-sidebar {
          overflow: visible;
        }
      `}</style>
    </Box>
  );
};

export default RightSidebarFilters; 