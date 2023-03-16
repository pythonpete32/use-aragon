import { As, Button, ButtonProps, HStack, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface NavButtonProps extends ButtonProps {
  icon: As;
  label: string;
  href: string;
  current: boolean;
}

export const NavButton = (props: NavButtonProps) => {
  const { icon, label, href, current, ...buttonProps } = props;

  const router = useRouter();
  const handleClick = (event: any) => {
    event.preventDefault();
    router.push(href);
  };

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      justifyContent="start"
      aria-current={current ? "page" : undefined}
      {...buttonProps}
    >
      <HStack spacing="3">
        <Icon as={icon} boxSize="6" color="subtle" />
        <Text>{label}</Text>
      </HStack>
    </Button>
  );
};
