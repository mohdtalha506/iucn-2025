import {
  Box,
  Button,
  Checkbox,
  Stack,
  useDisclosure,
  useOutsideClick,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Flex,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRef } from "react";

const FilterDropdown = ({ title, options, selectedOptions, onChange }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const ref = useRef();
  
  // Use breakpoint to determine if we should use drawer on mobile
  const isMobile = useBreakpointValue({ base: true, md: false });

  useOutsideClick({
    ref,
    handler: onClose,
  });

  // Dropdown content shared between mobile and desktop
  const FilterOptions = () => (
    <Stack spacing={1}>
      {options.map((option) => (
        <Checkbox
          key={option}
          isChecked={selectedOptions.includes(option)}
          onChange={(e) => {
            if (e.target.checked) {
              onChange([...selectedOptions, option]);
            } else {
              onChange(selectedOptions.filter((item) => item !== option));
            }
          }}
          size="sm"
          colorScheme="teal"
        >
          {option}
        </Checkbox>
      ))}
    </Stack>
  );

  // Using a drawer for mobile view
  if (isMobile) {
    return (
      <Box display="inline-block" mr={2} mb={2}>
        <Button
          rightIcon={<ChevronDownIcon />}
          variant="outline"
          size="sm"
          colorScheme="teal"
          bg="gray.800"
          color="white"
          _hover={{ bg: "gray.700" }}
          onClick={onToggle}
          width="full"
        >
          {title} {selectedOptions.length > 0 ? `(${selectedOptions.length})` : null}
        </Button>

        <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg="gray.900" color="white">
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px" borderColor="teal.500">
              {title} Filters
            </DrawerHeader>
            <DrawerBody p={4}>
              <FilterOptions />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    );
  }

  // Desktop view with dropdown
  return (
    <Box ref={ref} position="relative" display="inline-block" mr={2} mb={2}>
      <Button
        rightIcon={<ChevronDownIcon />}
        variant="outline"
        size="sm"
        width={"100%"}
        colorScheme="teal"
        // bg="#2d735c"
        color="white"
        borderColor="#2d735c"
        _hover={{ bg: "gray.700" }}
        _expanded={{ bg: "gray.700" }}
        onClick={onToggle}
      >
        {title} {selectedOptions.length > 0 ? `(${selectedOptions.length})` : null}
      </Button>

      {isOpen && (
        <Box
          position="absolute"
          top="100%"
          left={0}
          zIndex="dropdown"
          bg="gray.900"
          color="white"
          border="1px solid"
          borderColor="teal.500"
          borderRadius="md"
          boxShadow="lg"
          p={3}
          mt={1}
          width="240px"
          maxHeight="300px"
          overflowY="auto"
        >
          <FilterOptions />
        </Box>
      )}
    </Box>
  );
};

// A component to manage multiple filters in a responsive layout
export const FilterBar = ({ filters }) => {
  return (
    <Flex 
      flexWrap="wrap" 
      mb={4} 
      alignItems="center"
      width="100%"
    >
      <Text fontWeight="bold" mr={2} mb={2}>
        Filters:
      </Text>
      {filters.map((filter) => (
        <FilterDropdown
          key={filter.title}
          title={filter.title}
          options={filter.options}
          selectedOptions={filter.selectedOptions}
          onChange={filter.onChange}
        />
      ))}
    </Flex>
  );
};

export default FilterDropdown;