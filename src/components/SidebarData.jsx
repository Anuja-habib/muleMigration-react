// Filename - components/SidebarData.js

import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import * as TbIcons from 'react-icons/tb'
import * as Convert from 'react-icons/si'
import { VscDashboard } from 'react-icons/vsc'
import { RiAiGenerate } from 'react-icons/ri'

// For the blue color like in the MuleSoft interface
const iconStyle = { color: '#009de2' }

export const SidebarData = [
  {
    title: 'RAML TOOLS',
    items: [
      {
        title: 'XSD To RAML Converter',
        path: '/raml-tools/xsd-to-raml',
        icon: <Convert.SiConvertio style={iconStyle} />,
        active: true,
      },
      {
        title: 'RAML Example Generator',
        path: '/raml-tools/example-generator',
        icon: <Convert.SiConvertio style={iconStyle} />,
        active: true,
      },
      {
        title: 'WSDL to RAML Generator',
        path: '/raml-tools/wsdl-to-raml',
        icon: <RiAiGenerate style={iconStyle} />,
        active: true,
      },
      {
        title: 'Standardize RAML Spec',
        path: '/raml-tools/standardize-raml',
        icon: <RiAiGenerate style={iconStyle} />,
        active: false,
      },
      {
        title: 'JSON to RAML Datatype Converter',
        path: '/raml-tools/json-to-raml',
        icon: <RiAiGenerate style={iconStyle} />,
        active: true,
      },
      {
        title: 'JSON to YAML Example Converter',
        path: '/raml-tools/json-to-yaml',
        icon: <RiAiGenerate style={iconStyle} />,
        active: true,
      },
    ],
  },
  {
    title: 'MAPPING TOOLS',
    items: [
      {
        title: 'XSLT Mapping Extractor',
        path: '/mapping-tools/xslt-mapping-extractor',
        icon: <IoIcons.IoIosPaper style={iconStyle} />,
        active: false,
      },
      {
        title: 'Dataweave Script Generator',
        path: '/mapping-tools/dwl-generator',
        icon: <IoIcons.IoIosPaper style={iconStyle} />,
        active: true,
      },
    ],
  },
  {
    title: 'MIGRATION TOOLS',
    items: [
      {
        title: 'TIBCO Migration Dashboard',
        path: '/migration-tools/tibco',
        icon: <VscDashboard style={iconStyle} />,
        active: false,
      },
      {
        title: 'IIB Migration Dashboard',
        path: '/migration-tools/iib',
        icon: <VscDashboard style={iconStyle} />,
        active: false,
      },
      {
        title: 'CloudHub Migration Dashboard',
        path: '/migration-tools/cloudhub-migration',
        icon: <VscDashboard style={iconStyle} />,
        active: false,
      },
      {
        title: 'Mule 3 Migration Dashboard',
        path: '/migration-tools/mule3-migration',
        icon: <VscDashboard style={iconStyle} />,
        active: false,
      },
    ],
  },
  {
    title: 'CODE ANALYSIS TOOLS',
    items: [
      {
        title: 'Code Quality Analysis',
        path: '/generate',
        icon: <IoIcons.IoMdHelpCircle style={iconStyle} />,
        active: false,
      },
    ],
  },
  {
    title: 'Mule Application tools',
    items: [
      {
        title: 'Generate Mule Application',
        path: '/generate-mule-app',
        icon: <IoIcons.IoMdHelpCircle style={iconStyle} />,
        active: true,
      },
    ],
  },
  {
    title: 'UTILITIES',
    items: [
      {
        title: 'Generate',
        path: '/generate',
        icon: <IoIcons.IoMdHelpCircle style={iconStyle} />,
        active: false,
      },
      {
        title: 'Feedback',
        path: '/feedback',
        icon: <IoIcons.IoMdHelpCircle style={iconStyle} />,
        active: true,
      },
    ],
  },
]
