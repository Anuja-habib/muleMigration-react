// Filename - components/SidebarData.js

import React from "react";
import styled from "styled-components"
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/tb";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as Convert from "react-icons/si";
import { FaHome } from "react-icons/fa";
import { VscDashboard } from "react-icons/vsc";
import { RiAiGenerate } from "react-icons/ri";
const ReactIcons ={ color: '#1b4965'}

export const SidebarData = [
    {
        title: "Home",
        path: "/",
        icon: <FaHome style={ReactIcons}/>,

    },
    {
        title: "RAML Tools",
        path: "/raml-tools",
        icon: <FaIcons.FaTools style={ReactIcons}/>,
        iconClosed: <RiIcons.RiArrowDownSFill  style={ReactIcons}/>,
        iconOpened: <RiIcons.RiArrowUpSFill style={ReactIcons}/>,

        subNav: [
            {
                title: "XSD To RAML Converter",
                path: "/raml-tools/xsd-to-raml",
                icon: <Convert.SiConvertio style={ReactIcons}/>,
            },
            
            {
                title: "RAML Example Generator",
                path: "/raml-tools/example-generator",
                icon: <Convert.SiConvertio style={ReactIcons}/>,
            },
            {
                title: "WSDL to RAML Generator",
                path: "/raml-tools/wsdl-to-raml",
                icon: <RiAiGenerate style={ReactIcons}/>,
            },
        ],
    },
    {
        title: "Mapping Tools",
        path: "/mapping-tools",
        icon: <IoIcons.IoIosPaper style={ReactIcons}/>,
        iconClosed: <RiIcons.RiArrowDownSFill style={ReactIcons}/>,
        iconOpened: <RiIcons.RiArrowUpSFill style={ReactIcons}/>,

        subNav: [
            {
                title: "XSLT Mapping Extractor",
                path: "/mapping-tools/xslt-mapping-extractor",
                icon: <IoIcons.IoIosPaper style={ReactIcons}/>,
                cName: "sub-nav",
            }
            // },
            // {
            //     title: "Service 2",
            //     path: "/services/services2",
            //     icon: <IoIcons.IoIosPaper />,
            //     cName: "sub-nav",
            // },
            // {
            //     title: "Service 3",
            //     path: "/services/services3",
            //     icon: <IoIcons.IoIosPaper />,
            // },
        ],
    },
    {
        title: "Migration Tools",
        path: "/migration-tools",
        icon: <FaIcons.FaEnvelopeOpenText style={ReactIcons}/>,

        iconClosed: <RiIcons.RiArrowDownSFill style={ReactIcons}/>,
        iconOpened: <RiIcons.RiArrowUpSFill style={ReactIcons}/>,

        subNav: [
            {
                title: "Tibco Migration Dashboard",
                path: "/migration-tools/tibco",
                icon: <VscDashboard style={ReactIcons}/>,
            }// },
            // {
            //     title: "Event 2",
            //     path: "/events/events2",
            //     icon: <IoIcons.IoIosPaper />,
            // },
        ],
    },
    {
        title: "Generate",
        path: "/generate",
        icon: <IoIcons.IoMdHelpCircle style={ReactIcons}/>,
    },
];
