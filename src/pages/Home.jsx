import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { SplitText } from "../components/NewComponents/SplitText";
import About from "./About";
import Picture1 from "../assets/Picture1.png";
import Picture2 from "../assets/Picture2.png";
import Picture3 from "../assets/Picture3.png";
import Picture4 from "../assets/Picture4.png";
import logo from "../assets/PCAKnowledge Logo.png";
import IUCN_logo from "../assets/IUCN_logo.png";
import APAP_logo from "../assets/Asia Logo.png";
import GIZ_logo from "../assets/giz.png";
import Banner from "../assets/IUCN-Banner.png";
import RightMenu from "../components/NewComponents/RightMenu";
import CaseHome from "./Cases/CaseHome";
import Footer from "../components/NewComponents/Footer";
import Contactus from "./Contactus";
import StickyNav from "../components/NewComponents/StickyNav";
import Referrences from "../components/References";
import DropDownComponent from "../components/NewComponents/DropdownComponent";
import { FaSearch } from "react-icons/fa";
import GoogleSearch from "../components/NewComponents/GoogleSearch";
import { Link } from "react-router-dom";
import solutionsData from "../assets/defaultSolutionData.json";
const LazySolutionAccordian = lazy(() => import('../components/Accordians/SolutionAccordian'));
// import SolutionAccordian from "../components/Accordians/SolutionAccordian";
import { useMemo, useCallback } from 'react';
import { List as VirtualizedList, AutoSizer } from 'react-virtualized';
import { Button, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Virtuoso } from "react-virtuoso";
import ToolCard from "../components/Tools/ToolCard";
import ToolDetail from "../components/Tools/ToolDetail";
import { filterTools, findToolById } from "../utils/filteredComponents";
import { showSpinner } from "../utils/showSpinner";
import FilterDropdown from "../utils/FilterDropdown";
import RightSidebarFilters from "../components/NewComponents/RightSidebarFilters";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSolutionsFor, setSearchSolutionsFor] = useState("");
  const [isSolutionsTabClicked, setIsSolutionsTabClicked] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [isFromCategory, setIsFromCategory] = useState(false);

  const [toolNumber, setToolNumber] = useState(null);
  const [isClicked, setClicked] = useState(false);
  let [visible, setVisible] = useState(false);
  const [displayDiv, setDisplay] = useState("");
  const [searchMenu, setSearchMenu] = useState("");
  const [titleHeading, setTitleHeading] = useState("");
  const [googlesearchTerm, setGooglesearchTerm] = useState("");
  const [goggleSearchresults, setGoogleSearchresults] = useState([]);

  // solution accordina filter 
  const [ecosystemFilters, setEcosystemFilters] = useState([]);
  const [themeFilters, setThemeFilters] = useState([]);
  const [panoramaEcosystemFilters, setPanoramaEcosystemFilters] = useState([]);
  const [panoramaThemeFilters, setPanoramaThemeFilters] = useState([]);


  const ecosystemOptions = [
    "Agro-ecosystem",
    "Desert ecosystems",
    "Forest ecosystems",
    "Freshwater ecosystems",
    "Grassland ecosystems",
    "Marine and coastal ecosystem",
    "Urban ecosystem and built environment"
  ];

  const themeOptions = [
    "Biodiversity",
    "Climate change",
    "Ecosystem conservation",
    "Financing",
    "Gender mainstreaming",
    "Geodiversity and Geoconservation",
    "Governance",
    "Human development",
    "Infrastructure",
    "Islands",
    "Local communities",
    "Management planning",
    "One Health",
    "Outreach & communications",
    "Science and research",
    "Sectors",
    "Standards/ certification",
    "Waste and resource efficiency",
    "World Heritage"
  ];

  const filteredTools = useMemo(
    () =>
      filterTools({
        searchTerm,
        searchMenu,
        searchCategory: isFromCategory ? searchTerm : null,
      }),
    [searchTerm, searchMenu, isFromCategory]
  );

  const handleToolSelect = useCallback(
    (id) => {
      setToolNumber(Number(id));
      setClicked(true);
    },
    [setClicked]
  );

  const selectedTool = useMemo(
    () => findToolById(toolNumber),
    [toolNumber]
  );

  const handleGoogleSearch = async () => {
    setShowLoader(true);
    setDisplay("googleresult");
    const apiKey = "AIzaSyDjJiFL1oJmY4kOIn3ux8vMW_spjYJ6eFA";
    const cx = "93f2eca1b89cb438c";

    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${googlesearchTerm}`
    );
    const data = await response.json();
    setTimeout(() => {
      setShowLoader(false);
    }, 1000);
    setGoogleSearchresults(data.items || []);
  };
  const displayData = (div) => {
    switch (div) {
      case "about":
        return <About />;
      case "cs":
        return <CaseHome />;
      case "contact":
        return <Contactus />;
      case "results":
        return showResults();
      case "panorama_results":
        return <PanoramaResults />;
      case "reference":
        return <Referrences />;
      case "googleresult":
        return googleResult();
      default: {
        return showDefault();
      }
    }
  };


console.log(isFromCategory,"isFromCategory");
console.log(searchTerm,"searchTerm");
console.log(searchMenu,"searchMenu");
console.log(searchInput,"searchInput");
console.log(titleHeading,"titleHeading");
console.log(isClicked,"isClicked");
console.log(selectedTool,"selectedTool");
console.log(searchSolutionsFor,"solution for");
console.log(isSolutionsTabClicked,"show both tabs");
console.log(isSolutionsTabClicked,"isSolutionsTabClicked");
console.log(filteredTools,"filteredTools");


  const handleSearch = () => {
    setSearchTerm((prev) => (prev = searchInput));
    setIsFromCategory(false);
    setSearchMenu("");
    setTitleHeading("");
    setClicked(false);
    setIsSolutionsTabClicked(false);
    setDisplay("results");
    setToolNumber();
    console.log("searching");
  };

  const searchCategory = (categoryKeyword) => {
    console.log(categoryKeyword, "search category");
    setSearchTerm((prev) => (prev = categoryKeyword));
    setIsFromCategory(true);
    // setDisplay("results");
  };

  useEffect(() => {
    if (searchTerm !== "" || searchMenu !== "") {
      setShowLoader(true);
      setTimeout(() => {
        setShowLoader(false);
        console.log("stopped");
      }, 1000);
    }
  }, [searchTerm, searchMenu]);

  useEffect(() => {
    setVisible(!visible);
  }, []);


  const defaultStyle = {
    fontFamily: "sans-serif",
    textAlign: "center",
    fontSize: "30px",
    fontWeight: "700",
    letterSpacing: "1px",
    lineHeight: "1.2",
    margin: "auto",
    paddingTop: "30px",
    marginBottom: "2rem",
    color: "#fff",
  };
  const showDefault = () => {
    return (
      <div style={defaultStyle}>
        <AnimatePresence>
          {visible && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SplitText
                initial={{ y: "100%" }}
                animate="visible"
                variants={{
                  visible: (i) => ({
                    color: "#5ae6b8",
                    y: 0,
                    transition: {
                      delay: i * 0.4,
                    },
                  }),
                }}
              >
                Welcome to the PCA Knowledge Kit
              </SplitText>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const googleResult = () => {
    if (showLoader) {
      return (
        <Box textAlign="center" mt="4">
          <Spinner />
        </Box>
      );
    } else {
      return (
        <>
          <Box
            textAlign="start"
            mt="-3"
            mb="4"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <span>Showing results for</span>&nbsp;
              <span style={{ fontWeight: "600", color: "#5ae6b8" }}>
                {goggleSearchresults ? googlesearchTerm : ""}
              </span>
            </div>
          </Box>
          <div>
            {goggleSearchresults.length > 0 && (
              <div className="results-container">
                {goggleSearchresults.map((item, index) => (
                  <div key={index} className="result-item">
                    <a
                      href={item.link}
                      className="result-title"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.title}
                    </a>
                    <div className="bottom_link">
                      <a
                        href={item.link}
                        className="result-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.displayLink}
                      </a>
                    </div>
                    <p className="result-snippet mb-0 d-flex">{item.snippet}</p>
                    {/* {item.pagemap.cse_thumbnail?.src} */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      );
    }
  };
  const ShowData = () => {
    if (selectedTool) {
      return <ToolDetail tool={selectedTool} />;
    }

    if (!filteredTools.length) {
      return null;
    }

    return filteredTools.map((tool) => (
      <ToolCard
        key={`tool-${tool.id}`}
        tool={tool}
        searchTerm={searchTerm}
        onSelect={handleToolSelect}
      />
    ));
  };

  const customTabStyles = {
    tab: {
      _selected: {
        borderTop: "1px solid #5ae6b8",
        borderLeft: "1px solid #5ae6b8",
        borderRight: "1px solid #5ae6b8",
        // marginBottom: "-1px" ,
        borderTopRadius: "10px",
        backgroundColor: "#212529",
        color: "white",
      },
      py: "2",
      px: "6",
      mr: "1",
    },
    tabPanel: {
      bg: "#212529",
      border: "none",
      borderRadius: "0 4px 4px 4px",
      color: "white",
    },
    tabList: {
      border: "1px solid #5ae6b8",
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      mb: "0",
    },
  };


  const showResults = () => {
    if (showLoader) {
      return (
        <Box textAlign="center" mt="4">
          <Spinner />
        </Box>
      );
    } else {
      const isFromSubMenu = searchMenu && typeof searchMenu === 'string'
      if (isFromCategory && searchTerm && !isFromSubMenu) {
        // This is for main category clicks (like "Good Governance")
        return (
          <>
            <Box
              textAlign="start"
              mt="-3"
              mb="4"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span>Showing results from</span>&nbsp;
                <span style={{ fontWeight: "600", color: "#5ae6b8" }}>
                  {searchTerm}
                </span>
              </div>
              {isClicked && (
                <button
                  className="btn backBtn"
                  style={{ textAlign: "end" }}
                  onClick={() => {
                    setToolNumber();
                    setClicked(false);
                  }}
                >
                  Back
                </button>
              )}
            </Box>
            <Tabs defaultIndex={0} variant="enclosed" colorScheme="#5ae6b8">
              <TabList
                sx={customTabStyles.tabList}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <HStack spacing={2}>
                  <Tab py="2" px="6" sx={customTabStyles.tab} onClick={() => setIsSolutionsTabClicked(false)}>
                    Resource Book
                  </Tab>
                  <Tab py="2" px="6" sx={customTabStyles.tab} onClick={() => setIsSolutionsTabClicked(true)}>
                    PANORAMA Solution
                  </Tab>
                </HStack>

                {/* Filters aligned to the right */}
                <HStack spacing={4} flexWrap="wrap" hidden={!isSolutionsTabClicked}>
                  <FilterDropdown
                    title="Ecosystem"
                    options={ecosystemOptions}
                    selectedOptions={ecosystemFilters}
                    onChange={setEcosystemFilters}
                  />
                  <FilterDropdown
                    title="Theme"
                    options={themeOptions}
                    selectedOptions={themeFilters}
                    onChange={setThemeFilters}
                  />
                </HStack>
              </TabList>



              <TabPanels
                style={{
                  border: "1px solid #5ae6b8",
                  borderTop: "none",
                  borderBottomLeftRadius: "4px",
                  borderBottomRightRadius: "4px",
                }}
              >
                {/* Tab 1 Content */}
                <TabPanel sx={customTabStyles.tabPanel}>
                  <Box className="accordian_section_here">
                    <Flex direction="column">
                      <Box style={{ minHeight: "100vh", height: "auto", width: "100%" }}>
                        <Box className="start_accordion">
                          <ShowData />
                        </Box>
                      </Box>
                    </Flex>
                  </Box>
                </TabPanel>

                {/* Tab 2 Content */}
                <TabPanel>
                  <ShowSolutions />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </>
        );
      } else if ((isFromCategory && searchMenu) || isFromSubMenu) {
        console.log(isFromSubMenu,"isFromSubMenu");
        
        return (
          <>
            <Box
              textAlign="start"
              mt="-3"
              mb="4"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span>Showing results from</span>&nbsp;
                <span style={{ fontWeight: "600", color: "#5ae6b8" }}>
                  {titleHeading ? titleHeading : searchMenu}
                </span>
              </div>
              {isClicked && (
                <button
                  className="btn backBtn"
                  style={{ textAlign: "end" }}
                  onClick={() => {
                    setToolNumber();
                    setClicked(false);
                  }}
                >
                  Back
                </button>
              )}
            </Box>

            {isFromSubMenu ? (
              <Box
                className="accordian_section_here">
                <Flex direction="column">
                  <Box width="100%">
                    <Box style={{ minHeight: "100vh", height: "auto", width: "100%" }}>
                      <ShowData />
                    </Box>
                  </Box>
                </Flex>
              </Box>
            ) : (
              <Tabs defaultIndex={0} variant="enclosed" colorScheme="#5ae6b8">
                <TabList
                  sx={customTabStyles.tabList}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  flexWrap="wrap"
                >
                  <HStack spacing={2}>
                    <Tab py="2" px="6" sx={customTabStyles.tab} onClick={() => setIsSolutionsTabClicked(false)}>
                      Resource Book
                    </Tab>
                    <Tab py="2" px="6" sx={customTabStyles.tab} onClick={() => setIsSolutionsTabClicked(true)}>
                      PANORAMA Solution
                    </Tab>
                  </HStack>

                  <HStack spacing={4} flexWrap="wrap" hidden={!isSolutionsTabClicked}>
                    <FilterDropdown
                      title="Ecosystem"
                      options={ecosystemOptions}
                      selectedOptions={ecosystemFilters}
                      onChange={setEcosystemFilters}
                    />
                    <FilterDropdown
                      title="Theme"
                      options={themeOptions}
                      selectedOptions={themeFilters}
                      onChange={setThemeFilters}
                    />
                  </HStack>
                </TabList>



                <TabPanels
                  style={{
                    border: "1px solid #5ae6b8",
                    borderTop: "none",
                    borderBottomLeftRadius: "4px",
                    borderBottomRightRadius: "4px",
                  }}
                >
                  {/* Tab 1 Content */}
                  <TabPanel sx={customTabStyles.tabPanel}>
                    <Box className="accordian_section_here">
                      <Flex direction="column">
                        <Box width="100%">
                          <Box className="start_accordion">
                            <ShowData />
                          </Box>
                        </Box>
                      </Flex>
                    </Box>
                  </TabPanel>

                  {/* Tab 2 Content */}
                  <TabPanel>
                    <ShowSolutions />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            )}
          </>
        );
      } else if (searchTerm && !isFromCategory) {
        return showSpinner({ showLoader, searchTerm, toolNumber, setToolNumber, setClicked, isClicked, });
      } else {
        return showDefault();
      }
    }
  };

  const ShowSolutions = () => {
    const ITEMS_PER_PAGE = 10;
    const [visibleSolutions, setVisibleSolutions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);



    const normalize = (text) =>
      text.toLowerCase().replace(/ecosystems?/gi, "").trim();

    const extractKeywords = (text) =>
      text
        ?.split(",")
        .map((s) => normalize(s))
        .filter(Boolean) || [];

        const filteredSolutions = useMemo(() => {
          let results = [...visibleSolutions];
          const hasFilters = ecosystemFilters.length > 0 || themeFilters.length > 0;
    
          if (hasFilters) {
            let filteredByTags = [...visibleSolutions];
            // Ecosystem filtering
            if (ecosystemFilters.length > 0) {
              filteredByTags = filteredByTags.filter((solution) => {
                const tags = extractKeywords(
                  `${solution.ecosystem || ""},${solution.other_ecosystem || ""}`
                );
                return ecosystemFilters.every((filter) => {
                  const f = normalize(filter);
                  return tags.some((tag) => tag.includes(f) || f.includes(tag));
                });
              });
            }
    
            // Theme filtering
            if (themeFilters.length > 0) {
              filteredByTags = filteredByTags.filter((solution) => {
                const tags = extractKeywords(
                  `${solution.theme || ""},${solution.other_theme || ""}`
                );
                return themeFilters.every((filter) => {
                  const f = normalize(filter);
                  return tags.some((tag) => tag.includes(f) || f.includes(tag));
                });
              });
            }
    
            // OECM solutions
            const oecmSolutions = visibleSolutions.filter(solution => {
                const oecmInTitle = solution.title && solution.title.toLowerCase().includes('oecm');
                const oecmInSummary = solution.summary && solution.summary.toLowerCase().includes('oemc');
                return oecmInTitle || oecmInSummary;
            });

            console.log(oecmSolutions);
            
    
            // Combine and remove duplicates
            const combined = [...filteredByTags, ...oecmSolutions];
            const uniqueResults = Array.from(new Set(combined.map(a => a.solution_node_id)))
                .map(id => {
                    return combined.find(a => a.solution_node_id === id)
                });
    
            return uniqueResults;
          }
    
          return results;
        }, [visibleSolutions, ecosystemFilters, themeFilters]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredSolutions.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredSolutions.length);
    const currentSolutions = filteredSolutions.slice(startIndex, endIndex);

    const visiblePageNumbers = useMemo(() => {
      const DOTS = '...';
      if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      if (currentPage <= 3) {
        return [1, 2, 3, DOTS, totalPages];
      } else if (currentPage >= totalPages - 2) {
        return [1, DOTS, totalPages - 2, totalPages - 1, totalPages];
      } else {
        return [1, DOTS, currentPage, DOTS, totalPages];
      }
    }, [currentPage, totalPages]);

    const handlePageChange = (pageNum) => {
      if (typeof pageNum === 'number') setCurrentPage(pageNum);
    };

    const handlePrevPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));
    const handleNextPage = () => setCurrentPage((prev) => Math.min(totalPages, prev + 1));

    useEffect(() => {
      setIsLoading(true);
      setCurrentPage(1);

      const timerId = setTimeout(() => {
        let results = [...solutionsData];

        if (titleHeading) {
          const searchKeywords = titleHeading
            .toLowerCase()
            .split(" ")
            .filter((word) => word.length > 3);

          results = results.filter((solution) =>
            searchKeywords.some((keyword) =>
              [solution.title, solution.summary, solution.impacts, solution.story]
                .filter(Boolean)
                .some((text) => text.toLowerCase().includes(keyword))
            )
          );
        }

        setVisibleSolutions(results);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timerId);
    }, [titleHeading, searchTerm, isFromCategory, searchSolutionsFor]);

    return (
      <Box className="solutions-container">
        {isLoading ? (
          <Box textAlign="center" py={8}>
            <Spinner size="xl" />
          </Box>
        ) : filteredSolutions.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Text>No solutions found matching your criteria.</Text>
          </Box>
        ) : (
          <>
            {/* Filters */}
            {/* <Box display="flex" justifyContent="flex-end" mb={4}>
            <FilterDropdown
              title="Ecosystem"
              options={ecosystemOptions}
              selectedOptions={ecosystemFilters}
              onChange={setEcosystemFilters}
            />
            <FilterDropdown
              title="Theme"
              options={themeOptions}
              selectedOptions={themeFilters}
              onChange={setThemeFilters}
            />
          </Box> */}

            {/* Solutions */}
            <Box style={{ minHeight: "100vh", height: "auto", width: "100%" }}>
              <Virtuoso
                style={{ height: "auto", minHeight: "100vh" }}
                data={currentSolutions}
                itemContent={(index, solution) => (
                  <Suspense
                    fallback={
                      <Box p={4} border="1px solid" borderColor="gray.200">
                        <Text>Loading solution...</Text>
                      </Box>
                    }
                  >
                    <LazySolutionAccordian
                      solution={solution}
                      isVirtualized={true}
                    />
                  </Suspense>
                )}
              />
            </Box>

            {/* Pagination */}
            <Box mt={6}>
              <HStack justify="space-between" align="center" wrap="wrap" spacing={4}>
                <HStack spacing={2}>
                  <IconButton
                    icon={<ChevronLeftIcon />}
                    aria-label="Previous page"
                    isDisabled={currentPage === 1}
                    onClick={handlePrevPage}
                    colorScheme="teal"
                    size="sm"
                  />
                  {visiblePageNumbers.map((pageNum, idx) =>
                    pageNum === "..." ? (
                      <Text key={`dots-${idx}`} mx={1}>...</Text>
                    ) : (
                      <Button
                        key={`page-${pageNum}`}
                        onClick={() => handlePageChange(pageNum)}
                        colorScheme={currentPage === pageNum ? "teal" : "white"}
                        variant={currentPage === pageNum ? "solid" : "outline"}
                        size="sm"
                      >
                        {pageNum}
                      </Button>
                    )
                  )}
                  <IconButton
                    icon={<ChevronRightIcon />}
                    aria-label="Next page"
                    isDisabled={currentPage === totalPages}
                    onClick={handleNextPage}
                    colorScheme="teal"
                    size="sm"
                  />
                </HStack>

                <Text fontSize="sm" color="gray.500">
                  Showing {startIndex + 1}-{endIndex} of {filteredSolutions.length} solutions
                </Text>
              </HStack>
            </Box>
          </>
        )}
      </Box>
    );
  };

  const PanoramaResults = () => {
    const ITEMS_PER_PAGE = 10;
    const [visibleSolutions, setVisibleSolutions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const normalize = (text) =>
      text.toLowerCase().replace(/ecosystems?/gi, "").trim();

    const extractKeywords = (text) =>
      text
        ?.split(",")
        .map((s) => normalize(s))
        .filter(Boolean) || [];

    const filteredSolutions = useMemo(() => {
      let results = [...visibleSolutions];
      const hasFilters = panoramaEcosystemFilters.length > 0 || panoramaThemeFilters.length > 0;

      if (hasFilters) {
        let filteredByTags = [...visibleSolutions];
        // Ecosystem filtering
        if (panoramaEcosystemFilters.length > 0) {
          filteredByTags = filteredByTags.filter((solution) => {
            const tags = extractKeywords(
              `${solution.ecosystem || ""},${solution.other_ecosystem || ""}`
            );
            return panoramaEcosystemFilters.every((filter) => {
              const f = normalize(filter);
              return tags.some((tag) => tag.includes(f) || f.includes(tag));
            });
          });
        }

        // Theme filtering
        if (panoramaThemeFilters.length > 0) {
          filteredByTags = filteredByTags.filter((solution) => {
            const tags = extractKeywords(
              `${solution.theme || ""},${solution.other_theme || ""}`
            );
            return panoramaThemeFilters.every((filter) => {
              const f = normalize(filter);
              return tags.some((tag) => tag.includes(f) || f.includes(tag));
            });
          });
        }

        // OECM solutions
        const oecmSolutions = visibleSolutions.filter(solution => {
            const oecmInTitle = solution.title && solution.title.toLowerCase().includes('oecm');
            const oecmInSummary = solution.summary && solution.summary.toLowerCase().includes('oemc');
            return oecmInTitle || oecmInSummary;
        });
console.log(oecmSolutions,"oecmSolutions");

        // Combine and remove duplicates
        const combined = [...filteredByTags, ...oecmSolutions];
        const uniqueResults = Array.from(new Set(combined.map(a => a.solution_node_id)))
            .map(id => {
                return combined.find(a => a.solution_node_id === id)
            });

        return uniqueResults;
      }

      return results;
    }, [visibleSolutions, panoramaEcosystemFilters, panoramaThemeFilters]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredSolutions.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredSolutions.length);
    const currentSolutions = filteredSolutions.slice(startIndex, endIndex);

    const visiblePageNumbers = useMemo(() => {
      const DOTS = '...';
      if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      if (currentPage <= 3) {
        return [1, 2, 3, DOTS, totalPages];
      } else if (currentPage >= totalPages - 2) {
        return [1, DOTS, totalPages - 2, totalPages - 1, totalPages];
      } else {
        return [1, DOTS, currentPage, DOTS, totalPages];
      }
    }, [currentPage, totalPages]);

    const handlePageChange = (pageNum) => {
      if (typeof pageNum === 'number') setCurrentPage(pageNum);
    };

    const handlePrevPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));
    const handleNextPage = () => setCurrentPage((prev) => Math.min(totalPages, prev + 1));

    useEffect(() => {
      setIsLoading(true);
      setCurrentPage(1);

      const timerId = setTimeout(() => {
        let results = [...solutionsData];
        setVisibleSolutions(results);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timerId);
    }, []);

    return (
      <Box className="solutions-container">
        <Box mb={6} borderBottom="1px solid" borderColor="gray.600" pb={1}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="#5ae6b8"
            textAlign="center"
          >
            PANORAMA Solutions
          </Text>
        </Box>
        {isLoading ? (
          <Box textAlign="center" py={8}>
            <Spinner size="xl" />
          </Box>
        ) : filteredSolutions.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Text>No solutions found matching your criteria.</Text>
          </Box>
        ) : (
          <>
            {/* Solutions */}
            <Box style={{ minHeight: "100vh", height: "auto", width: "100%" }}>

              <Virtuoso
                style={{ height: "auto", minHeight: "100vh" }}
                data={currentSolutions}
                itemContent={(index, solution) => (
                  <Suspense
                    fallback={
                      <Box p={4} border="1px solid" borderColor="gray.200">
                        <Text>Loading solution...</Text>
                      </Box>
                    }
                  >
                    <LazySolutionAccordian
                      solution={solution}
                      isVirtualized={true}
                    />
                  </Suspense>
                )}
              />
            </Box>

            {/* Pagination */}
            <Box mt={6}>
              <HStack justify="space-between" align="center" wrap="wrap" spacing={4}>
                <HStack spacing={2}>
                  <IconButton
                    icon={<ChevronLeftIcon />}
                    aria-label="Previous page"
                    isDisabled={currentPage === 1}
                    onClick={handlePrevPage}
                    colorScheme="teal"
                    size="sm"
                  />
                  {visiblePageNumbers.map((pageNum, idx) =>
                    pageNum === "..." ? (
                      <Text key={`dots-${idx}`} mx={1}>...</Text>
                    ) : (
                      <Button
                        key={`page-${pageNum}`}
                        onClick={() => handlePageChange(pageNum)}
                        colorScheme={currentPage === pageNum ? "teal" : "white"}
                        variant={currentPage === pageNum ? "solid" : "outline"}
                        size="sm"
                      >
                        {pageNum}
                      </Button>
                    )
                  )}
                  <IconButton
                    icon={<ChevronRightIcon />}
                    aria-label="Next page"
                    isDisabled={currentPage === totalPages}
                    onClick={handleNextPage}
                    colorScheme="teal"
                    size="sm"
                  />
                </HStack>

                <Text fontSize="sm" color="gray.500">
                  Showing {startIndex + 1}-{endIndex} of {filteredSolutions.length} solutions
                </Text>
              </HStack>
            </Box>
          </>
        )}
      </Box>
    );
  };


  const logoStyle = {
    boxShadow:
      "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
    // borderRadius: "100px",
    // border: "3px solid #049ddb",
    cursor: "pointer",
    padding: "10px",
  };
  return (
    <>
      <div className="main-container">
        <main>
          <section className="hero-section">
            <div className="container-fluid">
              <div className="row">
                <div className="col-20" >
                  <div className="pcaLogo_here">
                    <img
                      src={logo}
                      className="bg-transparent"
                      alt="logo"
                      style={logoStyle}
                      onClick={() => window.location.reload()}
                    />
                  </div>
                  <div className="left-sidebar">
                    <div className="sidebar-header d-flex align-items-center justify-content-between">
                      <h5>
                        Protected Area Governance and Management <br />{" "}
                        (Resource Book)
                      </h5>
                    </div>
                    <div className="all_menuHere mb-4">
                      <ul className="MenuLinks_here align-items-center  justify-content-center">
                        <li
                          onClick={() => {
                            setDisplay("results");
                            setIsSolutionsTabClicked(false);
                            setThemeFilters([]);
                            setEcosystemFilters([]);
                            setPanoramaEcosystemFilters([]);
                            setPanoramaThemeFilters([]);
                            searchCategory("POLICY AND LEGAL FRAMEWORK");
                            setSearchSolutionsFor("POLICY AND LEGAL FRAMEWORK");
                            setToolNumber();
                            setClicked(false);
                            setSearchMenu("");
                          }}
                        >
                          Policy and Legal Framework
                        </li>
                        <li
                          onClick={() => {
                            searchCategory("SPATIAL PLANNING");
                            setSearchSolutionsFor("SPATIAL PLANNING");
                            setDisplay("results");
                            setIsSolutionsTabClicked(false);
                            setThemeFilters([]);
                            setEcosystemFilters([]);
                            setPanoramaEcosystemFilters([]);
                            setPanoramaThemeFilters([]);
                            setToolNumber();
                            setClicked(false);
                            setSearchMenu("");
                          }}
                        >
                          Spatial Planning
                        </li>
                        <li
                          onClick={() => {
                            setDisplay("results");
                            setIsSolutionsTabClicked(false);
                            setThemeFilters([]);
                            setEcosystemFilters([]);
                            setPanoramaEcosystemFilters([]);
                            setPanoramaThemeFilters([]);
                            searchCategory("MANAGEMENT PLANNING");
                            setSearchSolutionsFor("MANAGEMENT PLANNING");
                            setToolNumber();
                            setClicked(false);
                            setSearchMenu("");
                          }}
                        >
                          Management Planning
                        </li>
                        <li
                          onClick={() => {
                            setDisplay("results");
                            setIsSolutionsTabClicked(false);
                            setThemeFilters([]);
                            setEcosystemFilters([]);
                            setPanoramaEcosystemFilters([]);
                            setPanoramaThemeFilters([]);
                            searchCategory("PROTECTED AREA FINANCING");
                            setSearchSolutionsFor("PROTECTED AREA FINANCING");
                            setToolNumber();
                            setClicked(false);
                            setSearchMenu("");
                          }}
                        >
                          Protected Area Financing{" "}
                        </li>
                        <li
                          onClick={() => {
                            setDisplay("results");
                            setIsSolutionsTabClicked(false);
                            setThemeFilters([]);
                            setEcosystemFilters([]);
                            setPanoramaEcosystemFilters([]);
                            setPanoramaThemeFilters([]);
                            searchCategory("CAPACITY DEVELOPMENT");
                            setSearchSolutionsFor("CAPACITY DEVELOPMENT");
                            setToolNumber();
                            setClicked(false);
                            setSearchMenu("");
                          }}
                        >
                          Capacity Development
                        </li>
                        <li
                          onClick={() => {
                            searchCategory("ASSESSMENT, MONITORING AND EVALUATION");
                            setSearchSolutionsFor("ASSESSMENT, MONITORING AND EVALUATION");
                            setDisplay("results");
                            setIsSolutionsTabClicked(false);
                            setThemeFilters([]);
                            setEcosystemFilters([]);
                            setPanoramaEcosystemFilters([]);
                            setPanoramaThemeFilters([]);
                            setToolNumber();
                            setClicked(false);
                            setSearchMenu("");
                          }}
                        >
                          Assessment, Monitoring and Evaluation
                        </li>
                        <li
                          onClick={() => {
                            setDisplay("results");
                            setIsSolutionsTabClicked(false);
                            setThemeFilters([]);
                            setEcosystemFilters([]);
                            setPanoramaEcosystemFilters([]);
                            setPanoramaThemeFilters([]);
                            searchCategory("GOVERNANCE");
                            setSearchSolutionsFor("GOVERNANCE");
                            setToolNumber();
                            setClicked(false);
                            setSearchMenu("");
                          }}
                        >
                          Governance
                        </li>

                        {/* <li
                          onClick={() => {
                            setDisplay("reference");
                            searchCategory("");
                            setToolNumber();
                          }}
                        >
                          References
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-60"  >
                  <StickyNav
                    searchTerm={setSearchTerm}
                    tNumber={setToolNumber}
                    menuItem={setSearchMenu}
                    setIsSolutionsTabClicked={setIsSolutionsTabClicked}
                    setDisplay={setDisplay}
                    setThemeFilters={setThemeFilters}
                    setEcosystemFilters={setEcosystemFilters}
                    setPanoramaEcosystemFilters={setPanoramaEcosystemFilters}
                    setPanoramaThemeFilters={setPanoramaThemeFilters}
                    setIsFromCategory={setIsFromCategory}
                    setSearchTerm={setSearchTerm}
                    setVisible={setVisible}
                    setTitleHeading={setTitleHeading}
                    children={[
                      {
                        "Good Governance": [
                          "Guarantee legitimacy and voice",
                          "Achieve transparency and accountability",
                          "Enable governance vitality and capacity to respond adaptively",
                        ],
                        "Sound Design and Planning": [
                          "Identify and understand major site values",
                          "Design for long-term conservation of major site values",
                          "Understand threats and challenges to major site values",
                          "Understand the social and economic context",
                        ],
                        "Effective Management": [
                          "Develop and implement long-term management strategy",
                          "Manage ecological condition",
                          "Manage within the social and economic context of the site",
                          "Manage Threat",
                          "Effectively and fairly reinforce laws and regulations",
                          "Manage access, resource use and visitation",
                          "Measure success",
                        ],
                        "Successful Conservation Outcomes": [
                          "Demonstrate conservation of major site values",
                          "Demonstrate conservation of major associated ecosystem services",
                          "Demonstrate conservation of major cultural values",
                        ],
                      },
                    ]}
                  />
                  <div className="row Add_newLogo_css">
                    <div className="col-md-4 col-sm-4 col-6">
                      {/* <Link to="https://iucn.org/" target="_blank"> </Link> */}
                      <img src={IUCN_logo} alt="" />
                    </div>
                    <div className="col-md-4 col-sm-4 col-6">
                      <img src={APAP_logo} alt="" />
                    </div>
                    <div className="col-md-4 col-sm-4 col-12 ">
                      <img style={{ width: "100%" }} src={GIZ_logo} alt="" />
                    </div>
                  </div>
                  <img
                    style={{
                      marginTop: "0rem",
                      width: "100%",
                      height: "100px",
                      marginBottom: "-3rem",
                    }}
                    src={Banner}
                    alt=""
                  />
                  <div className="hero-content content-width ">
                    <div className="  section-header">
                      <div className="row">
                        <div className="col-lg-8 col-md-6 col-sm-6 col-12 text-center pt-4">
                          <h2 style={{ color: "#5ae6b8", fontSize: "19px" }}>
                            IUCN Green List <br />
                            (Alignment with Resource Book)
                            {/* Protected Area Governance and Management (Compendium) */}
                          </h2>
                        </div>
                        <div className="col-lg-4  col-md-6 col-sm-6 col-12">
                          <div className="search_input_here pt-2">
                            <div
                              className="form-input"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Knowledge Kit Search "
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                onKeyUp={(e) => {
                                  if (e.key === "Enter") handleSearch();
                                }}
                              />
                              <FaSearch
                                cursor="pointer"
                                className="search_icon_setheight  mx-2"
                                onClick={handleSearch}
                              />{" "}
                            </div>
                            <div className="Google_search_container">
                              <div
                                className="form-input"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <input
                                  type="text"
                                  className="form-control"
                                  value={googlesearchTerm}
                                  onChange={(e) =>
                                    setGooglesearchTerm(e.target.value)
                                  }
                                  placeholder="Web Search"
                                  onKeyUp={(e) => {
                                    if (e.key === "Enter") handleGoogleSearch();
                                  }}
                                />
                                <FaSearch
                                  cursor="pointer"
                                  className="search_icon_setheight  mx-2"
                                  onClick={handleGoogleSearch}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="section-container pt-4 ">
                      <div className="row top_cardCss_inMobile">
                        <div className="col-lg-3 col-md-6 col-sm-6 section-container">
                          <DropDownComponent
                            setClicked={setClicked}
                            menuItem={setSearchMenu}
                            setDisplay={setDisplay}
                            setIsSolutionsTabClicked={setIsSolutionsTabClicked}
                            setThemeFilters={setThemeFilters}
                            setEcosystemFilters={setEcosystemFilters}
                            setPanoramaEcosystemFilters={setPanoramaEcosystemFilters}
                            setPanoramaThemeFilters={setPanoramaThemeFilters}
                            setIsFromCategory={setIsFromCategory}
                            setSearchTerm={setSearchTerm}
                            setVisible={setVisible}
                            img={Picture1}
                            setToolNumber={setToolNumber}
                            setTitleHeading={setTitleHeading}
                            title={
                              <span>
                                Good <br />
                                Governance
                              </span>
                            }
                            cardNum="1"
                            menuItems={[
                              "Guarantee legitimacy and voice",
                              "Achieve transparency and accountability",
                              "Enable governance vitality and capacity to respond adaptively",
                            ]}
                          />
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                          <DropDownComponent
                            setClicked={setClicked}
                            menuItem={setSearchMenu}
                            setDisplay={setDisplay}
                            setIsSolutionsTabClicked={setIsSolutionsTabClicked}
                            setThemeFilters={setThemeFilters}
                            setEcosystemFilters={setEcosystemFilters}
                            setPanoramaEcosystemFilters={setPanoramaEcosystemFilters}
                            setPanoramaThemeFilters={setPanoramaThemeFilters}
                            setIsFromCategory={setIsFromCategory}
                            setSearchTerm={setSearchTerm}
                            setVisible={setVisible}
                            setToolNumber={setToolNumber}
                            setTitleHeading={setTitleHeading}
                            img={Picture2}
                            cardNum="2"
                            title={
                              <span>
                                Sound Design and <br />
                                Planning
                              </span>
                            }
                            menuItems={[
                              "Identify and understand major site values",
                              "Design for long-term conservation of major site values",
                              "Understand threats and challenges to major site values",
                              "Understand the social and economic context",
                            ]}
                          />
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                          <DropDownComponent
                            menuItem={setSearchMenu}
                            setDisplay={setDisplay}
                            setThemeFilters={setThemeFilters}
                            setIsSolutionsTabClicked={setIsSolutionsTabClicked}
                            setEcosystemFilters={setEcosystemFilters}
                            setPanoramaEcosystemFilters={setPanoramaEcosystemFilters}
                            setPanoramaThemeFilters={setPanoramaThemeFilters}
                            setClicked={setClicked}
                            setIsFromCategory={setIsFromCategory}
                            setSearchTerm={setSearchTerm}
                            setVisible={setVisible}
                            setTitleHeading={setTitleHeading}
                            setToolNumber={setToolNumber}
                            img={Picture3}
                            title={
                              <span>
                                Effective <br />
                                Management
                              </span>
                            }
                            cardNum="3"
                            menuItems={[
                              "Develop and implement long-term management strategy",
                              "Manage ecological condition",
                              "Manage within the social and economic context of the site",
                              "Manage Threat",
                              "Effectively and fairly reinforce laws and regulations",
                              "Manage access, resource use and visitation",
                              "Measure success",
                            ]}
                          />
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                          <DropDownComponent
                            menuItem={setSearchMenu}
                            setDisplay={setDisplay}
                            setThemeFilters={setThemeFilters}
                            setIsSolutionsTabClicked={setIsSolutionsTabClicked}
                            setEcosystemFilters={setEcosystemFilters}
                            setPanoramaEcosystemFilters={setPanoramaEcosystemFilters}
                            setPanoramaThemeFilters={setPanoramaThemeFilters}
                            setClicked={setClicked}
                            setIsFromCategory={setIsFromCategory}
                            setSearchTerm={setSearchTerm}
                            setVisible={setVisible}
                            setToolNumber={setToolNumber}
                            setTitleHeading={setTitleHeading}
                            img={Picture4}
                            cardNum="4"
                            title={
                              <span>
                                Successful Conservation <br /> Outcomes
                              </span>
                            }
                            menuItems={[
                              "Demonstrate conservation of major site values",
                              "Demonstrate conservation of major associated ecosystem services",
                              "Demonstrate conservation of major cultural values",
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordian_section_here">
                    <div className="row">
                      <div className="col-md-12 ">
                        <div className="start_accordion">
                          {displayData(displayDiv)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: "80px", width: "102%" }}>
                    <Footer />
                  </div>
                </div>
                <div className="col-20-right" >
                  <RightSidebarFilters
                    ecosystemOptions={ecosystemOptions}
                    themeOptions={themeOptions}
                    panoramaThemeFilters={panoramaThemeFilters}
                    panoramaEcosystemFilters={panoramaEcosystemFilters}
                    setIsSolutionsTabClicked={setIsSolutionsTabClicked}
                    setPanoramaEcosystemFilters={setPanoramaEcosystemFilters}
                    setPanoramaThemeFilters={setPanoramaThemeFilters}
                    setDisplay={setDisplay}
                    setThemeFilters={setThemeFilters}
                    setEcosystemFilters={setEcosystemFilters}
                    setSearchTerm={setSearchTerm}
                    setSearchMenu={setSearchMenu}
                    setClicked={setClicked}
                    setTitleHeading={setTitleHeading}
                    setToolNumber={setToolNumber}
                  />
                </div>
                <RightMenu setDisplay={setDisplay} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
