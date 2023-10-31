import React, { useState } from "react";

// CSS
import "./Tabs.css";

export interface Tab {
  title: string;
  content: React.ReactNode; // Content of tab can be any other component, but we will use it for rendering the Dropdown Components
}
interface TabsProps {
  items: Tab[];
}

function Tabs({ items }: TabsProps) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0); // Originally set selected tab to be first one
  const handleTabSelect = (index: number) => setSelectedTabIndex(index);

  return (
    <div>
      {items.map((itemTab, indexTab) => {
        return (
          <button
            key={"tab-" + indexTab}
            onClick={() => handleTabSelect(indexTab)}
            type="button"
            className={`tab-button-item ${
              indexTab === selectedTabIndex ? "tab-button-item-selected" : ""
            }`}
          >
            {itemTab.title}
          </button>
        );
      })}
      <div>{items[selectedTabIndex].content}</div>
    </div>
  );
}

export default Tabs;
