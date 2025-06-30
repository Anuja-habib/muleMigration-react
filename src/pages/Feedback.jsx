import React, { useState } from 'react';
import '../css/Feedback.css'; // Import the CSS file
//import { useHistory } from 'react-router-dom'; // Removed react-router-dom v5
import { SmallBanner } from '../components/Banner';



const FeedbackForm = () => {
    let title = 'Provide Your Feedback';
    let subtitle = 'We are constantly striving to improve and your insights help us get better.';
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        feedback: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [isDragOver, setIsDragOver] = useState(false);

    //const history = useHistory(); // Removed useHistory
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageSelect = (files) => {
        const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
        const newImages = imageFiles.map(file => ({
            file,
            id: Date.now() + Math.random(),
            preview: URL.createObjectURL(file)
        }));
        setSelectedImages(prev => [...prev, ...newImages]);
    };

    const handleImageInputChange = (e) => {
        if (e.target.files.length > 0) {
            handleImageSelect(e.target.files);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleImageSelect(files);
        }
    };

    const removeImage = (imageId) => {
        setSelectedImages(prev => {
            const imageToRemove = prev.find(img => img.id === imageId);
            if (imageToRemove) {
                URL.revokeObjectURL(imageToRemove.preview);
            }
            return prev.filter(img => img.id !== imageId);
        });
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name.trim()) {
            setSubmissionStatus('error');
            setErrorMessage('Please enter your name.');
            return;
        }
        if (!formData.email.trim() || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
            setSubmissionStatus('error');
            setErrorMessage('Please enter a valid email address.');
            return;
        }
        if (!formData.feedback.trim()) {
            setSubmissionStatus('error');
            setErrorMessage('Please enter your feedback.');
            return;
        }

        setIsSubmitting(true);
        setSubmissionStatus('idle');
        setErrorMessage('');

        // Convert images to base64 and send everything as JSON
        try {
            console.log('Preparing feedback submission...');
            console.log('Selected images count:', selectedImages.length);
            
            // Convert images to base64
            const imagePromises = selectedImages.map((imageData) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        resolve({
                            name: imageData.file.name,
                            type: imageData.file.type,
                            size: imageData.file.size,
                            data: e.target.result // This includes the data:image/type;base64, prefix
                        });
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(imageData.file);
                });
            });

            const base64Images = await Promise.all(imagePromises);
            console.log(`Converted ${base64Images.length} images to base64`);

            // Create JSON payload with all data including base64 images
            const jsonPayload = {
                name: formData.name,
                email: formData.email,
                feedback: formData.feedback,
                images: base64Images
            };

            console.log('Sending JSON payload with images as base64...');

            const apiResponse = await fetch('http://127.0.0.1:5001/submitFeedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonPayload),
            });

            // Handle response once for both cases
            if (!apiResponse.ok) {
                // Better error handling for debugging - read response only once
                let errorMessage = `HTTP error! status: ${apiResponse.status}`;
                try {
                    const responseText = await apiResponse.text();
                    try {
                        // Try to parse as JSON first
                        const errorData = JSON.parse(responseText);
                        errorMessage += ` - ${JSON.stringify(errorData)}`;
                    } catch (jsonParseError) {
                        // If not JSON, use as text
                        errorMessage += ` - ${responseText}`;
                    }
                } catch (readError) {
                    errorMessage += ` - Unable to read response body`;
                }
                throw new Error(errorMessage);
            }
            
            const responseData = await apiResponse.json();
            console.log('Response from /submitFeedback:', responseData);

            // Simulate a successful response
            const response = { ok: true, data: { message: 'Feedback submitted successfully!' } };

            if (response.ok) {
                setSubmissionStatus('success');
                setFormData({ name: '', email: '', feedback: '' });
                // Clean up image previews
                selectedImages.forEach(image => URL.revokeObjectURL(image.preview));
                setSelectedImages([]);
                 //history.push('/'); //removed
            } else {
                setSubmissionStatus('error');
                setErrorMessage('Failed to submit feedback. Please try again.'); // Or use error from response
            }
        } catch (error) {
            setSubmissionStatus('error');
            setErrorMessage(error.message || 'An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div> 
            <SmallBanner title={title} subtitle={subtitle} />
        <div className="feedback-form-container">
            <div className="feedback-form-wrapper">
                <div className="feedback-form-header">
                    <h2 className="feedback-form-title">
                        Feedback Form
                    </h2>
                    <p className="feedback-form-description">
                        Please provide your feedback below.
                    </p>
                </div>
                <form className="feedback-form" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="name" className="feedback-label">
                                Name <span className="required-star">*</span>
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="feedback-input"
                                placeholder="Your Name"
                                disabled={isSubmitting}

                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="feedback-label">
                                Email address <span className="required-star">*</span>
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="feedback-input"
                                placeholder="youremail@example.com"
                                disabled={isSubmitting}

                            />
                        </div>
                        <div>
                            <label htmlFor="feedback" className="feedback-label">
                                Your Feedback <span className="required-star">*</span>
                            </label>
                            <textarea
                                id="feedback"
                                name="feedback"
                                rows={4}
                                required
                                value={formData.feedback}
                                onChange={handleChange}
                                className="feedback-textarea"
                                placeholder="Your Feedback"
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Image Upload Section */}
                        <div>
                            <label className="feedback-label">
                                Images (Optional)
                            </label>
                            <div
                                className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
                                    isDragOver 
                                        ? 'border-blue-500 bg-blue-50' 
                                        : 'border-gray-300 hover:border-gray-400'
                                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                style={{ minHeight: '120px' }}
                            >
                                <div className="flex flex-col items-center justify-center space-y-2">
                                    <svg
                                        className={`w-12 h-12 ${isDragOver ? 'text-blue-500' : 'text-gray-400'}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                        />
                                    </svg>
                                    <p className="text-lg font-medium text-gray-700">
                                        Drop images here, or click to browse
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        PNG, JPG, GIF up to 10MB each
                                    </p>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageInputChange}
                                        className="hidden"
                                        id="image-upload"
                                        disabled={isSubmitting}
                                    />
                                    <label
                                        htmlFor="image-upload"
                                        className={`inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition duration-200 ${
                                            isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'
                                        }`}
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Choose Images
                                    </label>
                                </div>
                            </div>

                            {/* Selected Images Preview */}
                            {selectedImages.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-700 mb-3">
                                        Selected Images ({selectedImages.length})
                                    </p>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        {selectedImages.map((image) => (
                                            <div key={image.id} className="relative group">
                                                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                                    <img
                                                        src={image.preview}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(image.id)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition duration-200"
                                                    disabled={isSubmitting}
                                                >
                                                    ×
                                                </button>
                                                <div className="mt-1 text-xs text-gray-500 truncate">
                                                    {image.file.name}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {formatFileSize(image.file.size)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="feedback-form-required-fields">
                        <span className="required-star">*</span>
                        Required fields
                    </div>
                    <div className="feedback-button-wrapper">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="feedback-submit-button"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                        </button>
                    </div>

                    {/* Status Messages */}
                    {submissionStatus === 'success' && (
                        <div className="feedback-success-message" role="alert">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    {/* Success Icon (replace with a suitable icon if you have one) */}
                                    <svg
                                                                                className="h-5 w-5 text-green-500"
                                                                                fill="currentColor"
                                                                                viewBox="0 0 20 20"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <path
                                                                                    fillRule="evenodd"
                                                                                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z"
                                                                                    clipRule="evenodd"
                                                                                />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium">Success!</p>
                                    <p className="text-sm">Thank you for your feedback.</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {submissionStatus === 'error' && (
                        <div className="feedback-error-message" role="alert">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    {/* Error Icon (replace with a suitable icon) */}
                                    <svg
                                                                                className="h-5 w-5 text-red-500"
                                                                                fill="currentColor"
                                                                                viewBox="0 0 20 20"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <path
                                                                                    fillRule="evenodd"
                                                                                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM8.707 8.707L10 10l1.293-1.293a1 1 0 1 1 1.414 1.414L11.414 10l1.293 1.293a1 1 0 0 1-1.414 1.414L10 11.414l-1.293 1.293a1 1 0 0 1-1.414-1.414L8.586 10 7.293 8.707a1 1 0 0 1 1.414-1.414z"
                                                                                    clipRule="evenodd"
                                                                                />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium">Error</p>
                                    <p className="text-sm">{errorMessage}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>

        </div>
    );
};

export default FeedbackForm;
