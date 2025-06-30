import React, { useState } from 'react'
import { FiDownload, FiSend, FiUpload, FiFile, FiX, FiPaperclip, FiHelpCircle } from 'react-icons/fi'
import Editor from '@monaco-editor/react'
import { MuleAppGenerator } from '../seeds/features'
import HeroBanner from '../components/HeroPages/HeroBanner'
import config from '../config/config'

// Tooltip component for help tips
const HelpTooltip = ({ text }) => {
  return (
    <div className="relative inline-block group ml-1">
      <FiHelpCircle size={12} className="text-[#666] cursor-help" />
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[#333] text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none w-64 max-w-sm z-10">
        {text}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[#333]"></div>
      </div>
    </div>
  );
};

const MuleApplicationGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [error, setError] = useState('');
  const [filename, setFilename] = useState(`mule-application-${(+new Date()).toString(36)}.zip`);
  const [viewTab, setViewTab] = useState('input');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [appLayerType, setAppLayerType] = useState('EAPI');
  const [projectName, setProjectName] = useState('');
  const [selectedConnectors, setSelectedConnectors] = useState([]);
  const [currentConnector, setCurrentConnector] = useState('');
  const [currentConnectorVersion, setCurrentConnectorVersion] = useState('');
  const [certificateFolderName, setCertificateFolderName] = useState('');
  const [dataweaveFolderName, setDataweaveFolderName] = useState('');
  const [includeMunits, setIncludeMunits] = useState(false);
  const [generateCerts, setGenerateCerts] = useState(false);
  const [cloudHub, setCloudHub] = useState('CloudHub 1');
  const [environments, setEnvironments] = useState([]);
  const [currentEnvironment, setCurrentEnvironment] = useState('');

  const handlePromptChange = (value) => {
    setPrompt(value);
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setShowFileUpload(false);
    setError('');
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
  };

  // Define connector options based on app layer type
  const getConnectorOptions = () => {
    switch (appLayerType) {
      case 'EAPI':
      case 'PAPI':
        return [
          { value: 'http-request', label: 'HTTP Request Connector' }
        ];
      case 'SAPI':
        return [
          { value: 'http-request', label: 'HTTP Request Connector' },
          { value: 'salesforce', label: 'Salesforce' },
          { value: 'mongodb', label: 'MongoDB' },
          { value: 'postgresql', label: 'PostgreSQL' },
          { value: 'mysql', label: 'MySQL' },
          { value: 'oracle', label: 'Oracle Database' },
          { value: 'mssql', label: 'Microsoft SQL Server' },
          { value: 'sap', label: 'SAP' },
          { value: 'servicenow', label: 'ServiceNow' },
          { value: 'workday', label: 'Workday' },
          { value: 'file', label: 'File Connector' },
          { value: 'ftp', label: 'FTP/SFTP' },
          { value: 'jms', label: 'JMS' },
          { value: 'kafka', label: 'Apache Kafka' },
          { value: 'redis', label: 'Redis' },
          { value: 'elasticsearch', label: 'Elasticsearch' },
          { value: 'ldap', label: 'LDAP' }
        ];
      default:
        return [];
    }
  };

  // Handle app layer type change
  const handleAppLayerTypeChange = (newType) => {
    setAppLayerType(newType);
    // Reset selected connectors when app layer type changes
    setSelectedConnectors([]);
    setCurrentConnector('');
    setCurrentConnectorVersion('');
  };

  // Handle connector addition
  const handleAddConnector = () => {
    if (currentConnector.trim()) {
      const connectorExists = selectedConnectors.some(c => c.name === currentConnector.trim());
      if (!connectorExists) {
        const connectorLabel = getConnectorOptions().find(c => c.value === currentConnector)?.label || currentConnector;
        setSelectedConnectors(prev => [...prev, { 
          name: currentConnector.trim(), 
          version: currentConnectorVersion.trim() || '',
          label: connectorLabel
        }]);
        setCurrentConnector('');
        setCurrentConnectorVersion('');
      }
    }
  };

  // Handle connector removal
  const handleRemoveConnector = (connectorToRemove) => {
    setSelectedConnectors(prev => prev.filter(connector => connector.name !== connectorToRemove.name));
  };

  // Handle connector input key press
  const handleConnectorKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddConnector();
    }
  };

  // Handle environment addition
  const handleAddEnvironment = () => {
    if (currentEnvironment.trim() && !environments.includes(currentEnvironment.trim())) {
      setEnvironments(prev => [...prev, currentEnvironment.trim()]);
      setCurrentEnvironment('');
    }
  };

  // Handle environment removal
  const handleRemoveEnvironment = (envToRemove) => {
    setEnvironments(prev => prev.filter(env => env !== envToRemove));
  };

  // Handle Enter key press
  const handleEnvironmentKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddEnvironment();
    }
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setFileUrl(null);

    try {
      // Convert file to base64 and send everything as JSON
      let fileData = null;
      
      if (selectedFile) {
        console.log('Processing file:', selectedFile.name, 'Size:', selectedFile.size, 'bytes');
        
        // Check file size (limit to 10MB)
        if (selectedFile.size > 10 * 1024 * 1024) {
          throw new Error('File size too large. Please select a file smaller than 10MB.');
        }
        
        try {
          // Convert file to base64
          const fileBase64 = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              resolve({
                name: selectedFile.name,
                type: selectedFile.type,
                size: selectedFile.size,
                data: e.target.result // This includes the data:type;base64, prefix
              });
            };
            reader.onerror = (error) => {
              console.error('File reader error:', error);
              reject(new Error('Failed to read file'));
            };
            reader.readAsDataURL(selectedFile);
          });
          fileData = fileBase64;
          console.log('File converted successfully:', fileData.name, 'Base64 length:', fileData.data.length);
        } catch (fileError) {
          console.error('File conversion error:', fileError);
          throw new Error(`Failed to process file: ${fileError.message}`);
        }
      }

      // Create JSON payload
      const jsonPayload = {
        prompt: prompt,
        file: fileData,
        appLayerType: appLayerType,
        projectName: projectName,
        selectedConnectors: selectedConnectors,
        certificateFolderName: certificateFolderName,
        dataweaveFolderName: dataweaveFolderName,
        includeMunits: includeMunits,
        generateCerts: generateCerts,
        cloudHub: cloudHub,
        environments: environments
      };

      console.log('Sending JSON payload to generate-mule-app...');
      console.log('Payload summary:', {
        prompt: prompt ? 'Present' : 'Missing',
        file: fileData ? `File: ${fileData.name} (${fileData.size} bytes)` : 'No file',
        projectName: projectName,
        appLayerType: appLayerType,
        cloudHub: cloudHub,
        connectorCount: selectedConnectors.length,
        environmentCount: environments.length
      });

      const response = await fetch(config.apiUrlPython + '/generate-mule-app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonPayload),
      });

      if (!response.ok) {
        console.error('API response not OK:', response.status, response.statusText);
        // If the response is not OK, it might still be a JSON error from Flask
        // Try to parse as JSON first, then fall back to text or generic error
        let errorMessage = 'Failed to generate Mule application. Unknown error.';
        try {
          const errorData = await response.json();
          console.error('API error data:', errorData);
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (jsonError) {
          // If it's not JSON, read as text or use statusText
          console.error('Failed to parse error response as JSON:', jsonError);
          try {
            const errorText = await response.text();
            console.error('Error response text:', errorText);
            errorMessage = errorText || response.statusText || errorMessage;
          } catch (textError) {
            console.error('Failed to read error response as text:', textError);
            errorMessage = response.statusText || errorMessage;
          }
        }
        throw new Error(errorMessage);
      }

      // --- FIX STARTS HERE ---
      
      const blob = await response.blob();

      // Extract filename from Content-Disposition header
      const contentDisposition = response.headers.get('Content-Disposition');
      let extractedFilename = `mule-application-${(+new Date()).toString(36)}.zip`; // Default fallback
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="([^"]+)"/);
        if (filenameMatch && filenameMatch[1]) {
          extractedFilename = filenameMatch[1];
        }
      }

      const url = window.URL.createObjectURL(blob);
      setFileUrl(url);
      setFilename(extractedFilename); // Set the filename extracted from headers
      setViewTab('output');
      // --- FIX ENDS HERE ---

    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!fileUrl) return;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = filename; // Use the filename received from the API
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(fileUrl);
    setFileUrl(null);
    setViewTab('input'); // Go back to input view after download
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-[1200px] mx-auto p-6 font-sans"> {/* Added font-sans for Inter font */}
      <HeroBanner
        title={MuleAppGenerator.title || "Mule Application Generator"}
        subtitle="Generate Mule apps from your prompt and optional file upload"
        features={MuleAppGenerator.features}
      />

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {viewTab === 'input' && (
                      <div className="w-full bg-white rounded shadow-sm overflow-hidden">
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              {/* First Row - Project Name and App Layer Type */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
                  <label htmlFor="project-name" className="block text-xs font-medium text-[#333] mb-1">
                    Project Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="project-name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-[#ddd] rounded focus:outline-none focus:ring-1 focus:ring-[#009de2] focus:border-[#009de2] transition-all duration-200"
                    placeholder="Enter project name"
                    required
                  />
                </div>

                <div className="flex-1">
                  <label htmlFor="app-layer-type" className="block text-xs font-medium text-[#333] mb-1">
                    App Layer Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="app-layer-type"
                    value={appLayerType}
                    onChange={(e) => handleAppLayerTypeChange(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-[#ddd] rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#009de2] focus:border-[#009de2] transition-all duration-200"
                  >
                    <option value="EAPI">EAPI - Experience API</option>
                    <option value="PAPI">PAPI - Process API</option>
                    <option value="SAPI">SAPI - System API</option>
                  </select>
                </div>
              </div>

              {/* Second Row - Certificate and Dataweave Folder Names */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
                  <label htmlFor="certificate-folder" className="flex items-center text-xs font-medium text-[#333] mb-1">
                    Certificate Folder Name
                    <HelpTooltip text="Name of the folder where certificates should be stored." />
                  </label>
                  <input
                    type="text"
                    id="certificate-folder"
                    value={certificateFolderName}
                    onChange={(e) => setCertificateFolderName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-[#ddd] rounded focus:outline-none focus:ring-1 focus:ring-[#009de2] focus:border-[#009de2] transition-all duration-200"
                    placeholder="e.g., certificates"
                  />
                </div>

                <div className="flex-1">
                  <label htmlFor="dataweave-folder" className="flex items-center text-xs font-medium text-[#333] mb-1">
                    Dataweave Folder Name
                    <HelpTooltip text="Name of the folder where Dataweaves should be stored." />
                  </label>
                  <input
                    type="text"
                    id="dataweave-folder"
                    value={dataweaveFolderName}
                    onChange={(e) => setDataweaveFolderName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-[#ddd] rounded focus:outline-none focus:ring-1 focus:ring-[#009de2] focus:border-[#009de2] transition-all duration-200"
                    placeholder="e.g., transformations"
                  />
                </div>
              </div>



              {/* Environment Names */}
              <div>
                <label htmlFor="environments" className="flex items-center text-xs font-medium text-[#333] mb-1">
                  Environment Names
                  <HelpTooltip text="Name of the Environments that needs to be in mule project." />
                </label>
                
                {/* Display existing environments as tags */}
                {environments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2 p-2 border border-[#ddd] rounded bg-[#f8f9fa]">
                    {environments.map((env, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-[#009de2] text-white text-xs rounded"
                      >
                        {env}
                        <button
                          type="button"
                          onClick={() => handleRemoveEnvironment(env)}
                          className="text-white hover:text-red-200 ml-1"
                          title="Remove environment"
                        >
                          <FiX size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Input for adding new environment */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="environments"
                    value={currentEnvironment}
                    onChange={(e) => setCurrentEnvironment(e.target.value)}
                    onKeyPress={handleEnvironmentKeyPress}
                    className="flex-1 px-3 py-2 text-sm border border-[#ddd] rounded focus:outline-none focus:ring-1 focus:ring-[#009de2] focus:border-[#009de2] transition-all duration-200"
                    placeholder="Enter environment name (e.g., dev, staging, prod)"
                  />
                  <button
                    type="button"
                    onClick={handleAddEnvironment}
                    disabled={!currentEnvironment.trim() || environments.includes(currentEnvironment.trim())}
                    className="px-3 py-2 bg-[#009de2] text-white text-sm rounded hover:bg-[#007bb8] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add
                  </button>
                </div>
                <p className="text-xs text-[#666] mt-1">Press Enter or click Add to add an environment. Click × to remove.</p>
              </div>

              {/* Third Row - Options */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-[#333] mb-1">
                    Options
                  </label>
                  <div className="flex items-center px-3 py-2 border border-[#ddd] rounded bg-white">
                    <input
                      type="checkbox"
                      id="include-munits"
                      checked={includeMunits}
                      onChange={(e) => setIncludeMunits(e.target.checked)}
                      className="h-4 w-4 text-[#009de2] focus:ring-[#009de2] border-[#ddd] rounded"
                    />
                    <label htmlFor="include-munits" className="ml-2 text-sm font-medium text-[#333]">
                      Include MUnit Tests
                    </label>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-[#333] mb-1">
                    &nbsp;
                  </label>
                  <div className="flex items-center px-3 py-2 border border-[#ddd] rounded bg-white">
                    <input
                      type="checkbox"
                      id="generate-certs"
                      checked={generateCerts}
                      onChange={(e) => setGenerateCerts(e.target.checked)}
                      className="h-4 w-4 text-[#009de2] focus:ring-[#009de2] border-[#ddd] rounded"
                    />
                    <label htmlFor="generate-certs" className="ml-2 text-sm font-medium text-[#333]">
                      Generate Certificates
                    </label>
                  </div>
                </div>
              </div>

              {/* Fourth Row - CloudHub and File Upload */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
                  <label htmlFor="cloudhub-selection" className="block text-xs font-medium text-[#333] mb-1">
                    Select CloudHub <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="cloudhub-selection"
                    value={cloudHub}
                    onChange={(e) => setCloudHub(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-[#ddd] rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#009de2] focus:border-[#009de2] transition-all duration-200"
                  >
                    <option value="CloudHub 1">CloudHub 1</option>
                    <option value="CloudHub 2">CloudHub 2</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-[#333] mb-1">
                    Attach File (Optional)
                  </label>
                  <div className="border border-[#ddd] rounded p-2 text-center hover:border-[#009de2] hover:bg-[#f8f9fa] transition-all duration-200 h-[38px] flex items-center justify-center">
                    <input
                      type="file"
                      onChange={handleFileInputChange}
                      className="hidden"
                      id="file-upload"
                    />
                    {selectedFile ? (
                      <div className="flex items-center justify-between w-full bg-blue-50 px-2 py-1 rounded">
                        <div className="flex items-center gap-2">
                          <FiFile size={14} className="text-[#009de2]" />
                          <div>
                            <span className="text-xs font-medium text-[#333] truncate">{selectedFile.name}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleFileRemove}
                          className="p-1 text-red-600 hover:bg-red-100 rounded transition duration-200"
                          title="Remove file"
                        >
                          <FiX size={12} />
                        </button>
                      </div>
                    ) : (
                      <label htmlFor="file-upload" className="cursor-pointer flex items-center justify-center gap-2">
                        <FiUpload size={14} className="text-[#666]" />
                        <span className="text-xs text-[#333]">Click to upload</span>
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Anypoint Connector */}
              <div>
                <label className="flex items-center text-xs font-medium text-[#333] mb-1">
                  Anypoint Connector
                  <HelpTooltip text="Select the Connector that needs to be in project with its version Otherwise latest version will be used." />
                </label>
                
                {/* Display selected connectors as tags */}
                {selectedConnectors.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2 p-2 border border-[#ddd] rounded bg-[#f8f9fa]">
                    {selectedConnectors.map((connector, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-[#009de2] text-white text-xs rounded"
                      >
                        {connector.label}{connector.version ? ` v${connector.version}` : ' (latest)'}
                        <button
                          type="button"
                          onClick={() => handleRemoveConnector(connector)}
                          className="text-white hover:text-red-200 ml-1"
                          title="Remove connector"
                        >
                          <FiX size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Input for adding new connector */}
                {getConnectorOptions().length > 0 ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <select
                        value={currentConnector}
                        onChange={(e) => setCurrentConnector(e.target.value)}
                        className="flex-1 px-3 py-2 text-sm border border-[#ddd] rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#009de2] focus:border-[#009de2] transition-all duration-200"
                      >
                        <option value="">Select a connector...</option>
                        {getConnectorOptions().map((connector) => (
                          <option key={connector.value} value={connector.value}>
                            {connector.label}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={currentConnectorVersion}
                        onChange={(e) => setCurrentConnectorVersion(e.target.value)}
                        onKeyPress={handleConnectorKeyPress}
                        className="w-24 px-3 py-2 text-sm border border-[#ddd] rounded focus:outline-none focus:ring-1 focus:ring-[#009de2] focus:border-[#009de2] transition-all duration-200"
                        placeholder="Select version"
                      />
                      <button
                        type="button"
                        onClick={handleAddConnector}
                        disabled={!currentConnector.trim() || selectedConnectors.some(c => c.name === currentConnector)}
                        className="px-3 py-2 bg-[#009de2] text-white text-sm rounded hover:bg-[#007bb8] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Add
                      </button>
                    </div>
                    <p className="text-xs text-[#666]">Select a connector, optionally enter version, then press Enter or click Add. Click × to remove.</p>
                  </div>
                ) : (
                  <p className="text-[#666] text-xs p-2 border border-[#ddd] rounded bg-[#f8f9fa]">No connectors available for selected app layer type</p>
                )}
              </div>

              {/* Prompt */}
              <div>
                <label className="flex items-center text-xs font-medium text-[#333] mb-1">
                  Description/Prompt
                  <HelpTooltip text="Write something that you want to be in the project other than the specified details such as raml creation and dataweave generation" />
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => handlePromptChange(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#ddd] rounded focus:outline-none focus:ring-1 focus:ring-[#009de2] focus:border-[#009de2] transition-all duration-200"
                  rows={3}
                  placeholder="Describe the Mule application you want to generate..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#009de2] text-white font-medium rounded hover:bg-[#007bb8] transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  disabled={isLoading || !projectName.trim()}
                >
                  <FiSend size={14} />
                  {isLoading ? 'Generating...' : 'Generate Application'}
                </button>
              </div>

              {error && (
                <div className="p-3 text-red-600 bg-red-50 border border-red-200 rounded">
                  <strong>Error:</strong> {error}
                </div>
              )}
            </form>
          </div>
        )}
        {viewTab === 'output' && (
          <div className="w-full bg-white rounded shadow-sm border border-[#e1e4e8] overflow-hidden flex flex-col items-center justify-center h-[400px]">
            <div className="flex flex-col items-center justify-center w-full h-full p-5">
              <FiDownload size={48} className="text-[#009de2] mb-4" />
              <p className="mb-4 text-lg font-semibold text-[#333] text-center">Your Mule application is ready!</p>
              <p className="mb-6 text-[#666] text-center">Click the button below to download '<span className="font-mono text-sm bg-[#f8f9fa] px-2 py-1 rounded border">{filename}</span>'.</p>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 bg-[#009de2] text-white rounded hover:bg-[#007bb8] transition duration-200 ease-in-out shadow-sm"
              >
                <FiDownload />
                Download Mule Application
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MuleApplicationGenerator;