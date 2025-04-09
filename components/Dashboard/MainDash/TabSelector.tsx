import React, { memo } from 'react';

// Define tab types as const to ensure type safety and reusability
const TAB_TYPES = {
  TOP: 'top',
  ALL: 'all',
  REGION: 'region'
} as const;

type TabType = typeof TAB_TYPES[keyof typeof TAB_TYPES];

interface TabSelectorProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TabSelector: React.FC<TabSelectorProps> = memo(({ activeTab, onTabChange }) => {
  // Centralized tab configuration for easier maintenance
  const tabs = [
    { 
      key: TAB_TYPES.TOP, 
      label: 'Top Countries', 
      activeColor: 'bg-orange-500',
      inactiveColor: 'bg-gray-100'
    },
    { 
      key: TAB_TYPES.ALL, 
      label: 'All Countries', 
      activeColor: 'bg-[#1428A0]',
      inactiveColor: 'bg-gray-100'
    },
    { 
      key: TAB_TYPES.REGION, 
      label: 'Region', 
      activeColor: 'bg-[#1428A0]',
      inactiveColor: 'bg-gray-100'
    }
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="w-full">
        <div className="inline-flex gap-2 sm:gap-3 bg-[#1428A00D] rounded-lg p-1 sm:p-2 md:p-4 w-full max-w-xl">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`
                flex-1 
                px-2 sm:px-4 md:px-6 
                py-1 sm:py-2 
                rounded-lg 
                text-xs sm:text-sm 
                transition-colors 
                duration-200 
                ${
                  activeTab === tab.key 
                    ? `${tab.activeColor} text-white` 
                    : `${tab.inactiveColor} text-[#9F9C9C] border-2 border-[#0000000D]`
                }
                focus:outline-none 
                focus:ring-2 
                focus:ring-offset-2 
                focus:ring-blue-500
              `}
              onClick={() => onTabChange(tab.key)}
              aria-pressed={activeTab === tab.key}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

// Add display name for better debugging
TabSelector.displayName = 'TabSelector';

// Export tab types for external use
export { TAB_TYPES };
export default TabSelector;