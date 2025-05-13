import { FiCode, FiAlertCircle, FiCheckCircle } from 'react-icons/fi'

const ToggleOutputText = ({ error, outputContent }) => {
  return (
    <div className="flex items-center gap-4">
      <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
        <FiCode /> Output RAML
      </h3>
      {error ? (
        <div className="flex items-center gap-1 text-[12px]">
          <FiAlertCircle />
          <span className={true ? 'text-red-800' : 'text-green-800'}>Generation failed</span>
        </div>
      ) : (
        outputContent && (
          <div className="flex items-center gap-1 text-[12px] ml-3">
            <FiCheckCircle />
            <span className={error ? 'text-red-800' : 'text-green-800'}>Generation successful</span>
          </div>
        )
      )}
    </div>
  )
}

export default ToggleOutputText
