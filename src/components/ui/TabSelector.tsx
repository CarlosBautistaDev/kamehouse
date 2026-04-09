"use client";

interface TabSelectorProps {
  tabs: string[];
  activeTab: number;
  onChange: (index: number) => void;
}

export function TabSelector({ tabs, activeTab, onChange }: TabSelectorProps) {
  return (
    <div className="glass inline-flex p-1 gap-1">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          onClick={() => onChange(index)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
            activeTab === index
              ? "bg-accent-primary text-white shadow-lg"
              : "text-text-secondary hover:text-white"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
