// App.jsx
import React, { useState } from 'react'
import './App.css'
import ChatBot from './components/ChatBot'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { RamlTools } from './pages/RamlTools'
import XSDToRAML from './pages/XSDToRAML'
import { Services, XsltMappingExtractor } from './pages/MappingTools'
import { IntegrationTools, TibcoIntegrationTools, EventsTwo } from './pages/IntegrationTools'
import WsdlToRaml from './pages/WsdlToRaml'
import Home from './pages/Home'
import Generate from './pages/Genarate'
import Layout from './components/Layout'
import FeedbackForm from './components/FeedbackButton';
import styled from 'styled-components'
import Feedback from './pages/Feedback' // Importing FeedbackForm directly
import RAMLExampleGenerator from './pages/RAMLExampleGenerator'
import JSONToRAML from './pages/JSONToRAML'
import JSONToYAML from './pages/JSONToYAML'
import ComingSoon from './pages/ComingSoon'
import MuleApplicationGenerator from './components/GenerateMuleApp'

// Add these styled components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`

const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: #f8f9fa;
`

const ChatBotWithNavigation = () => {
  const navigate = useNavigate()
  return <ChatBot navigate={navigate} />
}
const FeedBackWithNavigation = () => {
  const navigate = useNavigate()
  return <FeedbackForm navigate={navigate} />
}

function App() {
  return (
    <AppContainer>
      <Router>
        <MainContent>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/raml-tools" element={<RamlTools />} />
              <Route path="/raml-tools/example-generator" element={<RAMLExampleGenerator />} />
              <Route path="/raml-tools/xsd-to-raml" element={<XSDToRAML />} />
              <Route path="/raml-tools/wsdl-to-raml" element={<WsdlToRaml />} />
              <Route path="/raml-tools/json-to-raml" element={<JSONToRAML />} />
              <Route path="/raml-tools/json-to-yaml" element={<JSONToYAML />} />
              <Route path="/mapping-tools" element={<Services />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route
                path="/mapping-tools/xslt-mapping-extractor"
                element={<XsltMappingExtractor />}
              />
              <Route path="/migration-tools" element={<IntegrationTools />} />
              <Route path="/migration-tools/tibco" element={<TibcoIntegrationTools />} />
              <Route path="/events/events2" element={<EventsTwo />} />
              <Route path="/generate" element={<Generate />} />
              <Route path="/coming-soon" element={<ComingSoon />} />
              <Route path="/generate-mule-app" element={<MuleApplicationGenerator />} />
            </Route>
          </Routes>
          <FeedBackWithNavigation />
          <ChatBotWithNavigation />
        </MainContent>
      </Router>
    </AppContainer>
  )
}

export default App
