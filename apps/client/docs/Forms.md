# Creating New Forms and Validated Components with Zod and Chakra UI

This documentation will guide you through the process of creating new forms using the provided reusable ValidatedInput, ValidatedTextarea, and ValidatedSlider components with Zod for validation. Additionally, it will demonstrate how to create new validated components for use in forms.

## Creating a New Form

To create a new form, you'll need to use react-hook-form for form state management, Zod for validation, and Chakra UI for styling. Start by importing the necessary components and libraries:

```typescript
import React from "react";
import { useForm } from "react-hook-form";
import { ZodSchema, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack } from "@chakra-ui/react";
import ValidatedInput from "./components/ValidatedInput";
import ValidatedTextarea from "./components/ValidatedTextarea";
import ValidatedSlider from "./components/ValidatedSlider";
```

Now, define a Zod schema for form validation:

```typescript
const FormSchema: ZodSchema = z.object({
  title: z.string().min(1, "Title is required"),
  summary: z.string().min(1, "Summary is required"),
  // Add more validation rules as needed
});
```

Infer the type of the form data from the schema:

```typescript
type FormData = z.infer<typeof FormSchema>;
```

Create a new form component:

```typescript
const MyForm: React.FC<{ id: string }> = ({ id }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: FormData) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <Box as="form" id={id} py={{ base: "0", sm: "8" }} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing="8">
        <ValidatedInput control={control} error={errors.title} name="title" label="Title" />
        <ValidatedTextarea
          control={control}
          error={errors.summary}
          name="summary"
          label="Summary"
        />
        // Add more form fields using the reusable components as needed
      </Stack>
    </Box>
  );
};

export default MyForm;
```

## Creating New Validated Components

When creating a new validated component, start by importing the necessary components from @chakra-ui/react and react-hook-form:

```typescript
import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  // Import other Chakra UI components as needed
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
```

Define a TypeScript interface for the component's props:

```typescript
interface ValidatedNewComponentProps {
  control: any;
  error: any;
  name: string;
  label: string;
  // Add other required props for the component
  [x: string]: any;
}
```

Create the component, integrating it with react-hook-form:

```js
const ValidatedNewComponent: React.FC<ValidatedNewComponentProps> = ({
  control,
  error,
  name,
  label,
  // Add other required props
  ...rest
}) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Controller
        render={({ field }) => (
          // Replace this with the desired Chakra UI component
          <YourChakraUIComponent {...field} {...rest} />
        )}
        name={name}
        control={control}
        // Add other necessary props for the Controller component
      />
      <FormErrorMessage>{error?.message?.toString()}</FormErrorMessage>
    </FormControl>
  );
};

export default ValidatedNewComponent;
```

Lastly, add JSDoc comments to document the component's props and usage:

```ts
/**
 * ValidatedNewComponent is a reusable form component that integrates with react-hook-form
 * and Chakra UI for styling. It can be used in any form requiring validation.
 *
 * @component
 * @example
 * <ValidatedNewComponent
 *   control={control}
 *   error={errors.example}
 *   name="example"
 *   label="Example Label"
 *   // Add any other required props for the Chakra UI component
 * />
 */
```

Now you can use the new validated component in your form, just like you did with `ValidatedInput`, `ValidatedTextarea`, and `ValidatedSlider.` Remember to include the new field in the Zod schema for proper validation.

With these steps, you should be able to create new forms and validated components using Zod for validation and Chakra UI for styling.
