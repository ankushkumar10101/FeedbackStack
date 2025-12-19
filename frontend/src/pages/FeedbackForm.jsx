import React, { useState } from 'react';
import StarRating from '../components/StarRating';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const FeedbackForm = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState('Website');
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            setError('Please select a rating to proceed.');
            return;
        }
        setIsSubmitting(true);
        try {
            await api.post('feedback/', {
                category,
                rating,
                message,
                suggestion
            });
            setTimeout(() => {
                setSubmitted(true);
                setError('');
                setIsSubmitting(false);
            }, 500);
        } catch (err) {
            console.error(err);
            setIsSubmitting(false);
            if (err.response && err.response.data) {
                 setError(typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data));
            } else if (err.message) {
                 setError(err.message);
            } else {
                 setError('Something went wrong. Please try again.');
            }
        }
    };

    if (submitted) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
                <div className="glass-card p-5 text-center shadow-lg animate-fade-in" style={{ maxWidth: '500px' }}>
                    <div className="mb-4">
                        <div className="d-inline-flex bg-success bg-opacity-10 text-success rounded-circle p-4 mb-3">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <h2 className="display-6 fw-bold text-dark mb-2">Thank You!</h2>
                        <p className="text-secondary mb-4">Your feedback helps us improve.</p>
                    </div>
                    <button 
                        className="btn btn-primary btn-lg px-5 rounded-pill hover-lift shadow-sm fw-semibold" 
                        onClick={() => window.location.reload()}
                        style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', border: 'none' }}
                    >
                        Submit Another
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center p-3">
            <div className="glass-card shadow-lg w-100 animate-fade-in" style={{ maxWidth: '1000px' }}>
                <div className="p-4 p-md-5">
                    <div className="mb-5">
                        {/* Mobile: Button relative at top right */}
                        <div className="d-flex d-md-none justify-content-end mb-2">
                            <button 
                                className="btn btn-sm btn-light rounded-pill px-3 shadow-sm text-secondary fw-bold small btn-smooth"
                                onClick={() => navigate('/login')}
                            >
                                View Feedbacks &rarr;
                            </button>
                        </div>

                        {/* Desktop: Button absolute top right, text centered */}
                        <div className="text-center position-relative">
                            <button 
                                className="btn btn-sm btn-light position-absolute top-0 end-0 rounded-pill px-3 shadow-sm text-secondary fw-bold small d-none d-md-block btn-smooth"
                                onClick={() => navigate('/login')}
                            >
                                View Feedbacks &rarr;
                            </button>
                            <h2 className="fw-bold display-6 mb-1"><span className="gradient-text">Feedback</span>Stack</h2>
                            <p className="text-secondary ">Anonymous Feedback Collection Platform</p>
                        </div>
                    </div>

                    {error && (
                        <div className="alert alert-danger border-0 rounded-4 mb-4 d-flex align-items-center bg-danger bg-opacity-10 text-danger">
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="me-2 text-danger">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="row g-4 align-items-start">
                            {/* Row 1: Category | Comments */}
                            <div className="col-md-6">
                                <label className="form-label text-secondary small fw-bold text-uppercase ls-1">Category</label>
                                <select 
                                    className="form-select form-select-lg border-2 bg-light rounded-4 fs-6 py-3 custom-select" 
                                    value={category} 
                                    onChange={(e) => setCategory(e.target.value)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <option value="Website">Website Experience</option>
                                    <option value="Teaching">Teaching Quality</option>
                                    <option value="Service">Customer Service</option>
                                    <option value="Product">Product Features</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            
                            <div className="col-md-6">
                                <label className="form-label text-secondary small fw-bold text-uppercase ls-1">Comments</label>
                                <textarea
                                    className="form-control border-2 bg-light rounded-4 p-3"
                                    rows="1" 
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    placeholder="Tell us what you liked or didn't like..."
                                    style={{ resize: 'none', height: '58px' }} 
                                ></textarea>
                                {/* Adjusted height to match select input roughly if single line, or keep it larger */}
                            </div>

                            {/* Row 2: Rating | Suggestion */}
                            <div className="col-md-6">
                                <div className="p-3 bg-light bg-opacity-50 rounded-4 border border-light text-center h-100 d-flex flex-column justify-content-center align-items-center">
                                    <label className="form-label text-secondary small fw-bold text-uppercase ls-1 mb-2">Your Rating</label>
                                    <StarRating rating={rating} setRating={setRating} />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="h-100 d-flex flex-column justify-content-center">
                                     <label className="form-label text-secondary small fw-bold text-uppercase ls-1">Suggestion <span className="text-muted fw-normal">(Optional)</span></label>
                                     <input
                                         type="text"
                                         className="form-control border-2 bg-light rounded-4 py-3"
                                         value={suggestion}
                                         onChange={(e) => setSuggestion(e.target.value)}
                                         placeholder="Any ideas for improvement?"
                                     />
                                </div>
                            </div>
                            
                            {/* Submit Row */}
                            <div className="col-12 mt-5">
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="btn btn-primary w-100 btn-lg rounded-pill py-3 fw-bold shadow-sm hover-lift d-flex align-items-center justify-content-center btn-smooth"
                                    style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', border: 'none' }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Sending...
                                        </>
                                    ) : 'Submit Feedback'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FeedbackForm;
