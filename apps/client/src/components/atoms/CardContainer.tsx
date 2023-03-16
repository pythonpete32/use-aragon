import { Box, Stack, BoxProps, StackProps } from "@chakra-ui/react";
import Link from "next/link";

interface CardContainerProps extends BoxProps {
  stackProps?: StackProps;
  isHoverable?: boolean;
  href?: string;
}

export const CardContainer: React.FC<CardContainerProps> = ({
  children,
  stackProps,
  isHoverable = false,
  href,
  ...boxProps
}) => {
  const content = (
    <Box
      bg="bg-surface"
      borderRadius="lg"
      boxShadow="sm"
      p={{ base: "3", md: "6" }}
      _hover={
        isHoverable
          ? {
              boxShadow: "md",
              borderColor: "whiteAlpha.200",
              borderWidth: "1px",
              transition: "all 0.2s",
            }
          : undefined
      }
      {...boxProps}
    >
      <Stack spacing={{ base: "5", md: "6" }} {...stackProps}>
        {children}
      </Stack>
    </Box>
  );

  return href ? (
    <Link href={href} passHref>
      <Box as="a" display="block">
        {content}
      </Box>
    </Link>
  ) : (
    content
  );
};
