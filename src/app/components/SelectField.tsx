"use client";

import { forwardRef } from "react";

interface SelectOption {
  value: string;
  label: string;
}

export interface SelectFieldProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  "aria-label"?: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    {
      id,
      name,
      value,
      onChange,
      options,
      placeholder = "Select an option",
      className = "",
      disabled = false,
      required = false,
      "aria-label": ariaLabel,
    },
    ref
  ) => {
    const baseClasses = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#285e50] focus:border-transparent";
    const disabledClasses = disabled ? "bg-gray-100 cursor-not-allowed" : "";
    const combinedClasses = `${baseClasses} ${disabledClasses} ${className}`.trim();

    return (
      <select
        ref={ref}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        aria-label={ariaLabel}
        className={combinedClasses}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

SelectField.displayName = "SelectField";
