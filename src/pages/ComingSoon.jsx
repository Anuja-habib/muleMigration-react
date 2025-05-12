import { FiClock, FiHome } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4a46cc] to-[#0b1b42] text-white px-4">
      <div className="text-center max-w-xl p-10 bg-white/10 backdrop-blur-md rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.25)] border border-white/10">
        <div className="flex justify-center mb-6">
          <div className="bg-white/10 p-4 rounded-full border border-white/20">
            <FiClock className="text-4xl text-white" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold mb-4 tracking-tight">Page Coming Soon</h1>
        <p className="text-white/90 text-base sm:text-lg mb-6 leading-relaxed">
          We're currently working on this feature and will launch it shortly. Thanks for your
          patience!
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-white text-[#0b1b42] font-medium px-5 py-2 rounded-lg transition hover:bg-gray-100"
        >
          <FiHome />
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default ComingSoon
