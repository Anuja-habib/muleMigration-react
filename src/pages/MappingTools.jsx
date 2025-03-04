// Filename - pages/Services.js

import React from "react";
import * as FaIcons from "react-icons/fa";
import * as Convert from "react-icons/si";
import { VscDashboard } from "react-icons/vsc";
import { RiAiGenerate2 } from "react-icons/ri";
import { RiAiGenerate } from "react-icons/ri";
import { TbTools } from "react-icons/tb";
import { GiProcessor } from "react-icons/gi";
import { VscServerProcess } from "react-icons/vsc";
const ReactIcons ={ color: '#1b4965'}

import Card from 'react-bootstrap/Card';
import MyCards from "../components/Cards";
import '../css/card.css'

const mainMenu = [{
    'Key' : "Trending",
    'Value': [{
           title: "Generate",
           path: "/generate",
           icon: <RiAiGenerate2 style={ReactIcons}/>,
   },
   {        title: "RAML Tools",
           path: "/raml-tools",
           icon: <FaIcons.FaTools style={ReactIcons}/>,
           
   },
   {
        title: "Mapping Tools",
       path: "/mapping-tools",
       icon: <TbTools style={ReactIcons}/>,
              
   },
   {
        title: "Integration Tools",
       path: "/integration-tools",
       icon: <GiProcessor style={ReactIcons}/>,
       
   }]},
   {
   "Key" :"Featured" ,
   "Value" : [{
     title: "XSD To RAML Converter",
     path: "/raml-tools/xsd-to-raml",
     icon: <Convert.SiConvertio style={ReactIcons}/>
   },
   {
     title: "WSDL to RAML Generator",
     path: "/raml-tools/wsdl-to-raml",
     icon: <RiAiGenerate style={ReactIcons}/>
   },
   {
     title: "XSLT Mapping Extractor",
     path: "/mapping-tools/xslt-mapping-extractor",
     icon: <VscServerProcess style={ReactIcons}/>,
     cName: "sub-nav"
   },
   {
     title: "Tibco Migration Dashboard",
     path: "/integration-tools/tibco",
     icon: <VscDashboard style={ReactIcons}/>
   }]
   
}]
export const Services = () => {
    return (
        <div className="services">
            
        </div>
    );
};

export const XsltMappingExtractor = () => {
    return (
        <div className="services">
             {mainMenu.map(title => (
                <Card className="card-main-Container">
                <div className="card-title">{title.Key}</div>
                
                
                {
                    title.Value.map((item,index)=> (
                <MyCards key={index} CardContent={item}></MyCards>
                    ))
                }
                
                </Card>
                
            ))} 


            
           
        
        </div>
    );
};

export const ServicesTwo = () => {
    return (
        <div className="services">
            <h1>Mulesoft Migration Accelerator Service2</h1>
        </div>
    );
};

export const ServicesThree = () => {
    return (
        <div className="services">
            <h1>Mulesoft Migration Accelerator Service3</h1>
        </div>
    );
};
