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
        <Router>
            <Sidebar />
            <Routes>
                <Route
                    path="/ramlTools"
                    element={<AboutUs />}
                />
                <Route
                    path="/ramlTools/xsdToRaml"
                    element={<XsdToRaml />}
                />
                <Route
                    path="/ramlTools/wsdlToRaml"
                    element={<WsdlToRaml />}
                />
                <Route
                    path="/mappingTools"
                    element={<Services />}
                />
                <Route
                    path="/mappingTools/xsltMappingExtractor"
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
                    path="/integrationTools"
                    element={<IntegrationTools />}
                />
                <Route
                    path="/integrationTools/Tibco"
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
    );
}

export default App;

