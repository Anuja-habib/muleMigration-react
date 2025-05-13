import { FiCode } from 'react-icons/fi'

const HeroBanner = ({ title, subtitle, features }) => {
  return (
    <div className="bg-gradient-to-br from-[#4a46cc] to-[#0b1b42] rounded-2xl p-8 mb-8 text-white shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
      <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-semibold flex items-center gap-3 tracking-[-0.5px]">
        <div className="flex gap-4 items-center">
          <FiCode className="text-2xl sm:text-3xl" />
          {title}
        </div>
      </h1>
      <p>{subtitle}</p>

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white/10 p-6 rounded-xl backdrop-blur border border-white/10 transition-transform duration-200 ease-in-out hover:-translate-y-0.5"
          >
            <h3 className="text-[18px] mb-3 font-medium flex items-center gap-2">
              {feature.icon}
              {feature.title}
            </h3>
            <p className="text-sm opacity-90 leading-relaxed m-0">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HeroBanner
