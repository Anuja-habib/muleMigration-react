import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { GrCopy } from "react-icons/gr";
import yaml from "js-yaml";
import { Oval } from  'react-loading-icons'
import { MdDownload } from "react-icons/md";
import '../css/textPreview.css';

// ... (formatXml and formatJava functions remain the same)

const FileViewer = ({ apiResponse, error, isLoading }) => {
    const [copied, setCopied] = useState(false);

    const handleDownload = () => {
        if (!apiResponse) return;
        const formattedData = formatData(apiResponse);
        const blob = new Blob([formattedData], { type: 'text/yaml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', apiResponse.filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const formatData = (data) => {
        if (!data || !data.result) return "";
        try {
            let filename = data.filename;
            let content = data.result;

            if (filename.includes('yaml') || filename.includes('raml')) {
                const parsedYaml = yaml.load(content);
                return yaml.dump(parsedYaml, { indent: 2 });
            }
            if (filename.includes('json')) {
                const parsedJson = JSON.parse(content);
                return JSON.stringify(parsedJson, null, 2);
            }
            if (filename.includes('xml')) {
                return formatXml(content);
            }
            if (filename.includes('java')) {
                return formatJava(content);
            }
            return content; // Return original if no formatting matches
        } catch (error) {
            console.error("Error formatting data:", error);
            return data.result;
        }
    };

    return (
        <div className="responsePreview" style={{ fontFamily: 'monospace', fontSize: '14px', maxHeight: '20%', overflowY: 'auto' }}> 
            {apiResponse ? (
                <div>
                    <CopyToClipboard text={JSON.stringify(apiResponse, null, 2)} onCopy={() => setCopied(true)}>
                        <button className="copyToClipboard">
                            {copied ? 'Copied!' : <GrCopy className='icon-style' />}
                        </button>
                    </CopyToClipboard>
                    <button className="downloadButton" onClick={handleDownload}>
                        <MdDownload className='icon-style' />
                    </button>
                    <SyntaxHighlighter language="*" style={dark}>
                        {formatData(apiResponse)}
                    </SyntaxHighlighter>
                </div>
            ) : isLoading ? (
                <Oval stroke="#000000" />
            ) : (
                <div>{error && <p>Error: {error.message}</p>}</div>
            )}
        </div>
    );
};

export default FileViewer;