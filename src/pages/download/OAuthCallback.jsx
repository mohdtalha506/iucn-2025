import React, { useEffect, useState } from 'react';
import { Box, Container, Heading, Text, Spinner, Center } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { handleOAuthCallback } from '../../utils/googleAnalyticsService';

/**
 * Component to handle the OAuth callback from Google
 * This component should be rendered at the /oauth-callback route
 */
const OAuthCallback = () => {
  const [status, setStatus] = useState('Processing authentication...');
  const navigate = useNavigate();

  useEffect(() => {
    // Process the OAuth callback
    const processCallback = async () => {
      try {
        const accessToken = handleOAuthCallback();
        
        if (accessToken) {
          setStatus('Authentication successful! Redirecting...');
          
          // Wait a moment before redirecting
          setTimeout(() => {
            navigate('/download-stats');
          }, 2000);
        } else {
          setStatus('Authentication failed. No access token received.');
          
          // Redirect back to download page after a delay
          setTimeout(() => {
            navigate('/download');
          }, 3000);
        }
      } catch (error) {
        console.error('Error processing OAuth callback:', error);
        setStatus(`Authentication error: ${error.message}`);
        
        // Redirect back to download page after a delay
        setTimeout(() => {
          navigate('/download');
        }, 3000);
      }
    };

    processCallback();
  }, [navigate]);

  return (
    <Box bg="#1e2124" minH="100vh" py={10}>
      <Container maxW="container.md" textAlign="center">
        <Heading 
          color="#4fd1a9" 
          mb={8}
          bgGradient="linear(to-r, #4fd1a9,rgba(255, 255, 255, 0.84), #4fd1a9)"
          bgClip="text"
        >
          Google Analytics Authentication
        </Heading>
        
        <Center flexDirection="column" py={10}>
          <Spinner 
            size="xl" 
            color="#4fd1a9" 
            thickness="4px" 
            speed="0.65s"
            mb={6}
          />
          <Text color="white" fontSize="lg">
            {status}
          </Text>
        </Center>
      </Container>
    </Box>
  );
};

export default OAuthCallback; 