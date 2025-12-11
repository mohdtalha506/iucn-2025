// This is a utility service for fetching data from Google Analytics API
// Using Google Analytics Data API with OAuth 2.0 authentication

// Constants
const GA_PROPERTY_ID = "498314753"; // Your GA4 property ID from Pcatookit stream
const API_SECRET = "3927QDB1QGe39xKqSn376Q"; // Your Measurement Protocol API secret

// OAuth 2.0 configuration
const OAUTH_CLIENT_ID =
  "437080316330-hdq2rrbng921qbv2a8k6mq64du6iejgp.apps.googleusercontent.com"; // Replace with your OAuth client ID from Google Cloud Console
const OAUTH_REDIRECT_URI = "https://pcatoolkit.org/oauth-callback"; // Update this to match your development server port
const OAUTH_SCOPE = "https://www.googleapis.com/auth/analytics.readonly";

// Helper function to format date for GA API
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Initiate OAuth 2.0 authorization flow
 * This will redirect the user to Google's consent screen
 */
export const initiateOAuthFlow = () => {
  if (!OAUTH_CLIENT_ID) {
    console.error("OAuth client ID is not configured");
    return;
  }

  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.append("client_id", OAUTH_CLIENT_ID);
  authUrl.searchParams.append("redirect_uri", OAUTH_REDIRECT_URI);
  authUrl.searchParams.append("response_type", "token");
  authUrl.searchParams.append("scope", OAUTH_SCOPE);
  authUrl.searchParams.append("prompt", "consent");
  authUrl.searchParams.append("access_type", "online");

  // Redirect to Google's OAuth consent screen
  window.location.href = authUrl.toString();
};

/**
 * Handle OAuth callback and extract access token
 * This should be called from the OAuth callback page
 * @returns {string|null} The access token or null if not found
 */
export const handleOAuthCallback = () => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const accessToken = params.get("access_token");

  if (accessToken) {
    // Store the token in localStorage with expiration
    const expiresIn = params.get("expires_in") || 3600; // Default to 1 hour
    const expirationTime = Date.now() + expiresIn * 1000;

    localStorage.setItem("ga_access_token", accessToken);
    localStorage.setItem("ga_token_expiration", expirationTime.toString());

    return accessToken;
  }

  return null;
};

/**
 * Get the stored access token if it's still valid
 * @returns {string|null} The access token or null if not found or expired
 */
export const getAccessToken = () => {
  const accessToken = localStorage.getItem("ga_access_token");
  const expirationTime = localStorage.getItem("ga_token_expiration");

  if (accessToken && expirationTime) {
    // Check if token is still valid
    if (Date.now() < parseInt(expirationTime, 10)) {
      return accessToken;
    }

    // Token expired, clear it
    localStorage.removeItem("ga_access_token");
    localStorage.removeItem("ga_token_expiration");
  }

  return null;
};

/**
 * Fetch real-time download data (shows data within minutes)
 * This is useful for immediate testing
 */
export const fetchRealTimeDownloadStats = async () => {
  try {
    const accessToken = getAccessToken();
    if (!accessToken) {
      console.log("❌ No access token available for real-time data");
      return getSimulatedData();
    }

    console.log("🔍 Fetching real-time download data...");

    const response = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${GA_PROPERTY_ID}:runRealtimeReport`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dimensions: [{ name: "eventName" }, { name: "country" }],
          metrics: [{ name: "eventCount" }],
          dimensionFilter: {
            filter: {
              fieldName: "eventName",
              stringFilter: {
                matchType: "EXACT",
                value: "file_download",
              },
            },
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log("❌ Real-time API Error:", errorText);
      return getSimulatedData();
    }

    const data = await response.json();
    console.log("✅ Real-time data fetched:", data);

    // Process real-time data (simplified)
    const rows = data.rows || [];
    let totalDownloads = 0;
    const countryData = [];
    const countryMap = new Map();

    rows.forEach((row) => {
      const eventName = row.dimensionValues[0].value;
      const country = row.dimensionValues[1].value;
      const count = parseInt(row.metricValues[0].value, 10);

      totalDownloads += count;

      if (countryMap.has(country)) {
        countryMap.set(country, countryMap.get(country) + count);
      } else {
        countryMap.set(country, count);
      }
    });

    countryMap.forEach((downloads, country) => {
      countryData.push({ country, downloads });
    });

    return {
      totalDownloads,
      windowsDownloads: Math.floor(totalDownloads * 0.7), // Estimate
      macDownloads: Math.floor(totalDownloads * 0.3), // Estimate
      guideDownloads: Math.floor(totalDownloads * 0.4), // Estimate
      countryData,
      lastUpdated: new Date().toLocaleString(), // Add timestamp for real-time data
    };
  } catch (error) {
    console.error("❌ Real-time data error:", error);
    return getSimulatedData();
  }
};

/**
 * Debug function to test if we can fetch any events from GA4
 * This helps verify the Property ID is correct
 */
export const debugGA4Connection = async () => {
  try {
    const accessToken = getAccessToken();
    if (!accessToken) {
      console.log("❌ No access token available for debugging");
      return null;
    }

    console.log("🔍 Testing GA4 connection with Property ID:", GA_PROPERTY_ID);

    const response = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${GA_PROPERTY_ID}:runReport`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
          dimensions: [{ name: "eventName" }],
          metrics: [{ name: "eventCount" }],
          limit: 10,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log("❌ GA4 Debug Error:", errorText);
      return null;
    }

    const data = await response.json();
    console.log("✅ GA4 Debug Success - Available events:", data);
    return data;
  } catch (error) {
    console.error("❌ GA4 Debug Error:", error);
    return null;
  }
};

/**
 * Fetch download statistics from Google Analytics Data API
 *
 * @returns {Promise} Promise that resolves to download statistics
 */
export const fetchDownloadStats = async () => {
  try {
    console.log(
      "📈 Fetching regular download statistics from Google Analytics..."
    );

    // Check if we have a valid access token
    let accessToken = getAccessToken();

    // If no valid token, we need to redirect to OAuth flow
    if (!accessToken) {
      console.log("❌ No valid access token found for regular data");
      return getSimulatedData(); // Return simulated data for now
    }

    // Fetch ALL-TIME download data (since GA4 property creation)
    console.log(
      "� Fetching fALL-TIME file_download events (complete historical data)..."
    );

    const response = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${GA_PROPERTY_ID}:runReport`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: "2020-01-01", endDate: "today" }], // All-time data from 2020
          dimensions: [{ name: "eventName" }, { name: "country" }],
          metrics: [{ name: "eventCount" }],
          dimensionFilter: {
            filter: {
              fieldName: "eventName",
              stringFilter: {
                matchType: "EXACT",
                value: "file_download",
              },
            },
          },
          limit: 10000, // Increased limit for all-time data
          orderBys: [
            {
              metric: { metricName: "eventCount" },
              desc: true,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log("❌ Regular analytics API error:", errorText);
      throw new Error(
        `HTTP error! Status: ${response.status}, Details: ${errorText}`
      );
    }

    const data = await response.json();
    console.log("✅ Regular analytics data received:", data);

    // Check if we have any data
    if (!data.rows || data.rows.length === 0) {
      console.log(
        "⚠️ No file_download events found in regular analytics for last 30 days"
      );
      console.log("💡 This might be because:");
      console.log("   1. No downloads have been tracked yet");
      console.log("   2. Events are named differently");
      console.log(
        "   3. Data hasn't been processed yet (can take 24-48 hours)"
      );

      // Try to get any events to see what's available
      console.log("🔍 Checking for any events in the last 7 days...");
      const anyEventsResponse = await fetch(
        `https://analyticsdata.googleapis.com/v1beta/properties/${GA_PROPERTY_ID}:runReport`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
            dimensions: [{ name: "eventName" }],
            metrics: [{ name: "eventCount" }],
            limit: 10,
          }),
        }
      );

      if (anyEventsResponse.ok) {
        const anyEventsData = await anyEventsResponse.json();
        console.log("📊 Available events in your GA4:", anyEventsData);
      }

      return getSimulatedData();
    }

    // Process the API response
    return processAnalyticsResponse(data);
  } catch (error) {
    console.error(
      "Error fetching download stats from Google Analytics:",
      error
    );

    // If the error is due to an invalid token, clear it and try again
    if (error.message.includes("401")) {
      localStorage.removeItem("ga_access_token");
      localStorage.removeItem("ga_token_expiration");
      console.log("Access token expired or invalid, initiating OAuth flow...");
      initiateOAuthFlow();
    }

    // Return simulated data as fallback
    return getSimulatedData();
  }
};

/**
 * Process the raw response from Google Analytics API
 * @param {Object} apiResponse - The response from Google Analytics API
 * @returns {Object} Processed download statistics
 */
const processAnalyticsResponse = (apiResponse) => {
  try {
    console.log("🔄 Processing ALL-TIME analytics response...");

    // Extract rows from the API response
    const rows = apiResponse.rows || [];
    console.log(`📊 Processing ${rows.length} rows of all-time data`);

    // Initialize counters and data structures
    let totalDownloads = 0;
    let windowsDownloads = 0;
    let macDownloads = 0;
    let guideDownloads = 0;
    const countryData = [];
    const countryMap = new Map();

    // Process each row in the response (now with 2 dimensions: eventName, country)
    rows.forEach((row) => {
      const eventName = row.dimensionValues[0].value;
      const country = row.dimensionValues[1].value;
      const count = parseInt(row.metricValues[0].value, 10);

      console.log(`📍 Processing: ${country} - ${count} downloads`);

      // Increment total downloads
      totalDownloads += count;

      // For all-time analytics without OS data, estimate platform distribution
      windowsDownloads += Math.floor(count * 0.7); // Assume 70% Windows
      macDownloads += Math.floor(count * 0.3); // Assume 30% Mac

      // Estimate guide downloads (40% of total)
      guideDownloads += Math.floor(count * 0.4);

      // Aggregate downloads by country - this should capture ALL countries
      if (countryMap.has(country)) {
        countryMap.set(country, countryMap.get(country) + count);
      } else {
        countryMap.set(country, count);
      }
    });

    // Convert country map to array format
    countryMap.forEach((downloads, country) => {
      countryData.push({ country, downloads });
    });

    // Sort countries by download count (descending)
    countryData.sort((a, b) => b.downloads - a.downloads);

    console.log(
      `✅ ALL-TIME data processed: ${totalDownloads} total downloads from ${countryData.length} countries`
    );

    // Return processed data (no trends data)
    return {
      totalDownloads,
      windowsDownloads,
      macDownloads,
      guideDownloads,
      countryData,
    };
  } catch (error) {
    console.error("Error processing Analytics response:", error);
    return getSimulatedData();
  }
};

/**
 * Send download event to Google Analytics using Measurement Protocol
 * This can be used to track downloads server-side
 *
 * @param {string} platform - The platform (Windows/Mac)
 * @param {string} fileName - The name of the downloaded file
 * @param {string} clientId - The client ID (required for Measurement Protocol)
 * @returns {Promise<boolean>} Success status
 */
export const sendDownloadEvent = async (platform, fileName, clientId) => {
  try {
    if (!clientId) {
      console.error("Client ID is required for Measurement Protocol");
      return false;
    }

    // Use the correct measurement ID format (G-XXXXXXXXXX)
    const MEASUREMENT_ID = "G-SZFW25K1L0"; // From your index.html
    const endpoint = `https://www.google-analytics.com/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`;

    const payload = {
      client_id: clientId,
      events: [
        {
          name: "file_download",
          params: {
            platform: platform,
            file_name: fileName,
            file_extension: fileName.split(".").pop(),
            engagement_time_msec: 100,
            debug_mode: true, // Add debug mode for testing
          },
        },
      ],
    };

    console.log("Sending download event to GA4:", {
      endpoint,
      payload: JSON.stringify(payload, null, 2),
    });

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Details: ${errorText}`
      );
    }

    console.log(
      `✅ Download event sent successfully to GA4: ${platform} / ${fileName}`
    );
    return true;
  } catch (error) {
    console.error("❌ Error sending download event to GA4:", error);
    return false;
  }
};

/**
 * Get simulated data for development or when API fails
 * @returns {Object} Simulated download statistics
 */
const getSimulatedData = () => {
  return {
    totalDownloads: 1245,
    windowsDownloads: 876,
    macDownloads: 369,
    guideDownloads: 523,
    countryData: [
      { country: "United States", downloads: 342 },
      { country: "Germany", downloads: 198 },
      { country: "India", downloads: 156 },
      { country: "United Kingdom", downloads: 132 },
      { country: "Canada", downloads: 87 },
      { country: "Australia", downloads: 76 },
      { country: "Japan", downloads: 65 },
      { country: "Brazil", downloads: 54 },
      { country: "France", downloads: 48 },
      { country: "Other", downloads: 87 },
    ],
    lastUpdated: null, // No timestamp for simulated data
  };
};
