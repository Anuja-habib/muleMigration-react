import React, { useState, useRef, useEffect } from "react";
import FileUpload from "../components/FileUpload";
// import FileViewer from "../components/FileViewer";
import { FileExplorer } from "../components/FileExplorer";
import Alert from "react-bootstrap/Alert";
import config from "../config/config";
// import {SmallBanner} from '../components/Banner'
const WsdlToRaml = () => {
    let title = "WSDL to RAML Converter";
    let subtitle =
        'To use the tool, simply upload your WSDL file and click the "Convert" button. The tool will then generate a RAML file that you can download and use to create APIs.';
    const [originalFileData, setOriginalFileData] = useState(null);
    const [uploadedFileData, setUploadedFileData] = useState(null);
    const [apiResponseData, setApiResponseData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [mainFolderName, setMainFolderName] = useState(null);
    const [apiEndpoint, setApiEndpoint] = useState(config.apiUrlPython + "/wsdl-to-raml");
    const [uploadComplete, setUploadComplete] = useState(false);
    const [explorerWidth, setExplorerWidth] = useState(300);
    const sliderRef = useRef(null);
    const isResizing = useRef(false);
    const viewerRef = useRef(null);

    const handleFileUpload = (file, fileContent) => {
        setOriginalFileData({ result: fileContent, folderName: file.name });
        setUploadedFileData({ result: fileContent, folderName: file.name });
        setApiResponseData(null);
        setIsLoading(true);
        setError(null);
        setMainFolderName(file.name);

        const formData = new FormData();
        formData.append("file", file);

        fetch(apiEndpoint, {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setApiResponseData(data);
                setIsLoading(false);
                setUploadComplete(true);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
                setUploadComplete(false);
            });
    };

    const handleFileClick = (fileData) => {
        setOriginalFileData(fileData);
    };

    const handleMouseDown = (e) => {
        isResizing.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (!isResizing.current) return;
        const newWidth = e.clientX;
        setExplorerWidth(newWidth);
    };

    const handleMouseUp = () => {
        isResizing.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    useEffect(() => {
        if (viewerRef.current && originalFileData) {
            viewerRef.current.style.height = "auto"; // Reset height
            viewerRef.current.style.height = `${viewerRef.current.scrollHeight}px`; // Set height to content
        }
    }, [originalFileData]);

    return (
        <div>
            {uploadComplete ? (
                <div style={{ display: "flex", height: "100vh" }}>
                    <div
                        className="fileExplorer"
                        style={{
                            width: `${explorerWidth}px`,
                        }}
                    >
                        <FileExplorer fileStructure={apiResponseData} onFileClick={handleFileClick} />
                        <div
                            ref={sliderRef}
                            style={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                width: "5px",
                                height: "100%",
                                background: "#ddd",
                                cursor: "ew-resize",
                            }}
                            onMouseDown={handleMouseDown}
                        />
                    </div>
                    <div style={{ flex: 1, overflowX: "auto", display: "flex", flexDirection: "column" }}>
                        <div ref={viewerRef} style={{ width: "100%", overflow: "hidden" }}>
                            {/* <FileViewer apiResponse={originalFileData} error={error} isLoading={isLoading} /> */}
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    {/* <SmallBanner title={title} subtitle={subtitle} /> */}
                    <FileUpload onFileUpload={handleFileUpload} />
                </div>
            )}
        </div>
    );
};

export default WsdlToRaml;
