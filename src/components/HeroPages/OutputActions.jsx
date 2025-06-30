import React from 'react'
import { FiCopy, FiDownload } from 'react-icons/fi'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const OutputActions = ({ outputContent, filename, setFilename, handleDownload }) => {
  const resolvedContent = typeof outputContent === 'function' ? outputContent() : outputContent

  const contentToCopy =
    typeof resolvedContent === 'string' ? resolvedContent : JSON.stringify(resolvedContent, null, 4)

  return (
    <div className="flex items-center gap-4 h-full">
      <CopyToClipboard text={contentToCopy}>
        <button className="flex items-center px-3 py-1.5 border border-[#e1e4e8] rounded-[6px] bg-white text-[#586069] text-[13px] cursor-pointer transition-all duration-200 hover:bg-[#f3f4f6] hover:border-[#bbb] hover:text-[#24292e] active:bg-[#e1e4e8] h-full">
          <FiCopy />
        </button>
      </CopyToClipboard>

      <input
        type="text"
        onChange={(e) => setFilename(e.target.value)}
        value={filename}
        className="px-3 py-1.5 border border-[#e1e4e8] rounded-[6px] text-[#586069] text-[13px] focus:outline-none focus:border-[#bbb]"
        placeholder="Enter filename"
      />

      <button
        className="flex gap-1 items-center px-3 py-1.5 border border-[#e1e4e8] rounded-[6px] bg-white text-[#586069] text-[13px] cursor-pointer transition-all duration-200 hover:bg-[#f3f4f6] hover:border-[#bbb] hover:text-[#24292e] active:bg-[#e1e4e8] h-full"
        onClick={() => {
          if (handleDownload.length === 1) {
            handleDownload(filename)
          } else {
            handleDownload(resolvedContent, filename)
          }
        }}
      >
        <FiDownload />
        <span>Download</span>
      </button>
    </div>
  )
}

export default OutputActions
