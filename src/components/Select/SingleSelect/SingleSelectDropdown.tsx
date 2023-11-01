import React, { useEffect, useRef, useCallback, useState } from "react";
import { SelectOptionsProps } from "../Select";

// CSS
import "../Select.css";

// Types
import { Option } from "../Select";

interface SingleSelectOptionProps
  extends Required<Omit<SelectOptionsProps, "isMulti">> {}

function SingleSelectDropdown({
  options,
  title,
  isSearchable,
  isClearable,
  isDisabled,
}: SingleSelectOptionProps) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<Boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const selectOptionsRef = useRef<HTMLDivElement>(null);

  const handleSearchInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
      setIsDropdownOpen(true);
    },
    [setSearchTerm, setIsDropdownOpen]
  );

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
      setSearchTerm("");
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
  }, [setIsDropdownOpen, isDropdownOpen, setSearchTerm]);

  const handleClearAll = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      setSelectedOption(null);
    },
    [setSelectedOption]
  );

  return (
    <div
      className={`select-container ${
        isDisabled ? "select-container-disabled " : ""
      }`}
      ref={selectOptionsRef}
    >
      <div className="select-control" onClick={toggleDropdownOpen}>
        {selectedOption ? (
          <div className="selected-option-value">{selectedOption.label}</div>
        ) : (
          !searchTerm.length && <div className="select-title">{title}</div>
        )}
        {isSearchable && (
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchInputChange}
            className="select-search"
          />
        )}
        <div className="select-symbol">
          {isClearable && selectedOption ? (
            <span
              className="select-clear"
              onClick={(e) => handleClearAll(e as unknown as MouseEvent)}
            >
              ×
            </span>
          ) : null}
          <span className="select-arrow-down"></span>
        </div>
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
