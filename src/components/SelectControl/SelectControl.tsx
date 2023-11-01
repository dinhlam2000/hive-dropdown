import { useState } from "react";

// Type
import Select, { SelectOptionsProps } from "../Select/Select";

const Checkbox = ({ children, ...props }: JSX.IntrinsicElements["input"]) => (
  <label style={{ marginRight: "1em" }}>
    <input type="checkbox" {...props} />
    {children}
  </label>
);

interface SelectControlProps
  extends Pick<SelectOptionsProps, "options" | "title" | "isMulti"> {}

function SelectControl({
  options,
  title,
  isMulti = false,
}: SelectControlProps) {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <div>
      <Select
        options={options}
        title={title}
        isMulti={isMulti}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isSearchable={isSearchable}
      />
      <div className="select-control-wrapper">
        <Checkbox
          checked={isClearable}
          onChange={() => setIsClearable((state) => !state)}
        >
          Clearable
        </Checkbox>
        <Checkbox
          checked={isSearchable}
          onChange={() => setIsSearchable((state) => !state)}
        >
          Searchable
        </Checkbox>
        <Checkbox
          checked={isDisabled}
          onChange={() => setIsDisabled((state) => !state)}
        >
          Disabled
        </Checkbox>
      </div>
    </div>
  );
}

export default SelectControl;
