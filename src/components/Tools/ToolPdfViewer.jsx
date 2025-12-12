// src/components/ToolPdfViewer.jsx
import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Spinner,
  Text,
  Box,
} from "@chakra-ui/react";
import toolPdf from "../../assets/Tools.pdf";
import { Document, Page, pdfjs } from "react-pdf";
import "./pdfViewer.css"
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure the worker with HTTPS
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDF_SCALE = 1.5;

// function normalize(text) {
//   return text
//     .toLowerCase()
//     .replace(/\s+/g, " ")   
//     .trim();
// }

// const normalizedSearch = normalize(searchText);
// const normalizedToolKeyword = normalize(`tool ${currentToolNum}`);

async function findToolPageRange({ headingText, pdfUrl }) {
  console.log("Finding page range for:", headingText);
  
  try {
    const loadingTask = pdfjs.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;

    let startPage = null;
    let endPage = null;
    let foundStart = false;

    // Extract tool number from heading text (e.g., "Tool 1 :" -> 1)
    const toolMatch = headingText.match(/Tool\s+(\d+)/i);
    const currentToolNum = toolMatch ? toolMatch[1] : null;
    
    // Extract the main part before any special symbols or parentheses for more flexible matching
    // "Tool 55 : Integrated Valuation... (InVEST®)" -> "Tool 55 Integrated Valuation"
    let cleanHeading = headingText
      .replace(/\s*:\s*/, ' ')
      .trim();
    
    // Remove content after opening parenthesis (including the parenthesis)
    const parenIndex = cleanHeading.indexOf('(');
    if (parenIndex > -1) {
      cleanHeading = cleanHeading.substring(0, parenIndex).trim();
    }
    
    // Create regex pattern - escape special chars and handle whitespace
    const searchPattern = cleanHeading
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      .split(/\s+/)
      .join('\\s+');
    
    const searchRegex = new RegExp(searchPattern, 'i');
    
    // console.log("Looking for tool:", currentToolNum);
    // console.log("Clean heading:", cleanHeading);
    // console.log("Search pattern:", searchPattern);

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      
      // Join page text with single spaces
      const pageText = textContent.items
        .map(item => item.str.trim())
        .filter(str => str.length > 0)
        .join(" ");
      
      // Divide page text into two portions - search only in first half
      const midPoint = Math.floor(pageText.length / 2);
      const firstHalf = pageText.substring(0, midPoint);
      
      // console.log(`Page ${i} first half:`, firstHalf.substring(0, 200));

      // 1️⃣ Find start page - search only in first half to avoid references
      if (!foundStart) {
        const foundMatch = searchRegex.test(firstHalf);
        if (foundMatch) {
          startPage = i;
          foundStart = true;
          console.log("✅ Found start page:", i);
          continue;
        }
      }

      // 2️⃣ After start, check first half for different tool number
      if (foundStart) {
        const hasToolKeyword = /tool\s+\d+/i.test(firstHalf);
        const hasCurrentToolPattern = new RegExp(`tool\\s+${currentToolNum}`, 'i');
        const hasCurrentTool = hasCurrentToolPattern.test(firstHalf);
        
        if (hasToolKeyword && !hasCurrentTool) {
          endPage = i - 1;
          // console.log(" Found end page:", endPage, "- different tool detected on page", i);
          break;
        }
      }
    }

    const result = {
      startPage: startPage || 1,
      endPage: endPage || (startPage ? startPage + 1 : 1),
      numPages: pdf.numPages
    };
    
    // console.log("Final page range:", result);
    return result;
    
  } catch (error) {
    console.error("Error finding page range:", error);
    return {
      startPage: 1,
      endPage: 1,
      numPages: 1
    };
  }
}
const ToolPdfViewer = ({ isOpen, onClose, category = "", tool }) => {
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageRange, setPageRange] = useState({
    startPage: 1,
    endPage: 1,
  });


  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    console.log(`PDF loaded successfully with ${numPages} pages`);
  };

  useEffect(() => {
    if (!isOpen || !tool?.headingText) return;
    
    setLoading(true);
    
    (async () => {
      const { startPage, endPage } = await findToolPageRange({
        headingText: tool.headingText,
        pdfUrl: toolPdf
      });
      setPageRange({ startPage, endPage });
      setLoading(false);
    })();
  }, [isOpen, tool]);

  const onDocumentLoadError = (error) => {
    console.error("Error loading PDF:", error);
    setLoading(false);
  };

  // Make all PDF links open in new tab
  useEffect(() => {
    if (!loading && numPages) {
      setTimeout(() => {
        const links = document.querySelectorAll('.react-pdf__Page__annotations a');
        links.forEach(link => {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
        });
      }, 500);
    }
  }, [loading, numPages, pageRange.startPage, pageRange.endPage]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay bg="blackAlpha.600" />
      <ModalContent 
        maxH="95vh" 
        maxW="70vw"
        bg="white" 
        color="black"
        m="auto"
      >
        <ModalHeader 
          bg="green.500" 
          color="white" 
          borderTopRadius="md"
          fontSize="xl"
          textTransform="capitalize"
        >
          {category}
        </ModalHeader>
        <ModalCloseButton color="white" _hover={{ bg: "green.600" }} />
        
        <ModalBody 
          overflowY="auto" 
          overflowX="auto"
          py={4} 
          bg="#212529"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          {loading && (
            <Box textAlign="center" py={8}>
              <Spinner size="xl" color="green.500" thickness="4px" />
              <Text mt={4} color="white" fontSize="lg">Loading PDF...</Text>
            </Box>
          )}

          {!loading && pageRange.startPage && (
            <Document
              file={toolPdf}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={null}
              externalLinkTarget="_blank"
            >
              {numPages && Array.from(
                { length: Math.min(numPages, Math.max(0, pageRange.endPage - pageRange.startPage + 1)) },
                (_, idx) => {
                  const pageNum = pageRange.startPage + idx;
                  return pageNum <= numPages ? (
                    <Box 
                      key={pageNum} 
                      mb={4} 
                      border="2px solid" 
                      borderColor="gray.300"
                      borderRadius="md"
                      bg="white"
                      boxShadow="md"
                      overflow="visible"
                    >
                      <Page
                        pageNumber={pageNum}
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                        className="enhanced-pdf"
                        scale={PDF_SCALE}
                      />
                    </Box>
                  ) : null;
                }
              )}
            </Document>
          )}

          {!loading && numPages && (
            <Box 
              mt={4} 
              p={3} 
              textAlign="center" 
              bg="#212529" 
              borderRadius="md"
              boxShadow="sm"
              width="100%"
            >
              <Text color="white" fontWeight="medium" fontSize="md">
                Showing pages {pageRange.startPage} to {Math.min(pageRange.endPage, numPages)} of {numPages}
              </Text>
            </Box>
          )}

          {!loading && !numPages && (
            <Box 
              p={6} 
              bg="red.50" 
              borderRadius="md" 
              border="2px solid" 
              borderColor="red.200"
            >
              <Text color="red.600" textAlign="center" fontSize="lg" fontWeight="bold">
                Failed to load PDF. Please try again.
              </Text>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ToolPdfViewer;