// Components
import SelectControl from "./components/SelectControl/SelectControl";
import Tabs, { Tab } from "./components/Tabs/Tabs";

// CSS
import "./App.css";

// Constants
import { options as MultiSelectOption } from "./constants/MultiSelectOptions";

function App() {
  // const tabItems: Tab[] = [
  //   {
  //     title: "Multiple Selected Option Tab",
  //     content: (
  //       <Select
  //         options={MultiSelectOption}
  //         title="Select your celebrities"
  //         isMulti
  //       />
  //     ),
  //   },
  //   {
  //     title: "Single Selected Option Tab",
  //     content: (
  //       <Select
  //         options={MultiSelectOption}
  //         title="Select your favorite celebrity"
  //       />
  //     ),
  //   },
  // ];
  return (
    <div className="wrapper">
      <h1>Single</h1>
      <SelectControl
        options={MultiSelectOption}
        title="Select your celebrities"
      />

      <h1>Multiple</h1>
      <SelectControl
        options={MultiSelectOption}
        title="Select your celebrities"
        isMulti
      />
    </div>
  );
}

export default App;
