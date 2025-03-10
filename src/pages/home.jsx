
import React from "react";
import {Banner}  from "../components/banner";
import Cards from "../components/Cards";
import * as FaIcons from "react-icons/fa";
import * as Convert from "react-icons/si";
import { VscDashboard } from "react-icons/vsc";
import { RiAiGenerate2 } from "react-icons/ri";
import { RiAiGenerate } from "react-icons/ri";
import { TbTools } from "react-icons/tb";
import { GiProcessor } from "react-icons/gi";
import { VscServerProcess } from "react-icons/vsc";
import imgDiv  from "../assets/backgroundImage.webp"
import Footer from "../components/Footer";
import { MdFeaturedPlayList } from "react-icons/md";
import { IoMdTrendingUp } from "react-icons/io";
import "../css/card.css"

const ReactIcons ={ color: '#1b4965'}
 const Home = () => {
    const trending = [
      {
        title: "Raml Example Genarator",
        path: "/raml-tools/example-generator",
        icon: <RiAiGenerate style={ReactIcons}/>
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
        path: "/migration-tools/tibco",
        icon: <VscDashboard style={ReactIcons}/>
      }
        
      ]
      const featured = [
        {
               title: "Generate",
               path: "/generate",
               icon: <RiAiGenerate2 style={ReactIcons}/>,
       },
       {        title: "XSD To RAML",
               path: "/raml-tools/xsd-to-raml",
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
           
       }
       
     ]
  
    return (
        <div className="events">
          <Banner />
         
        <div className="swimline-container">
          <div className="card-title"><MdFeaturedPlayList /> Featured</div>
          
        <div className="card-main-Container">
            
            {trending.map((item, index) => (
              <Cards key={index} CardContent={item} />  
          ))}
          </div>

        </div>
        <div className="swimline-container">
        <div className="card-title"><IoMdTrendingUp /> Trending </div>
        <div className="card-main-Container">
            
            {featured.map((item, index) => (
              <Cards key={index} CardContent={item} />  
          ))}
          </div>

        </div>
          
        <div className="footerImgDiv">
            
           <img className='imgdiv'src={imgDiv} alt="footer logo"/>
           <div className="footerImgText">Welcome</div>
        </div>
        <div className="footerAlign"> 
            
            <Footer/> 
            </div>
        </div>
        
      );
    };
    
    export default Home;