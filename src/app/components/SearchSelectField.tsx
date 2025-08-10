"use client";

import { SelectField, type SelectFieldProps } from "./SelectField";

interface SearchSelectFieldProps extends Omit<SelectFieldProps, 'options'> {
  options: string[];
  allOptionsLabel?: string;
}

export const SearchSelectField = ({
  options,
  allOptionsLabel = "All",
  placeholder,
  id,
  name,
  value,
  onChange,
  ...selectProps
}: SearchSelectFieldProps) => {
  const selectOptions = options.map(option => ({
    value: option,
    label: option
  }));

  const finalPlaceholder = placeholder || `All ${name === 'degree' ? 'Degrees' : 'Cities'}`;

  return (
    <SelectField
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      {...selectProps}
      options={selectOptions}
      placeholder={finalPlaceholder}
    />
  );
};
