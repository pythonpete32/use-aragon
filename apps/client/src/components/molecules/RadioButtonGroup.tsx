import {
  ButtonGroup,
  ButtonGroupProps,
  ButtonProps,
  useRadioGroup,
  UseRadioProps,
} from "@chakra-ui/react";
import { Children, cloneElement, isValidElement, ReactElement, useMemo } from "react";

interface RadioButtonGroupProps<T>
  extends Omit<ButtonGroupProps, "onChange" | "variant" | "isAttached"> {
  name?: string;
  value?: T;
  defaultValue?: string;
  onChange?: (value: T) => void;
}

export const RadioButtonGroup = <T extends string>(props: RadioButtonGroupProps<T>) => {
  const { children, name, defaultValue, value, onChange, ...rest } = props;
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue,
    value,
    onChange,
  });

  const buttons = useMemo(
    () =>
      Children.toArray(children)
        .filter<ReactElement<RadioButtonProps>>(isValidElement)
        .map((button, index, array) => {
          const isFirstItem = index === 0;
          const isLastItem = array.length === index + 1;

          const styleProps = Object.assign({
            ...(isFirstItem && !isLastItem ? { borderRightRadius: 0 } : {}),
            ...(!isFirstItem && isLastItem ? { borderLeftRadius: 0 } : {}),
            ...(!isFirstItem && !isLastItem ? { borderRadius: 0 } : {}),
            ...(!isLastItem ? { mr: "-px" } : {}),
          });

          return cloneElement(button, {
            ...styleProps,
            radioProps: getRadioProps({
              value: button.props.value,
              disabled: props.isDisabled || button.props.isDisabled,
            }),
          });
        }),
    [children, getRadioProps, props.isDisabled]
  );
  return (
    <ButtonGroup isAttached variant="outline" {...getRootProps(rest)}>
      {buttons}
    </ButtonGroup>
  );
};

export interface RadioButtonProps extends ButtonProps {
  value: string;
  radioProps?: UseRadioProps;
}
