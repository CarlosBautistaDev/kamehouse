"use client";

interface TabSelectorProps {
  tabs: string[];
  activeTab: number;
  onChange: (index: number) => void;
}

export function TabSelector({ tabs, activeTab, onChange }: TabSelectorProps) {
  return (
    <div className="inline-flex p-1.5 gap-1 bg-bg-secondary rounded-2xl">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          onClick={() => onChange(index)}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
            activeTab === index
              ? "bg-accent-primary text-white shadow-lg shadow-accent-primary/25"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
