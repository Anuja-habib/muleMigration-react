import React from 'react'
import { FiUploadCloud, FiEdit } from 'react-icons/fi'

const ToggleInputTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex bg-[#edf0f3] p-1 rounded-full">
      <div className="flex bg-[#edf0f3] rounded-full">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-medium cursor-pointer transition-all duration-200 min-w-[130px] justify-center 
            ${activeTab === 'upload' ? 'bg-[#4a46cc] text-white scale-105' : 'bg-transparent text-[#586069]'}
          `}
          onClick={() => setActiveTab('upload')}
        >
          <FiUploadCloud /> Upload File
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-medium cursor-pointer transition-all duration-200 min-w-[130px] justify-center 
            ${activeTab === 'paste' ? 'bg-[#4a46cc] text-white scale-105' : 'bg-transparent text-[#586069]'}
            `}
          onClick={() => setActiveTab('paste')}
        >
          <FiEdit /> Write/Paste
        </button>
      </div>
    </div>
  )
}

export default ToggleInputTabs
