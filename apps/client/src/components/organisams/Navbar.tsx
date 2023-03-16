import { Box, Drawer, DrawerContent, DrawerOverlay, Flex, useDisclosure } from "@chakra-ui/react";
import { Sidebar } from "./Sidebar";
import { ToggleButton } from "../atoms/ToggleButton";
import { DaoSwitcher } from "../molecules/DaoSwitcher";

export const Navbar = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  return (
    <Box width="full" py="4" px={{ base: "4", md: "8" }} bg="bg-surface" boxShadow="sm">
      <Flex justify="space-between">
        <ToggleButton isOpen={isOpen} aria-label="Open Menu" onClick={onToggle} />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          isFullHeight
          preserveScrollBarGap
          // Set the trapFocus prop to a boolean value
          trapFocus={false}
        >
          <DrawerOverlay />
          <DrawerContent>
            <Sidebar />
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
};
