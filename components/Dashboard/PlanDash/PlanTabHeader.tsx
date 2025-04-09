import React, { useState } from "react";

interface TabProps {
  tabs: string[];
  defaultTab?: string;
  onTabChange?: (tab: string) => void;
}

const PlanTabHeader: React.FC<TabProps> = ({
  tabs,
  defaultTab,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div className="flex border-b">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === tab
              ? "text-red-500 border-b-2 border-red-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default PlanTabHeader;
