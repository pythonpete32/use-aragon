import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  FormErrorMessage,
  Tooltip,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";

/**
 * @typedef ValidatedSliderProps
 * @property {Object} control - The control object from react-hook-form.
 * @property {Object} error - The error object from react-hook-form.
 * @property {string} name - The name attribute for the slider element.
 * @property {string} label - The label text for the slider element.
 * @property {string} period - The period of the slider.
 * @property {number} min - The minimum value for the slider.
 * @property {number} max - The maximum value for the slider.
 * @property {number} step - The step value for the slider.
 * @property {number} defaultValue - The default value for the slider.
 * @property {[x: string]: any} [x] - Any additional props to be passed to the slider element.
 */

interface ValidatedSliderProps {
  control: any;
  error: any;
  name: string;
  label: string;
  period?: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  [x: string]: any;
}

/**
 * ValidatedSlider is a reusable component for validated slider fields in forms.
 * It integrates with react-hook-form for form state management and validation.
 *
 * @param {ValidatedSliderProps} props - The properties for the ValidatedSlider component.
 * @returns {JSX.Element} A FormControl component with a Slider, Label, and FormErrorMessage.
 */
export const ValidatedSlider: React.FC<ValidatedSliderProps> = ({
  control,
  error,
  name,
  label,
  period = "days",
  min,
  max,
  step,
  defaultValue,
  ...rest
}: ValidatedSliderProps): JSX.Element => {
  const [sliderValue, setSliderValue] = useState(defaultValue);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Controller
        render={({ field }) => (
          <Slider
            {...field}
            {...rest}
            min={min}
            max={max}
            step={step}
            aria-label={`${label} slider`}
            onChange={(val) => {
              setSliderValue(val);
              field.onChange(val);
            }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              label={`${sliderValue} ${period}`}
              placement="top"
              isOpen={showTooltip}
              hasArrow
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
      <FormErrorMessage>{error?.message?.toString()}</FormErrorMessage>
    </FormControl>
  );
};
