import React from 'react'
import bannerImage from '../assets/agentforce-agent-astro.avif'

export const Banner = () => {
  return (
    <div className="h-[180px] bg-gradient-to-r from-[#4a46cc] to-[#0b1b42] relative overflow-hidden md:h-[180px] sm:h-[140px]">
      <div
        className="absolute top-0 right-0 bottom-0 w-[60%] bg-cover opacity-20 hidden lg:block"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='800' height='400' viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,400 C150,300 350,300 500,400 C650,300 750,300 800,400 L800,0 L0,0 L0,400 Z' fill='rgba(255,255,255,0.05)'/%3E%3C/svg%3E")`,
        }}
      ></div>
      <div
        className="absolute left-0 top-0 bottom-0 w-[200px] bg-no-repeat bg-left bg-contain hidden lg:block"
        style={{
          backgroundImage: `url(${bannerImage})`,
        }}
      ></div>

      <div
        className="absolute w-3 h-3 rounded-full bg-white/30 hidden lg:block"
        style={{ top: '10px', left: '20px' }}
      ></div>
      <div
        className="absolute w-6 h-6 rounded-full hidden lg:block"
        style={{
          backgroundColor: 'rgba(180, 180, 255, 0.4)',
          bottom: '20%',
          right: '15%',
        }}
      ></div>

      <div
        className="absolute rotate-45 hidden lg:block"
        style={{
          width: '12px',
          height: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          top: '40%',
          right: '20%',
        }}
      ></div>
      <div
        className="absolute rotate-45 hidden lg:block"
        style={{
          width: '12px',
          height: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          top: '40%',
          right: '20%',
        }}
      ></div>

      <div className="h-full flex content-center flex-col gap-4 justify-center text-white p-8">
        <h1 className="w-4/5 mx-auto text-2xl md:text-3xl lg:text-4xl font-medium text-center">
          Supercharge Your MuleSoft Migration Journey
        </h1>
        <p className="w-3/4 mx-auto text-md font-normal text-center opacity-90 m-0 leading-[1.5] sm:text-[16px]">
          Save time and reduce complexity with our purpose-built accelerators to build faster,
          migrate smarter, deliver sooner
        </p>
      </div>
    </div>
  )
}

export const SmallBanner = ({ title, subtitle }) => {
  return (
    <div
      className="h-[180px] bg-gradient-to-r from-[#4a46cc] to-[#0b1b42] relative overflow-hidden md:h-[180px] sm:h-[140px]"
      style={{ height: '140px' }}
    >
      <div
        className="absolute top-0 right-0 bottom-0 w-[60%] bg-cover opacity-20 hidden lg:block"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='800' height='400' viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,400 C150,300 350,300 500,400 C650,300 750,300 800,400 L800,0 L0,0 L0,400 Z' fill='rgba(255,255,255,0.05)'/%3E%3C/svg%3E")`,
        }}
      ></div>
      <div
        className="absolute left-[220px] top-0 w-[calc(100%-220px)] h-full flex flex-col justify-center pr-[72px] 
text-white md:pr-[40px] sm:left-0 sm:w-full sm:px-6 sm:items-center sm:text-center sm:h-auto"
        style={{
          left: '0',
          width: '100%',
          textAlign: 'center',
          alignItems: 'center',
          padding: '0 24px',
        }}
      >
        <h1 className="w-4/5 mx-auto text-2xl md:text-3xl lg:text-4xl font-medium text-center">
          {title}
        </h1>
        <p className="w-3/4 mx-auto text-md font-normal text-center opacity-90 m-0 leading-[1.5] sm:text-[16px]">
          {subtitle}
        </p>
      </div>
    </div>
  )
}
