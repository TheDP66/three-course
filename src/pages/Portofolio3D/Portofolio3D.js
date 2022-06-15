import { Container, Box, Heading } from "@chakra-ui/react";
import Main from "../../components/P3D/layouts/main";

const Portofolio3D = () => {
  return (
    <Container>
      <Main />
      <Box borderRadius="lg" bg="red" p={3} mb={6} align="center">
        Hello, I&apos;m a full-stack developer based in Indonesia
      </Box>
      <Box display={{ md: "flex" }}>
        <Box flexGrow={1}></Box>
        <Heading as="h2" variant="page-title">
          Dharma Putra
        </Heading>
        <p>Digital Craftzman ( Artist / Developer / Designer )</p>
      </Box>
    </Container>
  );
};

export default Portofolio3D;
