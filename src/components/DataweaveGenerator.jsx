import React, { useState } from 'react'
import { FiDownload, FiCopy, FiSend, FiCheck } from 'react-icons/fi'
import Editor from '@monaco-editor/react'
import config from '../config/config'
import HeroBanner from './HeroPages/HeroBanner'
import { DataweaveGeneratorTexts } from '../seeds/features'

const DataweaveGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [expectedOutput, setExpectedOutput] = useState('');
  const [generatedDataweave, setGeneratedDataweave] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [responseMetadata, setResponseMetadata] = useState(null);
  const [inputFormat, setInputFormat] = useState('JSON');
  const [outputFormat, setOutputFormat] = useState('JSON');
  const [prompt, setPrompt] = useState('');

  // Format options for the dropdowns
  const formatOptions = [
    'JSON',
    'CSV',
    'XML',
    'NDJSON',
    'DWL',
    'XLSX',
    'TEXT',
    'MULTIPART',
    'YAML',
    'URLENCODED'
  ];

  // Get Monaco Editor language based on format
  const getEditorLanguage = (format) => {
    switch (format) {
      case 'JSON':
      case 'NDJSON':
        return 'json';
      case 'XML':
        return 'xml';
      case 'YAML':
        return 'yaml';
      case 'DWL':
        return 'scala'; // DataWeave uses Scala-like syntax
      case 'CSV':
      case 'TEXT':
      case 'MULTIPART':
      case 'URLENCODED':
      case 'XLSX':
      default:
        return 'text';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setGeneratedDataweave('');
    setResponseMetadata(null);

    try {
      const jsonPayload = {
        input: inputText,
        expectedOutput: expectedOutput,
        inputFormat: inputFormat,
        outputFormat: outputFormat,
        prompt: prompt
      };

      console.log('Sending request to generate-dataweave...');
      console.log('Request payload:', jsonPayload);
      
      const response = await fetch(config.apiUrlPython + '/generate-dataweave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonPayload),
      });

      if (!response.ok) {
        console.error('API response not OK:', response.status, response.statusText);
        let errorMessage = 'Failed to generate Dataweave code. Unknown error.';
        try {
          const errorData = await response.json();
          console.error('API error data:', errorData);
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (jsonError) {
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

      const result = await response.json();
      console.log('API Response:', result);
      
      // Handle the new response format
      if (result.success && result.dataweave_code) {
        setGeneratedDataweave(result.dataweave_code);
        // Store metadata for display
        setResponseMetadata({
          success: result.success,
          executionTime: result.execution_time,
          bestPractices: result.best_practices,
          iterations: result.validation_results?.iterations,
          finalMatch: result.validation_results?.final_match
        });
      } else if (result.dataweave_code) {
        // Even if success is false, show the code if available
        setGeneratedDataweave(result.dataweave_code);
        setResponseMetadata({
          success: result.success,
          executionTime: result.execution_time,
          bestPractices: result.best_practices,
          iterations: result.validation_results?.iterations,
          finalMatch: result.validation_results?.final_match
        });
      } else {
        // Fallback for other response formats or missing code
        setGeneratedDataweave(result.dataweave || result.code || 'No dataweave code returned');
      }

    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!generatedDataweave) return;
    
    try {
      await navigator.clipboard.writeText(generatedDataweave);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownload = () => {
    if (!generatedDataweave) return;
    
    const blob = new Blob([generatedDataweave], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dataweave-${(+new Date()).toString(36)}.dwl`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-1">
        <div className="max-w-[1200px] mx-auto p-6 font-sans">
          <HeroBanner
            title={DataweaveGeneratorTexts.title}
            subtitle={DataweaveGeneratorTexts.subtitle}
            features={DataweaveGeneratorTexts.features}
          />

          <div className="bg-white rounded shadow-sm border border-[#e1e4e8] overflow-hidden mt-6">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Input and Expected Output Row */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-[#333]">
                      Input Data <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={inputFormat}
                      onChange={(e) => setInputFormat(e.target.value)}
                      className="px-3 py-1 text-xs border border-[#ddd] rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#009de2] focus:border-[#009de2] transition-all duration-200"
                    >
                      {formatOptions.map((format) => (
                        <option key={format} value={format}>
                          {format}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="border border-[#ddd] rounded focus-within:ring-1 focus-within:ring-[#009de2] focus-within:border-[#009de2] transition-all duration-200 overflow-hidden">
                    <Editor
                      height="300px"
                      defaultLanguage={getEditorLanguage(inputFormat)}
                      theme="vs-light"
                      value={inputText}
                      onChange={(value) => setInputText(value || '')}
                      options={{
                        tabSize: 2,
                        insertSpaces: true,
                        detectIndentation: true,
                        fontSize: 15,
                        lineHeight: 1.6,
                        fontFamily: "'Menlo', 'Monaco', 'Courier New', monospace",
                        minimap: { enabled: false },
                        wordWrap: 'on',
                        lineNumbers: 'on',
                        cursorStyle: 'line',
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        padding: { top: 10, bottom: 10 },
                        bracketPairColorization: { enabled: true },
                        folding: true,
                        foldingHighlight: true,
                        showFoldingControls: 'mouseover',
                        formatOnPaste: true,
                        formatOnType: true
                      }}
                      onMount={(editor) => {
                        editor.getModel()?.updateOptions({ tabSize: 2 });
                        // Auto-format on mount if content exists
                        if (inputText) {
                          editor.getAction('editor.action.formatDocument')?.run();
                        }
                      }}
                    />
                  </div>
                  <p className="text-xs text-[#666] mt-1">Selected format: {inputFormat}</p>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-[#333]">
                      Expected Output <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={outputFormat}
                      onChange={(e) => setOutputFormat(e.target.value)}
                      className="px-3 py-1 text-xs border border-[#ddd] rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#009de2] focus:border-[#009de2] transition-all duration-200"
                    >
                      {formatOptions.map((format) => (
                        <option key={format} value={format}>
                          {format}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="border border-[#ddd] rounded focus-within:ring-1 focus-within:ring-[#009de2] focus-within:border-[#009de2] transition-all duration-200 overflow-hidden">
                    <Editor
                      height="300px"
                      defaultLanguage={getEditorLanguage(outputFormat)}
                      theme="vs-light"
                      value={expectedOutput}
                      onChange={(value) => setExpectedOutput(value || '')}
                      options={{
                        tabSize: 2,
                        insertSpaces: true,
                        detectIndentation: true,
                        fontSize: 15,
                        lineHeight: 1.6,
                        fontFamily: "'Menlo', 'Monaco', 'Courier New', monospace",
                        minimap: { enabled: false },
                        wordWrap: 'on',
                        lineNumbers: 'on',
                        cursorStyle: 'line',
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        padding: { top: 10, bottom: 10 },
                        bracketPairColorization: { enabled: true },
                        folding: true,
                        foldingHighlight: true,
                        showFoldingControls: 'mouseover',
                        formatOnPaste: true,
                        formatOnType: true
                      }}
                      onMount={(editor) => {
                        editor.getModel()?.updateOptions({ tabSize: 2 });
                        // Auto-format on mount if content exists
                        if (expectedOutput) {
                          editor.getAction('editor.action.formatDocument')?.run();
                        }
                      }}
                    />
                  </div>
                  <p className="text-xs text-[#666] mt-1">Selected format: {outputFormat}</p>
                </div>
              </div>

              {/* Prompt Field */}
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-[#333] mb-2">
                  Additional Instructions (Optional)
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#ddd] rounded focus:outline-none focus:ring-1 focus:ring-[#009de2] focus:border-[#009de2] transition-all duration-200"
                  rows={4}
                  placeholder="Add any specific instructions or requirements for the DataWeave transformation (e.g., handle null values, apply specific formatting, use certain functions, etc.)"
                />
                <p className="text-xs text-[#666] mt-1">
                  Provide additional context or specific requirements for the DataWeave code generation
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-2 bg-[#009de2] text-white font-medium rounded hover:bg-[#007bb8] transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  disabled={isLoading || !inputText.trim() || !expectedOutput.trim()}
                >
                  <FiSend size={16} />
                  {isLoading ? 'Generating...' : 'Generate Dataweave'}
                </button>
              </div>

              {/* Error Display */}
              {error && (
                <div className="p-4 text-red-600 bg-red-50 border border-red-200 rounded">
                  <strong>Error:</strong> {error}
                </div>
              )}

              {/* Generated Dataweave Section */}
              {(generatedDataweave || isLoading) && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-[#333]">
                      Generated Dataweave Code
                    </label>
                    {generatedDataweave && (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleCopy}
                          className="flex items-center gap-1 px-3 py-1 text-sm bg-[#f8f9fa] border border-[#ddd] rounded hover:bg-[#e2e6ea] transition duration-200"
                          title="Copy to clipboard"
                        >
                          {copied ? <FiCheck size={14} className="text-green-600" /> : <FiCopy size={14} />}
                          {copied ? 'Copied!' : 'Copy'}
                        </button>
                        <button
                          type="button"
                          onClick={handleDownload}
                          className="flex items-center gap-1 px-3 py-1 text-sm bg-[#f8f9fa] border border-[#ddd] rounded hover:bg-[#e2e6ea] transition duration-200"
                          title="Download as .dwl file"
                        >
                          <FiDownload size={14} />
                          Download
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="border border-[#ddd] rounded bg-[#f8f9fa] overflow-hidden">
                    {isLoading ? (
                      <div className="flex items-center justify-center h-[400px] text-[#666]">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#009de2] mx-auto mb-2"></div>
                          <p>Generating Dataweave code...</p>
                        </div>
                      </div>
                    ) : generatedDataweave ? (
                      <Editor
                        height="400px"
                        defaultLanguage="scala"
                        theme="vs-light"
                        value={generatedDataweave}
                        options={{
                          readOnly: true,
                          tabSize: 2,
                          insertSpaces: true,
                          fontSize: 14,
                          lineHeight: 1.6,
                          fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
                          minimap: { enabled: false },
                          wordWrap: 'on',
                          lineNumbers: 'on',
                          cursorStyle: 'line',
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                          padding: { top: 10, bottom: 10 },
                          bracketPairColorization: { enabled: true },
                          folding: true,
                          foldingHighlight: true,
                          showFoldingControls: 'mouseover',
                          contextmenu: false,
                          selectOnLineNumbers: true
                        }}
                        onMount={(editor) => {
                          // Auto-format the generated code
                          setTimeout(() => {
                            editor.getAction('editor.action.formatDocument')?.run();
                          }, 100);
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-[400px] text-[#999] text-sm">
                        Generated Dataweave code will appear here...
                      </div>
                    )}
                  </div>
                  
                  {/* Generation Metadata */}
                  {responseMetadata && (
                    <div className="mt-3 p-3 bg-[#f8f9fa] border border-[#e1e4e8] rounded text-sm">
                      <div className="flex flex-wrap gap-4 text-xs">
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-[#333]">Status:</span>
                          <span className={`px-2 py-1 rounded text-white ${responseMetadata.success ? 'bg-green-500' : 'bg-yellow-500'}`}>
                            {responseMetadata.success ? 'Success' : 'Partial'}
                          </span>
                        </div>
                        {responseMetadata.executionTime && (
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-[#333]">Execution Time:</span>
                            <span className="text-[#666]">{responseMetadata.executionTime}</span>
                          </div>
                        )}
                        {responseMetadata.iterations && (
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-[#333]">Iterations:</span>
                            <span className="text-[#666]">{responseMetadata.iterations}</span>
                          </div>
                        )}
                        {typeof responseMetadata.finalMatch === 'boolean' && (
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-[#333]">Final Match:</span>
                            <span className={`px-2 py-1 rounded text-white text-xs ${responseMetadata.finalMatch ? 'bg-green-500' : 'bg-orange-500'}`}>
                              {responseMetadata.finalMatch ? 'Yes' : 'No'}
                            </span>
                          </div>
                        )}
                      </div>
                      {responseMetadata.bestPractices && (
                        <div className="mt-2">
                          <span className="font-medium text-[#333]">Best Practices Applied:</span>
                          <p className="text-[#666] mt-1">{responseMetadata.bestPractices}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataweaveGenerator; 