import { FiEdit, FiCheckCircle } from 'react-icons/fi'

const PasteInputText = ({ inputContent }) => {
  return (
    <div className="flex justify-between items-center py-4 px-5 bg-[#f8f9fa] border-t border-[#e1e4e8] sticky bottom-0 left-0 right-0 z-10 backdrop-blur-[8px]">
      <div className="flex items-center gap-2 text-[#6a737d] text-[14px]">
        {inputContent ? (
          <>
            <FiCheckCircle size={16} color="4a46cc" />
            Ready to convert
          </>
        ) : (
          <>
            <FiEdit size={16} color="4a46cc" />
            Start writing or paste your datatype content
          </>
        )}
      </div>
    </div>
  )
}

export default PasteInputText
