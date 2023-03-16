import { Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FiSearch } from "react-icons/fi";
import { NavButton } from "../atoms/NavButton";
import { useRouter } from "next/router";
import { routes } from "../../constants/routes";
import { DaoSwitcher } from "./DaoSwitcher";

export function Navigation() {
  const router = useRouter();
  const { dao: daoAddress } = router.query;

  return (
    <>
      <Stack spacing={{ base: "5", sm: "6" }} shouldWrapChildren>
        <DaoSwitcher />
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="muted" boxSize="5" />
          </InputLeftElement>
          <Input placeholder="Search" />
        </InputGroup>
        <Stack spacing="1">
          {routes.map(
            (button, index) =>
              button.app && (
                <NavButton
                  key={index}
                  label={button.label}
                  icon={button.icon}
                  href={`/${daoAddress}/${button.href}`}
                  current={router.route === button.href}
                />
              )
          )}
        </Stack>
      </Stack>
      <Stack spacing={{ base: "5", sm: "6" }}>
        <Stack spacing="1" pb={5}>
          {routes.map(
            (button, index) =>
              !button.app && (
                <NavButton
                  key={index}
                  label={button.label}
                  icon={button.icon}
                  href={button.href}
                  current={router.route === button.href}
                />
              )
          )}
        </Stack>
        <ConnectButton chainStatus={"icon"} showBalance={false} />
      </Stack>
    </>
  );
}
