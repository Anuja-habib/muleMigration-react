import React, { useState } from 'react'
import { FiDownload, FiSend } from 'react-icons/fi'
import Editor from '@monaco-editor/react'
import { MuleAppGenerator } from '../seeds/features'
import HeroBanner from '../components/HeroPages/HeroBanner'
import config from '../config/config'
const MuleApplicationGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [error, setError] = useState('');
  const [filename, setFilename] = useState(`mule-application-${(+new Date()).toString(36)}.zip`);
  const [viewTab, setViewTab] = useState('input');

  const handlePromptChange = (value) => {
    setPrompt(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setFileUrl(null);

    try {
      const response = await fetch(config.apiUrlPython + '/generate-mule-app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include any custom headers your Flask API expects or sends in the preflight
          'X-Custom-Header': 'MuleAppGeneratorClient',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        // If the response is not OK, it might still be a JSON error from Flask
        // Try to parse as JSON first, then fall back to text or generic error
        let errorMessage = 'Failed to generate Mule application. Unknown error.';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (jsonError) {
          // If it's not JSON, read as text or use statusText
          errorMessage = response.statusText || errorMessage;
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

  return (
    <div className="max-w-[1200px] mx-auto p-6 font-sans"> {/* Added font-sans for Inter font */}
      <HeroBanner
        title={MuleAppGenerator.title || "Mule Application Generator"}
        subtitle="Generate Mule apps from your prompt"
        features={MuleAppGenerator.features}
      />

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {viewTab === 'input' && (
          <div className="w-full bg-white border border-[#e1e4e8] rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-shadow duration-200 ease-in-out hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex flex-col h-[400px]">
            <form onSubmit={handleSubmit} className="flex flex-col h-full">
              <div className="flex items-center justify-between px-4 py-3 bg-[#f6f8fa] border-b border-[#e1e4e8]">
                <span className="font-semibold text-lg text-gray-800">Prompt</span>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading || !prompt.trim()}
                >
                  <FiSend />
                  {isLoading ? 'Generating...' : 'Generate Application'}
                </button>
              </div>
              <div className="flex-1 overflow-auto">
                <Editor
                  height="100%"
                  defaultLanguage="markdown"
                  theme="vs-light"
                  value={prompt}
                  onChange={handlePromptChange}
                  options={{
                    fontSize: 16,
                    lineHeight: 1.8,
                    fontFamily: "'Fira Code', monospace",
                    minimap: { enabled: false },
                    wordWrap: 'on',
                    lineNumbers: 'on',
                    cursorStyle: 'line',
                  }}
                />
                {!prompt.trim() && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    Describe the Mule application you want to generate...
                  </div>
                )}
              </div>
              {error && (
                <div className="p-4 text-red-600 bg-red-50 border-t border-red-200 rounded-b-xl">
                  Error: {error}
                </div>
              )}
            </form>
          </div>
        )}
        {viewTab === 'output' && (
          <div className="w-full bg-white border border-[#e1e4e8] rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-shadow duration-200 ease-in-out hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center h-[400px]">
            <div className="flex flex-col items-center justify-center w-full h-full p-4">
              <FiDownload size={48} className="text-indigo-600 mb-4" />
              <p className="mb-4 text-lg font-semibold text-gray-800 text-center">Your Mule application is ready!</p>
              <p className="mb-6 text-gray-600 text-center">Click the button below to download '<span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{filename}</span>'.</p>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200 ease-in-out shadow-md hover:shadow-lg"
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