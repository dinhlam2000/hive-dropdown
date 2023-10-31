import { useState } from "react";

// CSS
import "./MultiSelectDropdown.css";
import "../Select.css";

// Types
import { Option } from "../Select";

interface MultiSelectOptionProps {
  options: Option[];
  title: string;
}

function MultiSelectDropdown({ options, title }: MultiSelectOptionProps) {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [isOptionsOpen, setIsOptionsOpen] = useState<Boolean>(false);

  const handleSelectedOption = (option: Option) => {
    // If option has not been selected, then we add it into our selectedOptions list
    if (
      !selectedOptions.find(
        (selectedOption) => selectedOption.value === option.value
      )
    ) {
      setSelectedOptions([...selectedOptions, option]);
    }
    // If option has already been selected, we want to deselect it by removing from the selectedOptions list
    else {
      removeSelectedOption(option);
    }
  };

  const toggleDropdownOpen = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const handleSelectAll = () => {
    if (selectedOptions.length === options.length) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions(options);
    }
  };

  const removeSelectedOption = (option: Option) => {
    setSelectedOptions(
      selectedOptions.filter(
        (selectedOption) => selectedOption.value !== option.value
      )
    );
  };

  return (
    <div className="select-container">
      <div className="select-control" onClick={toggleDropdownOpen}>
        {selectedOptions.length === 0 ? (
          <div className="title">{title}</div>
        ) : null}

        <div className="selected-options-container">
          {selectedOptions.map((option) => {
            return (
              <div
                key={"selected-option-" + option.value}
                className="selected-option-value"
              >
                {option.label}
                <span
                  className="remove-option"
                  onClick={() => removeSelectedOption(option)}
                >
                  ×
                </span>
              </div>
            );
          })}
        </div>
        <div className="select-arrow-down"></div>
      </div>
      {isOptionsOpen && (
        <div className="select-options">
          <label className={`select-option`}>
            <input
              type="checkbox"
              value={"select-all"}
              checked={selectedOptions.length === options.length}
              onChange={() => handleSelectAll()}
            />
            Select All
          </label>
          {options.map((option) => {
            return (
              <label
                key={option.value}
                className={`select-option ${
                  selectedOptions.find(
                    (selectedOption) => selectedOption.value === option.value
                  )
                    ? "selected"
                    : ""
                }`}
              >
                <input
                  type="checkbox"
                  value={option.value}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleSelectedOption(option)}
                />
                {option.label}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MultiSelectDropdown;
