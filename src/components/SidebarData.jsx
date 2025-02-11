// Filename - components/SidebarData.js

import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/tb";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as Convert from "react-icons/si";
import { RiAiGenerate } from "react-icons/ri";

export const SidebarData = [
    {
        title: "RAML Tools",
        path: "/ramlTools",
        icon: <FaIcons.FaTools />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: "XSD To RAML Converter",
                path: "/ramlTools/xsdToRaml",
                icon: <Convert.SiConvertio />,
            },
            {
                title: "WSDL to RAML Generator",
                path: "/ramlTools/wsdlToRaml",
                icon: <RiAiGenerate />,
            },
        ],
    },
    {
        title: "Mapping Tools",
        path: "/mappingTools",
        icon: <IoIcons.IoIosPaper />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: "XSLT Mapping Extractor",
                path: "/mappingTools/xsltMappingExtractor",
                icon: <IoIcons.IoIosPaper />,
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
        title: "Integration Tools",
        path: "/integrationTools",
        icon: <FaIcons.FaEnvelopeOpenText />,

        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: "Tibco Integration Catalog",
                path: "/integrationTools/Tibco",
                icon: <IoIcons.IoIosPaper />,
            }// },
            // {
            //     title: "Event 2",
            //     path: "/events/events2",
            //     icon: <IoIcons.IoIosPaper />,
            // },
        ],
    },
    {
        title: "Support",
        path: "/support",
        icon: <IoIcons.IoMdHelpCircle />,
    },
];
