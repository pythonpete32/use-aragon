import { Box, Flex, FlexProps, HStack, Img, Skeleton, useMenuButton } from "@chakra-ui/react";
import { HiSelector } from "react-icons/hi";
import { useRouter } from "next/router";
import { useFetchDao } from "use-aragon";
import { ipfsUriToUrl } from "../../lib/ipfsUriToUrl";

export const DaoSwitcherButton = (props: FlexProps) => {
  const buttonProps = useMenuButton(props);
  const router = useRouter();
  const { dao: daoAddress } = router.query;
  const { data: dao } = useFetchDao(daoAddress as string);

  return (
    <Skeleton isLoaded={!!dao}>
      <Flex
        as="button"
        {...buttonProps}
        w="full"
        display="flex"
        alignItems="center"
        rounded="lg"
        bg="gray.700"
        px="3"
        py="2"
        fontSize="sm"
        userSelect="none"
        cursor="pointer"
        outline="0"
        transition="all 0.2s"
        _active={{ bg: "gray.600" }}
        _focus={{ shadow: "outline" }}
      >
        <HStack flex="1" spacing="3">
          <Img
            w="8"
            h="8"
            rounded="md"
            objectFit="cover"
            src={
              dao?.metadata?.avatar
                ? ipfsUriToUrl(dao?.metadata?.avatar)
                : `https://api.dicebear.com/5.x/identicon/svg?seed=${dao?.address}`
            }
            alt={dao?.metadata.name}
          />
          <Box textAlign="start">
            <Box noOfLines={1} fontWeight="semibold">
              {dao?.metadata.name}
            </Box>
            <Box fontSize="xs" color="gray.400">
              {dao?.ensDomain}
            </Box>
          </Box>
        </HStack>
        <Box fontSize="lg" color="gray.400">
          <HiSelector />
        </Box>
      </Flex>
    </Skeleton>
  );
};
