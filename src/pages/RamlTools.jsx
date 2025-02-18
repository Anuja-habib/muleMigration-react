

import React from "react";
import CardComp from "../components/Card";
import FileUpload from "../components/FileUpload";
import styled from "styled-components";
const FileUploadCom = styled.div`
    margin: 0;
    position: absolute;
    top: 10%;
    left: 40%;
    border-radius: 22px;
    background: #e0e0e0;
    box-shadow: inset 41px 41px 82px #aaaaaa,
                inset -41px -41px 82px #ffffff;
`;

var variant = 'light';
export const AboutUs = () => {
    return (
        <div >
           <FileUploadCom>
            <CardComp/>
           </FileUploadCom>
            
        </div>
    );
};

export const XsdToRaml = () => {
    return (
        <div className="home">
            <FileUpload></FileUpload>
        </div>
    );
};

export const WsdlToRaml = () => {
    return (
        <div className="home">
            <h1>Mulesoft Migration Accelerator Wsdl To Raml</h1>
        </div>
    );
};
