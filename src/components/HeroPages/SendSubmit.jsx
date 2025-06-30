import { FiSend } from 'react-icons/fi'

const SendSubmit = ({ isLoading, handleSubmit }) => {
  return (
    <button
      disabled={isLoading}
      className={`relative px-4 py-2 text-sm font-semibold rounded-full w-auto flex items-center justify-center gap-2.5 overflow-hidden transition-all duration-200 ease-in-out cursor-pointer
        ${
          isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-teal-600 hover:bg-teal-800 hover:translate-y-[-1px] hover:shadow-[0_4px_8px_rgba(74,70,204,0.3)] text-white'
        }`}
      onClick={handleSubmit}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
          Loading...
        </>
      ) : (
        <>
          <FiSend /> Send
        </>
      )}
    </button>
  )
}

export default SendSubmit
