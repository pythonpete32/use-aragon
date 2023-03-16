import {
  Menu,
  MenuDivider,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { DaoSwitcherButton } from "../atoms/DaoSwitcherButton";
import { useRouter } from "next/router";
import { useStore } from "../../constants/store";

export const DaoSwitcher = () => {
  const router = useRouter();
  const { daoList, reset } = useStore();

  const handleSelect = (value: string) => {
    const dao = daoList.find((dao) => dao.address === value);
    if (dao) {
      router.push(`/${dao.address}`);
    }
  };

  return (
    <Menu>
      <DaoSwitcherButton />
      <MenuList shadow="lg" py="4" color={useColorModeValue("gray.600", "gray.200")} px="3">
        <Text fontWeight="medium" mb="2">
          Saved DAOs
        </Text>
        <MenuOptionGroup
          defaultValue="0x6f07aa7af27e0e06a08a1a17e04c4b0eb11300ab"
          onChange={handleSelect}
        >
          {daoList.map((dao) => (
            <MenuItemOption
              key={dao.address}
              value={dao.address}
              fontWeight="semibold"
              rounded="md"
            >
              {dao.metadata.name}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
        <MenuDivider />
        <MenuItem rounded="md" onClick={reset}>
          Clear
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
