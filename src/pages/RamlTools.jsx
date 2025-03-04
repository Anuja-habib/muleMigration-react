

import React from "react";
 import ExampleGeneratorTool from "./exampleGenerator"
 import TibcoConverter from "./TibcoParser"
export const RamlExampleGenarator = () => {
    return (
        <div className="home">
            <ExampleGeneratorTool/>
            
        </div>
    );
};


export const WsdlToRaml = () => {
    return (
        <div className="home">
            <TibcoConverter />
        </div>
    );
};
export const RamlTools = () => {
    return (
        <div className="home">
            <h1>Mulesoft Migration Accelerator RAML Tools</h1>
        </div>
    );
};

