import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import About from "./pages/About";
import Contactus from "./pages/Contactus";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import RightMenu from "./components/NewComponents/RightMenu";
import Index from "./pages/Cases/Index";
import Login from "./pages/Login";
import { LoadScript } from "@react-google-maps/api";
import ToolPage from "./pages/ToolPage";
import { toolsData } from "./utils/filteredComponents";

// download page
import PcaToolkitDownload from "./pages/download/DownloadPCAToolkit";
import DownloadStats from "./pages/download/DownloadStats";
import OAuthCallback from "./pages/download/OAuthCallback"; // Import the OAuth callback component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  return (
    <BrowserRouter>
    <LoadScript googleMapsApiKey={apiKey}>
      <Routes>
        {/* <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> */}
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/download" element={<PcaToolkitDownload />} />
        <Route path="/download-stats" element={<DownloadStats />} />
        <Route path="/oauth-callback" element={<OAuthCallback />} /> {/* Add OAuth callback route */}
        {toolsData.map((tool) => (
          <Route
            key={`tool-${tool.id}`}
            path={`/tool${tool.id}`}
            element={<ToolPage toolId={tool.id} logoDisplay={true} />}
          />
        ))}
        <Route path="/tool/:id" element={<ToolPage logoDisplay={true} />} />

        {/* Case Studies */}
        <Route path="/casestudies/index" element={<Index />} />

        {isLoggedIn ? <Route path="*" element={<RightMenu />} /> : null}

        {/* <Route path='*' element={<div>Page Not Found</div>} /> */}
      </Routes>
      </LoadScript>
    </BrowserRouter>
  );
};

export default App;
