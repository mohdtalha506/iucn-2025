"use client"
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  HStack,
  IconButton,
  useToast,
} from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FaGlobe, FaEnvelope, FaPhone, FaInfoCircle, FaChartBar } from "react-icons/fa"
import { motion } from "framer-motion"
import pcaLogo from "./image/pcalogo.png"
import macOs from "./image/icons8-macos-50.png"
import windows from "./image/icons8-windows-50.png"
import { keyframes } from "@emotion/react"
import windowsGuide from "../../assets/pdfs/PCA-Knowledge_Kit _Windows Insatllation_Guide.pdf";
import macosGuide from "../../assets/pdfs/PCA-Knowledge_Kit_macOs Insatllation_Guide.pdf";
import { trackDownload, trackGuideDownload } from "../../utils/analytics";
import { sendDownloadEvent } from "../../utils/googleAnalyticsService";
// Create motion components
const MotionBox = motion(Box)
const MotionFlex = motion(Flex)
const MotionImage = motion(Image)
const MotionHeading = motion(Heading)

export default function PcaToolkitDownload() {
  const [isDownloading, setIsDownloading] = useState({ windows: false, macos: false, });
  const [isWindowsGuideDownloading, setIsWindowsGuidedwonloading] = useState(false)
  const [isMacosGuideDownloading, setIsMacosGuidedwonloading] = useState(false)
  const [downloadStats, setDownloadStats] = useState({
    windows: 0,
    macos: 0,
    windowsGuide: 0,
    macosGuide: 0
  });
  const toast = useToast();

  // System Requirements
  const windowsReqs = "Windows 10/11 (64-bit), 4GB RAM, 500MB disk space";
  const macReqs = "macOS 10.15 or later, 4GB RAM, 500MB disk space";

  // Get or generate a client ID for GA4 Measurement Protocol
  const getClientId = () => {
    // Try to get client ID from localStorage
    let clientId = localStorage.getItem('ga_client_id');

    // If not found, generate a new one
    if (!clientId) {
      clientId = `${Math.random().toString(36).substring(2)}.${Date.now()}`;
      localStorage.setItem('ga_client_id', clientId);
    }

    return clientId;
  };

  const handleDownload = (platform, guide = false) => {
    if (platform === "windows" && isDownloading.macos) {
      return;
    } else if (platform === "macos" && isDownloading.windows) {
      return;
    }

    setIsDownloading({ ...isDownloading, [platform]: true });

    let downloadUrl = '';
    let fileName = '';

    if (platform === 'windows' && !guide) {
      downloadUrl = '/downloads/pcatoolkit_2.0.2025_x64-setup.exe';
      fileName = 'pcatoolkit_2.0.2025_x64-setup.exe';

      // Track Windows download with client-side analytics
      trackDownload('Windows', fileName);

      // Also track with server-side analytics
      const clientId = getClientId();
      sendDownloadEvent('Windows', fileName, clientId)
        .then(success => {
          if (!success) {
            console.warn('Failed to send download event to GA4 server-side');
          }
        });

      // Update local stats
      setDownloadStats(prev => ({
        ...prev,
        windows: prev.windows + 1
      }));
    } else if (platform === 'macos' && !guide) {
      downloadUrl = '/downloads/pcatoolkit.zip';
      fileName = 'pcatoolkit.zip';

      // Track macOS download with client-side analytics
      trackDownload('macOS', fileName);

      // Also track with server-side analytics
      const clientId = getClientId();
      sendDownloadEvent('macOS', fileName, clientId)
        .then(success => {
          if (!success) {
            console.warn('Failed to send download event to GA4 server-side');
          }
        });

      // Update local stats
      setDownloadStats(prev => ({
        ...prev,
        macos: prev.macos + 1
      }));
    } else if (platform === 'windows' && guide) {
      setIsWindowsGuidedwonloading(true)
      downloadUrl = windowsGuide;
      fileName = 'Windows_Installation_Guide.pdf';

      // Track Windows guide download with client-side analytics
      trackGuideDownload('Windows', fileName);

      // Also track with server-side analytics
      const clientId = getClientId();
      sendDownloadEvent('Windows_Guide', fileName, clientId)
        .then(success => {
          if (!success) {
            console.warn('Failed to send guide download event to GA4 server-side');
          }
        });

      // Update local stats
      setDownloadStats(prev => ({
        ...prev,
        windowsGuide: prev.windowsGuide + 1
      }));
    } else if (platform === 'macos' && guide) {
      setIsMacosGuidedwonloading(true)
      downloadUrl = macosGuide;
      fileName = 'macOs_Installation_Guide.pdf';

      // Track macOS guide download with client-side analytics
      trackGuideDownload('macOS', fileName);

      // Also track with server-side analytics
      const clientId = getClientId();
      sendDownloadEvent('macOS_Guide', fileName, clientId)
        .then(success => {
          if (!success) {
            console.warn('Failed to send guide download event to GA4 server-side');
          }
        });

      // Update local stats
      setDownloadStats(prev => ({
        ...prev,
        macosGuide: prev.macosGuide + 1
      }));
    }


    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', fileName);
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download started",
      description: guide === true
        ? "Your installation guide has downloaded successfully !"
        : `Your ${platform} download should begin shortly. If it doesn't start automatically, please click the link again.`,
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    })

    // Reset downloading state after a short delay
    setTimeout(() => {
      setIsDownloading({ ...isDownloading, [platform]: false });
      setIsMacosGuidedwonloading(false);
      setIsWindowsGuidedwonloading(false)
    }, 2100);
  };

  // Define animations
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const pulseKeyframes = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  `
  const pulse = `${pulseKeyframes} 2s ease-in-out infinite`

  // Icon hover animation
  const iconVariants = {
    initial: { scale: 1, filter: "drop-shadow(0 0 0px rgba(79, 209, 169, 0))" },
    hover: {
      scale: 1.15,
      filter: "drop-shadow(0 0 8px rgba(79, 209, 169, 0.8))",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  return (
    <Flex direction="column" minH="100vh" bg="#1e2124" color="#4fd1a9" fontFamily="'Poppins', sans-serif" position="relative" overflow="hidden">
      <Container maxW="95%" px="4" py="8" mt="12" mb="0" textAlign="center" flexGrow={1} zIndex={1}>
        <MotionImage
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          w={{ base: "120px", md: "160px", lg: "210px" }}
          h="auto"
          mx="auto"
          mb="8"
          src={pcaLogo || "/placeholder.svg"}
          alt="Pcatoolkit Logo"
          whileHover={{ rotate: [0, -5, 5, -5, 0], transition: { duration: 0.5 } }}
        />

        <MotionHeading
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          mb="9"
          letterSpacing="widest"
          color="#4fd1a9"
          bgGradient="linear(to-r, #4fd1a9,rgba(255, 255, 255, 0.84), #4fd1a9)"
          bgClip="text"
          transition="all 0.3s ease"
        >
          Download  Pcatoolkit and Resource Book
        </MotionHeading>

        {/* <MotionBox initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}>
          <Text color="white" mb="10" letterSpacing="wide" fontFamily="mono" id="choose">
            Choose your platform:
          </Text>
        </MotionBox> */}
        <MotionFlex
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.4 }}
          zIndex={2}
          flexDirection="column"
          mx="auto"
          width="100%"
          maxW="95%"
          mb="10"
          px={["4", "6", "10"]}
          justifyContent="center"
          alignItems="center"
        >
          {/* Icons + Boxes */}
          <Flex
            direction={["column", "column", "row"]}
            justifyContent="center"
            alignItems="center"
            gap={[10, 10, 12]}
            width="100%"
          >
            {/* Windows */}
            <Flex direction="column" align="center">
              <MotionBox
                as={motion.div}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                variants={iconVariants}
                cursor="pointer"
                onClick={() => handleDownload("windows")}
              >
                <Box
                  p="6"
                  borderRadius="full"
                  bg="rgba(0, 120, 215, 0.1)"
                  mb="3"
                  border="2px solid"
                  borderColor="rgba(0, 120, 215, 0.3)"
                  boxShadow="0 0 15px rgba(0, 120, 215, 0.2)"
                  width="160px"
                  height="160px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image src={windows} alt="Windows" width="80px" height="80px" objectFit="contain" />
                </Box>
                <Text color="white" fontWeight="bold" fontSize="md">
                  Windows
                </Text>
              </MotionBox>
              <Box
                bg="#1e2124"
                borderWidth="1px"
                borderColor="rgba(0, 120, 215, 0.3)"
                borderRadius="md"
                p={4}
                boxShadow="0 0 15px rgba(0, 120, 215, 0.2)"
                width="280px"
                marginTop='10px'
                textAlign="left"
              >
                <Text fontWeight="bold" mb={2} color="#4fd1a9" fontSize="sm">
                  System Requirements For - Windows:
                </Text>
                <Text fontSize="sm" color="white">{windowsReqs}</Text>
                <Text fontSize="sm" color="#4fd1a9" mt={2}>
                  Downloads: {downloadStats.windows}
                </Text>
              </Box>
            </Flex>

            {/* Mac */}
            <Flex direction="column" align="center" mt={[10, 10, 0]}>
              <MotionBox
                as={motion.div}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                variants={iconVariants}
                cursor="pointer"
                onClick={() => handleDownload("macos")}
              >
                <Box
                  p="6"
                  borderRadius="full"
                  bg="rgba(255, 255, 255, 0.1)"
                  mb="3"
                  border="2px solid"
                  borderColor="rgba(255, 255, 255, 0.3)"
                  boxShadow="0 0 15px rgba(255, 255, 255, 0.2)"
                  width="160px"
                  height="160px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image src={macOs} alt="macOS" width="80px" height="80px" objectFit="contain" />
                </Box>
                <Text color="white" fontWeight="bold" fontSize="md">
                  Mac
                </Text>
              </MotionBox>
              <Box
                bg="#1e2124"
                borderWidth="1px"
                borderColor="rgba(255, 255, 255, 0.3)"
                borderRadius="md"
                p={4}
                boxShadow="0 0 15px rgba(255, 255, 255, 0.2)"
                width="280px"
                textAlign="left"
                marginTop='10px'
              >
                <Text fontWeight="bold" mb={2} color="#4fd1a9" fontSize="sm">
                  System Requirements For - MacOs:
                </Text>
                <Text fontSize="sm" color="white">{macReqs}</Text>
                <Text fontSize="sm" color="#4fd1a9" mt={2}>
                  Downloads: {downloadStats.macos}
                </Text>
              </Box>
            </Flex>

            {/* Resource Book */}
            <Flex direction="column" align="center" mt={[10, 10, 0]}>
              <MotionBox
                as={motion.div}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                variants={iconVariants}
                cursor="pointer"
              >
                <Box
                  p="9"
                  borderRadius="full"
                  bg="rgba(0, 200, 150, 0.1)"
                  mb="3"
                  border="2px solid"
                  borderColor="rgba(0, 200, 150, 0.3)"
                  boxShadow="0 0 15px rgba(0, 200, 150, 0.2)"
                  width="160px"
                  height="160px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <QRCodeCanvas
                    value={'https://pcatoolkit.org/ResourceBook.pdf'}
                    size={100}
                    level="H"
                    includeMargin={true}
                  />
                </Box>
                <Text color="white" fontWeight="bold" fontSize="md">
                  Resource Book
                </Text>
              </MotionBox>
              <Box
                bg="#1e2124"
                borderWidth="1px"
                borderColor="rgba(0, 200, 150, 0.3)"
                borderRadius="md"
                p={4}
                boxShadow="0 0 15px rgba(0, 200, 150, 0.2)"
                width="280px"
                marginTop='10px'
                textAlign="left"
              >
                <Text fontWeight="bold" mb={2} color="#4fd1a9" fontSize="sm">
                  Scan QR or click below to download the Resource Book
                </Text>
                <Text fontSize="sm" color="white">
                  Protected and conserved area governance and management
                  {/* A resource book for practitioners in development cooperation */}
                </Text>
                <Text fontSize="sm" color="#4fd1a9" mt={2} style={{ cursor: 'pointer' }} onClick={() => window.open('/ResourceBook.pdf', '_blank')}>
                  <i className="fa fa-download"></i> Download Resource Book
                </Text>
              </Box>
            </Flex>
          </Flex>
        </MotionFlex>

        {/* Installation Guide Button */}
        <MotionBox
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.6 }}
          maxW={["90%", "70%", "40%"]}
          mx="auto"
          display="flex"
          flexDirection={["column", "row", "row"]}
          justifyContent="space-between"
          gap="5"
        >
          <Button
            onClick={() => handleDownload('windows', true)}
            isLoading={isWindowsGuideDownloading}
            loadingText="Downloading..."
            variant="outline"
            borderColor="#4fd1a9"
            color="#4fd1a9"
            _hover={{ bg: "rgba(79, 209, 169, 0.1)" }}
            leftIcon={<FaInfoCircle />}
            size="md"
            width="full"
            borderRadius="md"
            fontFamily="mono"
            mb={["4", "0", "0"]}
          >
            How to Install - Windows
          </Button>

          <Button
            onClick={() => handleDownload('macos', true)}
            isLoading={isMacosGuideDownloading}
            loadingText="Downloading..."
            variant="outline"
            borderColor="#4fd1a9"
            color="#4fd1a9"
            _hover={{ bg: "rgba(79, 209, 169, 0.1)" }}
            leftIcon={<FaInfoCircle />}
            size="md"
            width="full"
            borderRadius="md"
            fontFamily="mono"
          >
            How to Install - macOS
          </Button>
        </MotionBox>

        {/* Download Statistics Button */}
        {/* <MotionBox
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.8 }}
          maxW={["90%", "70%", "40%"]}
          mx="auto"
          mt="8"
        >
          <Link href="/download-stats" _hover={{ textDecoration: "none" }}>
            <Button
              variant="outline"
              borderColor="#4fd1a9"
              color="#4fd1a9"
              _hover={{ bg: "rgba(79, 209, 169, 0.1)" }}
              leftIcon={<FaChartBar />}
              size="md"
              width="full"
              borderRadius="md"
              fontFamily="mono"
            >
              View Download Statistics
            </Button>
          </Link>
        </MotionBox> */}
      </Container>

      <Box as="footer" borderTop="1px solid" borderColor="gray.700" py="4" position="relative" zIndex={1}>
        <Flex
          maxW="6xl"
          mx="auto"
          px="4"
          justify="space-between"
          align="center"
          flexDirection={["column", "row", "row"]}
          gap={["4", "0", "0"]}
        >
          <Image w="28" src={pcaLogo || "/placeholder.svg"} alt="Footer Logo" />
          <Text fontSize="sm" color="white" my={["2", "0", "0"]}>
            © Copyright PCA Toolkit v.2.0.2025
          </Text>
          <HStack spacing={4}>
            {/* Website */}
            <Link
              href="https://www.asiaprotectedareaspartnership.org"
              isExternal
              _hover={{ textDecoration: "none" }}
            >
              <IconButton
                as={motion.button}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Website"
                icon={<FaGlobe />}
                variant="ghost"
                color="white"
                _hover={{ bg: "whiteAlpha.200" }}
                size="md"
                transition="all 0.2s"
              />
            </Link>
            {/* Email */}
            <Link
              href="mailto:info@asiaprotectedareaspartnership.org"
              isExternal
              _hover={{ textDecoration: "none" }}
            >
              <IconButton
                as={motion.button}
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Mail"
                icon={<FaEnvelope />}
                variant="ghost"
                color="white"
                _hover={{ bg: "whiteAlpha.200" }}
                size="md"
                transition="all 0.2s"
              />
            </Link>
            {/* Phone */}
            <Link
              href="tel:+6626624029"
              isExternal
              _hover={{ textDecoration: "none" }}
            >
              <IconButton
                as={motion.button}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Phone"
                icon={<FaPhone />}
                variant="ghost"
                color="white"
                _hover={{ bg: "whiteAlpha.200" }}
                size="md"
                transition="all 0.2s"
              />
            </Link>
          </HStack>
        </Flex>
      </Box>
    </Flex>
  )
}
