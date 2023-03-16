import { Box, Container, Flex, Stack, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { Draw } from "../organisams/Draw";
import { Navbar } from "../organisams/Navbar";
import { Sidebar } from "../organisams/Sidebar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <Flex
      as="section"
      direction={{ base: "column", lg: "row" }}
      height="100vh"
      bg="bg-canvas"
      overflowY="auto"
    >
      {isDesktop ? <Sidebar /> : <Navbar />}
      <Box bg="bg-surface" pt={{ base: "0", lg: "3" }} flex="1">
        <Box bg="bg-canvas" borderTopLeftRadius={{ base: "none", lg: "2rem" }} height="full">
          <Container py="8" height="full">
            <Stack spacing={{ base: "8", lg: "6" }} height="full">
              {children}
            </Stack>
          </Container>
        </Box>
      </Box>
      <Draw />
    </Flex>
  );
};
