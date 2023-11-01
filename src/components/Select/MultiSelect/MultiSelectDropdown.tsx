import { useRef, useEffect, useCallback, useState } from "react";
import { SelectOptionsProps } from "../Select";
// CSS
import "./MultiSelectDropdown.css";
import "../Select.css";

// Types
import { Option } from "../Select";

interface MultiSelectOptionProps
  extends Required<Omit<SelectOptionsProps, "isMulti">> {}

function MultiSelectDropdown({
  options,
  title,
  isSearchable,
  isClearable,
  isDisabled,
}: MultiSelectOptionProps) {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<Boolean>(false);
  const selectOptionsRef = useRef<HTMLDivElement>(null);

  const removeSelectedOption = useCallback(
    (option: Option) => {
      setSelectedOptions((prevOptions) =>
        prevOptions.filter(
          (selectedOption) => selectedOption.value !== option.value
        )
      );
    },
    [setSelectedOptions]
  );

  const handleSelectedOption = useCallback(
    (option: Option) => {
      setSelectedOptions((prevOptions) => {
        let newOptions: Option[] = [];
        // If option has not been selected, then we add it into our selectedOptions list
        if (
          !prevOptions.find(
            (selectedOption) => selectedOption.value === option.value
          )
        ) {
          newOptions = [...prevOptions, option];
        }
        // If option has already been selected, we want to deselect it by removing from the selectedOptions list
        else {
          newOptions = prevOptions.filter(
            (selectedOption) => selectedOption.value !== option.value
          );
        }
        return newOptions;
      });
    },
    [setSelectedOptions, removeSelectedOption]
  );

  const toggleDropdownOpen = useCallback(
    () => setIsDropdownOpen((prev) => !prev),
    [setIsDropdownOpen]
  );

  const handleSelectAll = useCallback(
    () =>
      setSelectedOptions((prevOptions) => {
        let newOptions: Option[] = [];
        if (prevOptions.length === options.length) {
          newOptions = [];
        } else {
          newOptions = options;
        }
        return newOptions;
      }),
    [setSelectedOptions]
  );

  const handleClearAll = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      setSelectedOptions([]);
    },
    [setSelectedOptions]
  );

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      if (isDropdownOpen && selectOptionsRef.current) {
        console.log("handleClickAway click away");
        if (!selectOptionsRef.current.contains(event.target as Node)) {
          setIsDropdownOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickAway);

    return () => {
      document.removeEventListener("mousedown", handleClickAway);
    };
  }, [setIsDropdownOpen, isDropdownOpen]);

  return (
    <div className="select-container" ref={selectOptionsRef}>
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
        <div className="select-symbol">
          {isClearable && selectedOptions.length > 0 ? (
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
