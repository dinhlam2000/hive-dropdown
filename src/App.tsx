// Components
import SelectControl from "./components/SelectControl/SelectControl";

// CSS
import "./App.css";

// Constants
import { options as MultiSelectOption } from "./constants/MultiSelectOptions";

function App() {
  return (
    <div className="wrapper">
      <h3 className="title-break">Single</h3>
      <SelectControl
        options={MultiSelectOption}
        title="Select your celebrities"
      />

      <h3 className="title-break">Multiple</h3>
      <SelectControl
        options={MultiSelectOption}
        title="Select your celebrities"
        isMulti
      />
    </div>
  );
}

export default App;
