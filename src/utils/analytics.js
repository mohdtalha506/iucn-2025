import ReactGA from 'react-ga4';

// Get the measurement ID from environment variables
const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-SZFW25K1L0';

// Initialize Google Analytics
export const initGA = () => {
  try {
    ReactGA.initialize(MEASUREMENT_ID);
    console.log('Google Analytics initialized with ID:', MEASUREMENT_ID);
  } catch (error) {
    console.error('Error initializing Google Analytics:', error);
  }
  
};

// Track page views
export const pageView = (path) => {
  try {
    ReactGA.send({ hitType: "pageview", page: path });
    console.log(`Page view tracked: ${path}`);
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

// Track events
export const trackEvent = (category, action, label, value = 0) => {
  try {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
    console.log(`Event tracked: ${category} / ${action} / ${label} / ${value}`);
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

// Track downloads with country information
export const trackDownload = (platform, fileName) => {
  try {
    // GA4 event structure
    ReactGA.event('file_download', {
      platform: platform,
      file_name: fileName,
      file_extension: fileName.split('.').pop(),
      download_type: 'application'
    });
    console.log(`Download tracked: ${platform} / ${fileName}`);
  } catch (error) {
    console.error('Error tracking download:', error);
  }
};

// Track installation guide downloads
export const trackGuideDownload = (platform, fileName) => {
  try {
    // GA4 event structure
    ReactGA.event('file_download', {
      platform: platform,
      file_name: fileName,
      file_extension: fileName.split('.').pop(),
      download_type: 'guide'
    });
    console.log(`Guide download tracked: ${platform} / ${fileName}`);
  } catch (error) {
    console.error('Error tracking guide download:', error);
  }
}; 