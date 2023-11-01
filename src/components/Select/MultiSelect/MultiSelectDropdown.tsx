import { useRef, useEffect, useCallback, useState } from "react";
import { SelectOptionsProps } from "../Select";
// CSS
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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const selectOptionsRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleSearchInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
      setIsDropdownOpen(true);
    },
    [setSearchTerm, setIsDropdownOpen]
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
        setSearchTerm("");
        console.log("optiopn", option, newOptions);
        return newOptions;
      });
    },
    [setSelectedOptions, removeSelectedOption, setSearchTerm]
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
        if (!selectOptionsRef.current.contains(event.target as Node)) {
          setSearchTerm("");
          setIsDropdownOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickAway);

    return () => {
      document.removeEventListener("mousedown", handleClickAway);
    };
  }, [setIsDropdownOpen, isDropdownOpen, setSearchTerm]);

  return (
    <div
      className={`select-container ${
        isDisabled ? "select-container-disabled " : ""
      }`}
      ref={selectOptionsRef}
    >
      <div
        className={`select-control ${
          isDropdownOpen ? "select-control-focus" : ""
        }`}
        onClick={toggleDropdownOpen}
      >
        {selectedOptions.length === 0 && searchTerm.length === 0 ? (
          <div className="select-title">{title}</div>
        ) : null}

        <div className="selected-options-container">
          {selectedOptions.map((option) => {
            return (
              <div
                key={"selected-option-" + option.value}
                className={`selected-option-value selected-option-value-multiple`}
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
          {isSearchable && (
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              className="select-search"
            />
          )}
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
          {searchTerm === "" && (
            <label className={`select-option`}>
              <input
                type="checkbox"
                value={"select-all"}
                checked={selectedOptions.length === options.length}
                onChange={() => handleSelectAll()}
              />
              Select All
            </label>
          )}

          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => {
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
            })
          ) : (
            <label className="select-option select-option-no-option">
              No options
            </label>
          )}
        </div>
      )}
    </div>
  );
}

export default MultiSelectDropdown;
