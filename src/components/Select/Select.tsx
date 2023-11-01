// Components
import MultiSelectDropdown from "./MultiSelect/MultiSelectDropdown";
import SingleSelectDropdown from "./SingleSelect/SingleSelectDropdown";

export interface Option {
  value: string;
  label: string;
}

export interface SelectOptionsProps {
  options: Option[];
  title: string;
  isMulti?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;
}

function Select({
  options,
  title,
  isMulti = false,
  isSearchable = false,
  isClearable = false,
  isDisabled = false,
}: SelectOptionsProps) {
  return (
    <div className="select-wrapper">
      {isMulti ? (
        <MultiSelectDropdown
          options={options}
          title={title}
          isClearable={isClearable}
          isSearchable={isSearchable}
          isDisabled={isDisabled}
        />
      ) : (
        <SingleSelectDropdown
          options={options}
          title={title}
          isClearable={isClearable}
          isSearchable={isSearchable}
          isDisabled={isDisabled}
        />
      )}
    </div>
  );
}

export default Select;
