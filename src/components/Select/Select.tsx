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
}

function Select({ options, title, isMulti = false }: SelectOptionsProps) {
  return (
    <div className="select-wrapper">
      {isMulti ? (
        <MultiSelectDropdown options={options} title={title} />
      ) : (
        <SingleSelectDropdown options={options} title={title} />
      )}
    </div>
  );
}

export default Select;
