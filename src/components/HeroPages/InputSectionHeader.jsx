import { FiCode } from 'react-icons/fi'
import { MdContentPaste } from 'react-icons/md'

const InputSectionHeader = ({ setInputContent }) => {
  return (
    <div className="flex items-center justify-between px-5 py-4 bg-[#f8f9fa] border-b border-[#e1e4e8]">
      <div className="flex items-center">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <FiCode /> Input Datatype
        </h3>
      </div>

      <div className="flex gap-2">
        <div
          className="flex gap-1 items-center px-3 py-1.5 border border-[#e1e4e8] rounded-md bg-white text-[#586069] text-[13px] cursor-pointer transition-all duration-200 hover:bg-[#f3f4f6] hover:border-[#bbb] hover:text-[#24292e] active:bg-[#e1e4e8]"
          onClick={() => setInputContent('')}
        >
          <MdContentPaste /> <span>Clear</span>
        </div>
      </div>
    </div>
  )
}

export default InputSectionHeader
