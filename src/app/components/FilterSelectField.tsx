"use client";

import { SelectField, type SelectFieldProps } from "./SelectField";

interface FilterSelectFieldProps extends Omit<SelectFieldProps, 'options'> {
  options: string[];
  filterType: 'degree' | 'city' | 'specialty' | 'experience';
  showCount?: boolean;
  allowMultiple?: boolean;
}

export const FilterSelectField = ({
  options,
  filterType,
  showCount = false,
  allowMultiple = false,
  placeholder,
  id,
  name,
  value,
  onChange,
  ...selectProps
}: FilterSelectFieldProps) => {
  const getFilterLabel = (type: string) => {
    switch (type) {
      case 'degree':
        return 'Degrees';
      case 'city':
        return 'Cities';
      case 'specialty':
        return 'Specialties';
      case 'experience':
        return 'Experience';
      default:
        return 'Options';
    }
  };

  const selectOptions = options.map(option => ({
    value: option,
    label: showCount ? `${option} (${options.length})` : option
  }));

  const finalPlaceholder = placeholder || `All ${getFilterLabel(filterType)}`;

  return (
    <div className="relative">
      <SelectField
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        {...selectProps}
        options={selectOptions}
        placeholder={finalPlaceholder}
        aria-label={`Filter by ${getFilterLabel(filterType).toLowerCase()}`}
      />
      {allowMultiple && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      )}
    </div>
  );
};
