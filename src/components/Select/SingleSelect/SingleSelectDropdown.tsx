import React, { useEffect, useRef, useCallback, useState } from "react";

// CSS
import "../Select.css";

// Types
import { Option } from "../Select";

interface SingleSelectOptionProps {
  options: Option[];
  title: string;
}

function SingleSelectDropdown({ options, title }: SingleSelectOptionProps) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<Boolean>(false);
  const selectOptionsRef = useRef<HTMLDivElement>(null);

  const handleSelectedOption = useCallback(
    (option: Option) =>
      // Handling selected option for single select is more simple since we will just change the selectedOption state value
      setSelectedOption(option),
    [setSelectedOption]
  );

  const toggleDropdownOpen = useCallback(
    () => setIsDropdownOpen((prev) => !prev),
    [setIsDropdownOpen]
  );

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      if (isDropdownOpen && selectOptionsRef.current) {
        if (!selectOptionsRef.current.contains(event.target as Node)) {
          setIsDropdownOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickAway);

    return () => {
      document.removeEventListener("mousedown", handleClickAway);
    };
  }, [isDropdownOpen]);

  return (
    <div className="select-container" ref={selectOptionsRef}>
      <div className="select-control" onClick={toggleDropdownOpen}>
        {selectedOption ? (
          <div className="selected-option-value">{selectedOption.label}</div>
        ) : (
          <div className="select-title">{title}</div>
        )}
        <div className="select-arrow-down"></div>
      </div>
      {isDropdownOpen && (
        <div className="select-options">
          {options.map((option) => {
            return (
              <div
                key={option.value}
                className={`select-option ${
                  selectedOption?.value === option.value ? "selected" : ""
                }`}
                onClick={() => handleSelectedOption(option)}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SingleSelectDropdown;
