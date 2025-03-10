"use client";

import { ChevronDown } from "lucide";
import { forwardRef, useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  dropdownClassName?: string;
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = "Select an option",
      disabled = false,
      error,
      className,
      dropdownClassName,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | undefined>(
      value
    );
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Update internal state when value prop changes
    useEffect(() => {
      setSelectedValue(value);
    }, [value]);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleSelect = (option: DropdownOption) => {
      if (option.disabled) return;

      setSelectedValue(option.value);
      onChange?.(option.value);
      setIsOpen(false);
    };

    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );

    return (
      <div className="relative" ref={dropdownRef}>
        <div
          ref={ref}
          className={cn(
            "flex items-center justify-between px-4 py-2 border rounded-md cursor-pointer transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
            disabled && "opacity-50 cursor-not-allowed bg-gray-100",
            error && "border-red-500",
            isOpen ? "border-blue-500" : "border-gray-300",
            className
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              !disabled && setIsOpen(!isOpen);
            }
          }}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-disabled={disabled}
        >
          <span className={!selectedValue ? "text-gray-500" : ""}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isOpen && "transform rotate-180"
            )}
          />
        </div>

        {isOpen && (
          <div
            className={cn(
              "absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto",
              dropdownClassName
            )}
            role="listbox"
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={cn(
                  "px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors",
                  option.disabled && "opacity-50 cursor-not-allowed bg-gray-50",
                  selectedValue === option.value && "bg-blue-50 text-blue-700"
                )}
                onClick={() => handleSelect(option)}
                role="option"
                aria-selected={selectedValue === option.value}
                tabIndex={option.disabled ? -1 : 0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect(option);
                  }
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}

        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";
