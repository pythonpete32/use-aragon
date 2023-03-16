import React from "react";
import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

/**
 * @typedef ValidatedInputProps
 * @property {Object} control - The control object from react-hook-form.
 * @property {Object} error - The error object from react-hook-form.
 * @property {string} name - The name attribute for the input element.
 * @property {string} label - The label text for the input element.
 * @property {[x: string]: any} [x] - Any additional props to be passed to the input element.
 */
interface ValidatedInputProps {
  control: any;
  error: any;
  name: string;
  label: string;
  defaultValue?: string;
  [x: string]: any;
}

/**
 * ValidatedInput is a reusable component for validated input fields in forms.
 * It integrates with react-hook-form for form state management and validation.
 *
 * @param {ValidatedInputProps} props - The properties for the ValidatedInput component.
 * @returns {JSX.Element} A FormControl component with an Input, Label, and FormErrorMessage.
 */
export const ValidatedInput = ({
  control,
  error,
  name,
  label,
  defaultValue = "",
  ...rest
}: ValidatedInputProps): JSX.Element => (
  <FormControl isInvalid={!!error}>
    <FormLabel htmlFor={name}>{label}</FormLabel>
    <Controller
      render={({ field }) => <Input {...field} {...rest} />}
      name={name}
      control={control}
      defaultValue={defaultValue}
    />
    {error?.message && <FormErrorMessage>{error?.message.toString()}</FormErrorMessage>}
  </FormControl>
);
