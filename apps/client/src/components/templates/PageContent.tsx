import { Box, Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";

export enum Variant {
  "PRIMARY" = "primary",
  "SECONDARY" = "secondary",
}

interface CTAButtonProps {
  label: string;
  variant: Variant;
  icon?: any;
  onClick?: () => void;
}

interface PageContentProps {
  title: string;
  subtitle?: string;
  ctaButtons?: CTAButtonProps[];
  content?: any;
}

export const PageContent = ({ title, subtitle, ctaButtons = [], content }: PageContentProps) => {
  return (
    <>
      <Stack
        spacing="4"
        direction={{ base: "column", lg: "row" }}
        justify="space-between"
        align={{ base: "start", lg: "center" }}
      >
        <Stack spacing="1">
          <Heading size={{ base: "xs", lg: "sm" }} fontWeight="medium">
            {title}
          </Heading>
          <Text color="muted">{subtitle}</Text>
        </Stack>
        <HStack spacing="3">
          {ctaButtons?.map((button) => (
            <Button
              key={button.label}
              variant={button.variant}
              onClick={button.onClick}
              leftIcon={button.icon ? button.icon : undefined}
            >
              {button.label}
            </Button>
          ))}
        </HStack>
      </Stack>
      {content ? (
        content
      ) : (
        <Box bg="bg-surface" borderRadius="lg" borderWidth="1px" height="full" />
      )}
    </>
  );
};
