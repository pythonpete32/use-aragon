import React from "react";
import { FormControl, FormLabel, Textarea, FormErrorMessage } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

/**
 * @typedef ValidatedTextareaProps
 * @property {Object} control - The control object from react-hook-form.
 * @property {Object} error - The error object from react-hook-form.
 * @property {string} name - The name attribute for the textarea element.
 * @property {string} label - The label text for the textarea element.
 * @property {[x: string]: any} [x] - Any additional props to be passed to the textarea element.
 */

interface ValidatedTextareaProps {
  control: any;
  error: any;
  name: string;
  label: string;
  [x: string]: any;
}

/**
 * ValidatedTextarea is a reusable component for validated textarea fields in forms.
 * It integrates with react-hook-form for form state management and validation.
 *
 * @param {ValidatedTextareaProps} props - The properties for the ValidatedTextarea component.
 * @returns {JSX.Element} A FormControl component with a Textarea, Label, and FormErrorMessage.
 */
export const ValidatedTextarea: React.FC<ValidatedTextareaProps> = ({
  control,
  error,
  name,
  label,
  ...rest
}) => (
  <FormControl isInvalid={!!error}>
    <FormLabel htmlFor={name}>{label}</FormLabel>
    <Controller
      render={({ field }) => <Textarea {...field} {...rest} />}
      name={name}
      control={control}
    />
    {error?.message && <FormErrorMessage>{error?.message.toString()}</FormErrorMessage>}
  </FormControl>
);
