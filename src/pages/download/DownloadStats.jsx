"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Icon,
  Spinner,
  Center,
  Button,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaWindows,
  FaApple,
  FaFileAlt,
  FaMapMarkerAlt,
  FaLock,
} from "react-icons/fa";
import {
  fetchDownloadStats,
  getAccessToken,
  initiateOAuthFlow,
  debugGA4Connection,
  fetchRealTimeDownloadStats,
} from "../../utils/googleAnalyticsService";

// Create motion components
const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionButton = motion(Button);

export default function DownloadStats() {
  const [loading, setLoading] = useState(true);
  const [authRequired, setAuthRequired] = useState(false);
  const [stats, setStats] = useState({
    totalDownloads: 0,
    windowsDownloads: 0,
    macDownloads: 0,
    guideDownloads: 0,
    countryData: [],
    lastUpdated: null, // For real-time data timestamps
  });

  // Fetch data from Google Analytics service
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if we have a valid access token
        const accessToken = getAccessToken();

        if (!accessToken) {
          // No valid token, show auth button
          setAuthRequired(true);
          setLoading(false);
          return;
        }

        setLoading(true);
        console.log("📊 Fetching regular analytics data as primary source...");
        
        // Fetch regular analytics data as the primary and only source on page load
        const regularData = await fetchDownloadStats();
        console.log("✅ Regular analytics data received:", regularData);
        setStats(regularData);
        setAuthRequired(false);

      } catch (error) {
        console.error("Error fetching analytics data:", error);

        // If the error is related to authentication, show auth button
        if (
          error.message &&
          (error.message.includes("auth") || error.message.includes("401"))
        ) {
          setAuthRequired(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle authentication button click
  const handleAuthenticate = () => {
    initiateOAuthFlow();
  };

  // Debug function to test GA4 connection
  // const handleDebugGA4 = async () => {
  //   console.log("🔍 Starting GA4 debug...");
  //   const debugResult = await debugGA4Connection();
  //   if (debugResult) {
  //     console.log("✅ Debug completed - check console for details");
  //   } else {
  //     console.log("❌ Debug failed - check console for errors");
  //   }
  // };

  // Handle fetching real-time data manually
  const handleFetchRealTimeData = async () => {
    try {
      setLoading(true);
      console.log("🔍 Fetching real-time download data...");
      const data = await fetchRealTimeDownloadStats();
      setStats(data);
      console.log("✅ Real-time data fetched successfully:", data);
    } catch (error) {
      console.error("❌ Error fetching real-time data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle fetching regular analytics data manually
  const handleFetchRegularData = async () => {
    try {
      setLoading(true);
      console.log("📊 Refreshing regular analytics data...");
      const data = await fetchDownloadStats();
      setStats(data);
      console.log("✅ Regular analytics data refreshed successfully:", data);
    } catch (error) {
      console.error("❌ Error fetching regular analytics data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const cardBg = "#1e2124";
  const cardBorder = "rgba(79, 209, 169, 0.3)";
  const textColor = "#4fd1a9";

  return (
    <Box bg="#1e2124" minH="100vh" py={10}>
      <Container maxW="container.xl">
        <MotionHeading
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          color={textColor}
          mb={6}
          textAlign="center"
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          bgGradient="linear(to-r, #4fd1a9,rgba(255, 255, 255, 0.84), #4fd1a9)"
          bgClip="text"
        >
          Download Statistics
        </MotionHeading>

        {/* Data Controls */}
        {!authRequired && (
          <Center mb={8}>
            <Flex gap={4} flexWrap="wrap" justify="center" direction="column" align="center">
              <Flex gap={4}>
                <Button
                  onClick={handleFetchRegularData}
                  colorScheme="blue"
                  size="sm"
                  isLoading={loading}
                  loadingText="Refreshing regular data..."
                >
                  📊 Refresh All-Time Data
                </Button>
                <Button
                  onClick={handleFetchRealTimeData}
                  colorScheme="green"
                  size="sm"
                  isLoading={loading}
                  loadingText="Fetching real-time data..."
                >
                  🔄 Get Real-time Data
                </Button>
              </Flex>
              {/* Show timestamp for real-time data */}
              {stats.lastUpdated && (
                <Text color="gray.400" fontSize="sm">
                  Real-time data last updated: {stats.lastUpdated}
                </Text>
              )}
            </Flex>
          </Center>
        )}

        {loading ? (
          <Center h="300px">
            <Spinner size="xl" color={textColor} thickness="4px" />
          </Center>
        ) : authRequired ? (
          <Center h="300px" flexDirection="column">
            <Icon as={FaLock} boxSize={12} color={textColor} mb={6} />
            <Text color="white" fontSize="xl" mb={6} textAlign="center">
              Authentication required to access Google Analytics data
            </Text>
            <MotionButton
              onClick={handleAuthenticate}
              colorScheme="teal"
              size="lg"
              leftIcon={<FaLock />}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              mb={4}
            >
              Authenticate with Google
            </MotionButton>
            {/* <Button
              onClick={handleDebugGA4}
              variant="outline"
              colorScheme="yellow"
              size="md"
            >
              Debug GA4 Connection
            </Button> */}
          </Center>
        ) : (
          <>
            {/* Overview Stats */}
            <MotionBox
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 4 }}
                spacing={6}
                mb={10}
              >
                {/* Total Downloads */}
                <Stat
                  bg={cardBg}
                  p={5}
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor={cardBorder}
                  boxShadow={`0 0 15px ${cardBorder}`}
                >
                  <Flex align="center" mb={2}>
                    <Box mr={3}>
                      <Icon as={FaFileAlt} boxSize={6} color={textColor} />
                    </Box>
                    <StatLabel color="white">Total Downloads</StatLabel>
                  </Flex>
                  <StatNumber fontSize="3xl" color={textColor}>
                    {stats.totalDownloads}
                  </StatNumber>
                  <StatHelpText color="white">All platforms</StatHelpText>
                </Stat>

                {/* Windows Downloads */}
                <Stat
                  bg={cardBg}
                  p={5}
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor="rgba(0, 120, 215, 0.3)"
                  boxShadow="0 0 15px rgba(0, 120, 215, 0.2)"
                >
                  <Flex align="center" mb={2}>
                    <Box mr={3}>
                      <Icon
                        as={FaWindows}
                        boxSize={6}
                        color="rgba(0, 120, 215, 0.8)"
                      />
                    </Box>
                    <StatLabel color="white">Windows Downloads</StatLabel>
                  </Flex>
                  <StatNumber fontSize="3xl" color="rgba(0, 120, 215, 0.8)">
                    {stats.windowsDownloads}
                  </StatNumber>
                  <StatHelpText color="white">
                    {Math.round(
                      (stats.windowsDownloads / stats.totalDownloads) * 100
                    )}
                    % of total
                  </StatHelpText>
                </Stat>

                {/* Mac Downloads */}
                <Stat
                  bg={cardBg}
                  p={5}
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor="rgba(255, 255, 255, 0.3)"
                  boxShadow="0 0 15px rgba(255, 255, 255, 0.2)"
                >
                  <Flex align="center" mb={2}>
                    <Box mr={3}>
                      <Icon as={FaApple} boxSize={6} color="white" />
                    </Box>
                    <StatLabel color="white">Mac Downloads</StatLabel>
                  </Flex>
                  <StatNumber fontSize="3xl" color="white">
                    {stats.macDownloads}
                  </StatNumber>
                  <StatHelpText color="white">
                    {Math.round(
                      (stats.macDownloads / stats.totalDownloads) * 100
                    )}
                    % of total
                  </StatHelpText>
                </Stat>

                {/* Guide Downloads */}
                <Stat
                  bg={cardBg}
                  p={5}
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor={cardBorder}
                  boxShadow={`0 0 15px ${cardBorder}`}
                >
                  <Flex align="center" mb={2}>
                    <Box mr={3}>
                      <Icon as={FaFileAlt} boxSize={6} color={textColor} />
                    </Box>
                    <StatLabel color="white">Guide Downloads</StatLabel>
                  </Flex>
                  <StatNumber fontSize="3xl" color={textColor}>
                    {stats.guideDownloads}
                  </StatNumber>
                  <StatHelpText color="white">Installation guides</StatHelpText>
                </Stat>
              </SimpleGrid>
            </MotionBox>

            {/* Country Data */}
            <MotionBox
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 0.4 }}
              mb={10}
            >
              <Flex align="center" mb={4}>
                <Icon as={FaMapMarkerAlt} mr={2} color={textColor} />
                <Heading size="md" color="white">
                  Downloads by Country
                </Heading>
              </Flex>
              <Box
                bg={cardBg}
                p={5}
                borderRadius="md"
                borderWidth="1px"
                borderColor={cardBorder}
                boxShadow={`0 0 15px ${cardBorder}`}
              >
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {stats.countryData.map((item, index) => (
                    <Flex
                      key={index}
                      justify="space-between"
                      align="center"
                      p={3}
                      borderBottom="1px solid"
                      borderColor="whiteAlpha.200"
                    >
                      <Text color="white">{item.country}</Text>
                      <Text color={textColor} fontWeight="bold">
                        {item.downloads} downloads
                      </Text>
                    </Flex>
                  ))}
                </SimpleGrid>
              </Box>
            </MotionBox>



          </>
        )}
        
      </Container>
      
    </Box>
  );
}
