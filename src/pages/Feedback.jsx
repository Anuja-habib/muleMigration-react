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

    //const history = useHistory(); // Removed useHistory
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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

        // Simulate an API call
        try {
            // Send form data to your backend API
            const apiResponse = await fetch('http://127.0.0.1:5004/submitFeebdack', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!apiResponse.ok) {
                throw new Error(`HTTP error! status: ${apiResponse.status}`);
            }
             const responseData = await apiResponse.json();
            console.log('Response from /sendEmail:', responseData); // Log the response

            // Simulate a successful response
            const response = { ok: true, data: { message: 'Feedback submitted successfully!' } };

            if (response.ok) {
                setSubmissionStatus('success');
                setFormData({ name: '', email: '', feedback: '' });
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
