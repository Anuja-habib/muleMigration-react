// Filename - App.js

import "./App.css";
import Sidebar from "./components/Sidebar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import {
    RamlExampleGenarator,
    RamlTools,
} from "./pages/RamlTools";
import  XsdToRaml 
from "./pages/XsdToRaml";
import {
    Services,
    XsltMappingExtractor,

} from "./pages/MappingTools";
import {
  IntegrationTools,
    TibcoIntegrationTools,
    EventsTwo,
} from "./pages/IntegrationTools";
import WsdlToRaml from "./pages/wsdlToRaml"
import Home from "./pages/home"
import Generate from "./pages/Genarate";
import Footer from './components/Footer'
function App() {
    return (
        <div className="app-container">
        <Router>
            <Sidebar />
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/raml-tools"
                    element={<RamlTools />}
                />
                <Route
                    path="/raml-tools/example-generator"
                    element={<RamlExampleGenarator />}
                />
                <Route
                    path="/raml-tools/xsd-to-raml"
                    element={<XsdToRaml />}
                />
                <Route
                    path="/raml-tools/wsdl-to-raml"
                    element={<WsdlToRaml />}
                />
                <Route
                    path="/mapping-tools"
                    element={<Services />}
                />
                <Route
                    path="/mapping-tools/xslt-mapping-extractor"
                    element={<XsltMappingExtractor />}
                />
                {/* <Route
                    path="/services/services2"
                    element={<ServicesTwo />}
                />
                <Route
                    path="/services/services3"
                    element={<ServicesThree />}
                />
                <Route
                    path="/contact"
                    element={<Contact />}
                /> */}
                <Route
                    path="/migration-tools"
                    element={<IntegrationTools />}
                />
                <Route
                    path="/migration-tools/tibco"
                    element={<TibcoIntegrationTools />}
                />
                <Route
                    path="/events/events2"
                    element={<EventsTwo />}
                />
                <Route
                    path="/generate"
                    element={<Generate />}
                />
            </Routes>
       
         
           
        </Router>
       
        </div>
    );
}

export default App;

