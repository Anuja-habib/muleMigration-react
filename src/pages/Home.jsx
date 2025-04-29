// Updated home.jsx with improved footer styling
import React from 'react'
import { Banner } from '../components/Banner'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import { RiAiGenerate, RiAiGenerate2 } from 'react-icons/ri'
import { TbTools } from 'react-icons/tb'
import { GiProcessor } from 'react-icons/gi'
import { VscDashboard, VscServerProcess } from 'react-icons/vsc'
import Footer from '../components/Footer'
import { MdFeaturedPlayList } from 'react-icons/md'
import { IoMdTrendingUp } from 'react-icons/io'
import styled from 'styled-components'
import imgDiv from '../assets/backgroundImage.webp'

const newFeatures = [
  {
    title: 'DataWeave Script Generator',
    path: '/mapping-tools/dwl-generator',
    icon: <RiAiGenerate />,
  },
]

const Home = () => {
  const featuredTools = [
    {
      title: 'RAML Example Generator',
      path: '/raml-tools/example-generator',
      icon: <RiAiGenerate />,
      description: 'Generate example data based on your RAML specifications',
    },
    {
      title: 'WSDL to RAML Generator',
      path: '/raml-tools/wsdl-to-raml',
      icon: <RiAiGenerate />,
      description: 'Convert WSDL files to RAML API specifications',
    },
    {
      title: 'XSLT Mapping Extractor',
      path: '/mapping-tools/xslt-mapping-extractor',
      icon: <VscServerProcess />,
      description: 'Extract and analyze XSLT mappings for migration',
    },
  ]

  // Migration tools for right column
  const migrationTools = [
    {
      title: 'Tibco Migration Dashboard',
      path: '/migration-tools/tibco',
      icon: <VscDashboard />,
      description: 'Visualize and plan your TIBCO migration journey',
    },
    {
      title: 'IIB Migration Dashboard',
      path: '/migration-tools/tibco',
      icon: <RiAiGenerate2 />,
      description: 'Visualize and plan your IIB migration journey',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
      <Banner />

      <div className="flex flex-col md:flex-row md:min-w-xl lg:min-w-5xl xl:min-w-7xl gap-4 mx-auto p-4">
        <div className="flex-[2] w-full">
          <div className="bg-white rounded shadow-sm overflow-hidden">
            <div className="flex items-center px-5 py-4 border-b border-[#eee] gap-2">
              <MdFeaturedPlayList color="#009de2" size={20} />
              <span className="text-lg font-medium text-[#333333]">Trending Features</span>
            </div>

            <div className="w-full">
              {featuredTools.map((tool, index) => (
                <div
                  to={tool.path}
                  key={index}
                  className="flex items-center p-5 no-underline text-inherit border-b border-[#f0f0f0] last:border-b-0 hover:bg-[#f8f9fa] transition-colors duration-200 cursor-pointer"
                >
                  <div className="p-4 flex items-center justify-center">
                    <div className="text-[#009de2] text-[24px]">{tool.icon}</div>
                  </div>
                  <div>
                    <span className="block text-base font-medium text-[#333] mb-1">
                      {tool.title}
                    </span>
                    <span className="block text-sm text-[#666]">{tool.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-[1] flex flex-col gap-4 w-full">
          <div className="bg-white rounded shadow-sm overflow-hidden">
            <div className="flex items-center px-5 py-4 border-b border-[#eee] gap-2">
              <IoMdTrendingUp color="#009de2" size={20} />
              <span className="text-lg font-medium text-[#333333]">Migration Tools</span>
            </div>

            <div className="w-full">
              {migrationTools.map((tool, index) => (
                <Link
                  to={tool.path}
                  key={index}
                  className="flex items-center p-5 no-underline text-inherit border-b border-[#f0f0f0] last:border-b-0 hover:bg-[#f8f9fa] transition-colors duration-200 cursor-pointer"
                >
                  <div className="p-4 flex items-center justify-center mr-4">
                    <div className="text-[#009de2] text-[24px]">{tool.icon}</div>
                  </div>
                  <div>
                    <span className="block text-base font-medium text-[#333] mb-1">
                      {tool.title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white rounded shadow-sm overflow-hidden">
            <div className="flex items-center px-5 py-4 border-b border-[#eee] gap-2">
              <FaIcons.FaCode color="#009de2" size={20} />
              <span className="text-lg font-medium text-[#333333]">New Feature</span>
            </div>

            <div>
              {newFeatures.map((tool, index) => (
                <Link
                  to={tool.path}
                  key={index}
                  className="flex items-center p-5 no-underline text-inherit border-b border-[#f0f0f0] last:border-b-0 hover:bg-[#f8f9fa] transition-colors duration-200 cursor-pointer"
                >
                  <div className="p-4 flex items-center justify-center mr-4">
                    <div className="text-[#009de2] text-[24px]">{tool.icon}</div>
                  </div>
                  <div>
                    <span className="block text-base font-medium text-[#333] mb-1">
                      {tool.title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
