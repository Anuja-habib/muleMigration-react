// Filename - App.js

import "./App.css";
import Sidebar from "./components/Sidebar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import {
    AboutUs,
    XsdToRaml,
    WsdlToRaml,
} from "./pages/RamlTools";
import {
    Services,
    XsltMappingExtractor,

} from "./pages/MappingTools";
import {
  IntegrationTools,
    TibcoIntegrationTools,
    EventsTwo,
} from "./pages/IntegrationTools";
import Support from "./pages/Support";
function App() {
    return (
        <div className="app-container">
        <Router>
            <Sidebar />
            <Routes>
                <Route
                    path="/raml-tools"
                    element={<AboutUs />}
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
                    path="/integration-tools"
                    element={<IntegrationTools />}
                />
                <Route
                    path="/integration-tools/tibco"
                    element={<TibcoIntegrationTools />}
                />
                <Route
                    path="/events/events2"
                    element={<EventsTwo />}
                />
                <Route
                    path="/support"
                    element={<Support />}
                />
            </Routes>
        </Router>
        </div>
    );
}

export default App;

