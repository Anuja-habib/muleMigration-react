const ToggleTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { label: 'Input View', value: 'input' },
    { label: 'Output View', value: 'output' },
  ]
  return (
    <div className="w-full flex justify-center mt-4">
      <div className="inline-flex bg-[#edf0f3] p-1 rounded-full shadow-sm border border-[#e1e4e8]">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer
                ${
                  activeTab === tab.value
                    ? 'bg-[#4a46cc] text-white shadow-md scale-105'
                    : 'text-[#586069]'
                }`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ToggleTabs
