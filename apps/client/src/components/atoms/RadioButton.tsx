import { Box, Button, useId, useRadio } from "@chakra-ui/react";
import { RadioButtonProps } from "../molecules/RadioButtonGroup";

export const RadioButton = (props: RadioButtonProps) => {
  const { radioProps, ...rest } = props;
  const { getInputProps, getCheckboxProps, getLabelProps } = useRadio(radioProps);
  const id = useId(undefined, "radio-button");

  const inputProps = getInputProps();
  const checkboxProps = getCheckboxProps();
  const labelProps = getLabelProps();

  return (
    <Box
      as="label"
      cursor="pointer"
      {...labelProps}
      sx={{
        ".focus-visible + [data-focus]": {
          boxShadow: "outline",
          zIndex: 1,
        },
      }}
    >
      <input {...inputProps} aria-labelledby={id} />
      <Button id={id} as="div" _focus={{ boxShadow: "none" }} {...checkboxProps} {...rest} />
    </Box>
  );
};
