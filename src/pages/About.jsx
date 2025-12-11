"use client";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
} from "@chakra-ui/react";
import Footer from "../components/NewComponents/Footer";
import logo from "../assets/PCAKnowledge Logo.png";
import { AnimatePresence, motion } from "framer-motion";
import { SplitText } from "../components/NewComponents/SplitText";
const logoStyle = {
  boxShadow:
    "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
  borderRadius: "100px",
  border: "3px solid #049ddb",
  cursor: "pointer",
};
import { Link } from "react-router-dom";
const defaultStyle = {
  fontFamily: "sans-serif",
  fontSize: "30px",
  fontWeight: "700",
  letterSpacing: "1px",
  lineHeight: "1.2",
  textAlign: "center",
  margin: "auto",
  marginBottom: "-3rem",
  color: "#fff",
};
export default function About() {
  return (
    <>
      <div className="container">
        <div className="row">
          {/* <div className="col-lg-2 col-md-3">
            <div className="left-sidebar">
              <div className="d-flex align-items-center justify-content-between">
                <img
                  src={logo}
                  className="bg-transparent"
                  alt="logo"
                  style={logoStyle}
                  onClick={() => (window.location.href = "/home")}
                />
              </div>
              <div className="all_menuHere">
                <ul className="MenuLinks_here align-items-center  justify-content-center">
                  {/* <li>
                <Link href="/casestudies/Index">
                  Policy and Legal Framework
                </Link>
              </li> 
                  <Link to="/home">
                    <li>Home</li>
                  </Link>
                </ul>
              </div>
            </div>
          </div> */}
          <div className="col-12">
            <Container maxW={"5xl"}>
              <Stack
                as={Box}
                textAlign={"center"}
                spacing={{ md: 14 }}
              // py={{ base: 20 }}
              >
                <div style={defaultStyle}>
                  <AnimatePresence>

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
                        About the Knowledge Kit
                      </SplitText>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <Text color={"white"} textAlign={"justify"} lineHeight={"180%"}>
                  The Protected Area (PA) resource book, originally published by Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ) in 2021, serves as a comprehensive overview for professionals engaged in capacity development within the realm of protected area governance and management. It was designed to guide readers through the extensive array of existing knowledge products, offering inspiration through the presentation of examples and project experiences. Since its initial publication, several tools and guidelines have been updated, and new publications have emerged.
                  The PA resource book has been thoroughly updated and transformed into an innovative offline knowledge product in response to these advancements. This update was carried out in collaboration with the IUCN Asia Regional Office (ARO), the IUCN Regional Office for West Asia (ROWA), and the Asia Protected Area Partnership (APAP). The updated version is meticulously crafted to address the evolving needs of Protected and Conserved Areas (PCA) practitioners, managers, and researchers. <br />
                  A key enhancement in this updated PA resource book is the integration and mapping of the IUCN Green List Standard 17 Criteria with various knowledge products contained within the PA resource book. This mapping is designed to facilitate practitioners' effective implementation and site assessment. The IUCN Green List provides a global standard for recognising well-managed protected areas that achieve successful conservation outcomes. By aligning the Green List criteria with the diverse tools and guidelines presented in the PA resource book, conservation practitioners are better equipped to apply best practices and assess their sites against internationally recognised benchmarks. This alignment not only enhances the practical utility of the PA resource book, but also supports the broader goals of achieving and maintaining high standards in conservation management across the globe.


                  <br /> <br />
                  <h4 style={{ color: "#5ae6b8" }}>Acknowledgements:</h4>
                  Special thanks go to the many people who have supported and contributed to the preparation of this publication, in particular to Bojan Auhagen, Hans-Ulrich Caspary, Katharina D’Avis, Stefanie Eißing, Lucy Emerton, Lena Fey, Katharina Fietz, Bastian Flury, Carolin Frisch, Dr. Tobias Garstecki, Farina Hoffmann, Kirsten Hegener, Svenja Horstmann, Oemar Idoe, Heinz-Gerhard Jansen, Dr. Mirjam de Koning, Barbara Lang, Janina Lobmüller, Viviane Meyer, Ralf Peveling, Dr. Stefanie Preuß, Kirsten Probst, Isabel Renner, Paul Scholte, Marie Schoroth, Silke Spohn, Lisa Steurer, Andre Jon Uychiaoco, Carina van Weelden. Sincere thanks to MKS Pasha, Natalia Boulad, and Olivier Chassot for leading the development of this knowledge kit.
                  <br /><br />
                  <h4 style={{ color: "#5ae6b8" }}> Project Ideation and Lead:</h4> 
                  M.K.S. Pasha - IUCN Asia Regional Office <br /> <br />
                  <h4 style={{ color: "#5ae6b8" }}>Project Team: </h4>
                  <b>IUCN:</b> MKS Pasha, Natalia Boulad, and Olivier Chassot <br />
                  <b>GIZ:</b> Carolin Frisch, Viviane Meyer, Katharina Fietz, and Barbara Lang <br /><br />
                  <h4 style={{ color: "#5ae6b8" }}>Disclaimer:  </h4>
                  This knowledge product is an updated version of the GIZ publication “Protected Area Governance and Management—A resource book for practitioners in development cooperation,” published in 2021. The publication as an online and offline application was made possible by the IUCN-Asia Regional Office (ARO) and Regional Office for West Asia (ROWA). <br /><br />

                  <span >PCA  Knowledge Kit – version 2.0.2025</span> 
                 

                  {/* <Footer /> */}
                </Text>
                {/* <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Button
              colorScheme={'green'}
              bg={'green.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'green.500',
              }}>
              Get Started
            </Button>
            <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
              Learn more
            </Button>
            <Box>
              <Icon
                as={Arrow}
                color={useColorModeValue('gray.800', 'gray.300')}
                w={71}
                position={'absolute'}
                right={-71}
                top={'10px'}
              />
              <Text
                fontSize={'lg'}
                fontFamily={'Caveat'}
                position={'absolute'}
                right={'-125px'}
                top={'-15px'}
                transform={'rotate(10deg)'}>
                Starting at $15/mo
              </Text>
            </Box>
          </Stack> */}
              </Stack>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}

const Arrow = createIcon({
  displayName: "Arrow",
  viewBox: "0 0 72 24",
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
});
