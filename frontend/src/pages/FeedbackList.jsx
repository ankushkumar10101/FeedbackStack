import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const FeedbackList = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('analytics/');
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: '#f8fafc' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-vh-100 py-5" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)' }}>
            <div className="container">
                {/* Header Section */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 animate-fade-in">
                    <div className="mb-4 mb-md-0 text-center text-md-start">
                        <h1 className="fw-bold text-dark mb-1 display-6">Dashboard</h1>
                        <p className="text-secondary mb-0">Insights from user feedback</p>
                    </div>
                    <button 
                         className="btn btn-sm btn-light rounded-pill px-3 shadow-sm text-secondary fw-bold small"
                         onClick={() => navigate('/')}
                    >
                        &larr; Back to Home
                    </button>
                </div>

                {/* Global Stats */}
                <div className="row g-4 mb-5 animate-fade-in">
                     <div className="col-md-6 col-lg-3 offset-lg-3">
                        <div className="glass-card p-4 text-center h-100 position-relative overflow-hidden group-hover-lift">
                            <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary opacity-0" style={{ opacity: 0.02 }}></div>
                            <h3 className="display-4 fw-bold text-primary mb-0">{data?.total_feedback}</h3>
                            <p className="text-uppercase text-secondary small fw-bold ls-2 mt-2 mb-0" style={{ fontSize: '0.7rem' }}>Total Responses</p>
                        </div>
                     </div>
                     <div className="col-md-6 col-lg-3">
                        <div className="glass-card p-4 text-center h-100 position-relative overflow-hidden group-hover-lift">
                             <div className="position-absolute top-0 start-0 w-100 h-100 bg-warning opacity-0" style={{ opacity: 0.02 }}></div>
                            <div className="d-flex align-items-center justify-content-center gap-2">
                                <span className="display-4 fw-bold text-dark">{data?.average_rating}</span>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="#fbbf24" stroke="none">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                            </div>
                            <p className="text-uppercase text-secondary small fw-bold ls-2 mt-2 mb-0" style={{ fontSize: '0.7rem' }}>Avg Rating</p>
                        </div>
                     </div>
                </div>

                {/* Category Grid */}
                <div className="row g-4">
                    {data?.category_breakdown?.map((cat, index) => (
                        <div key={index} className="col-lg-6">
                            <div className="glass-card h-100 d-flex flex-column animate-fade-in hover-lift" 
                                 style={{ 
                                     animationDelay: `${index * 0.1}s`,
                                     border: '1px solid rgba(255, 255, 255, 0.6)',
                                     boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.05)'
                                 }}>
                                
                                {/* Header */}
                                <div className="p-4 d-flex justify-content-between align-items-center border-bottom border-light bg-white bg-opacity-25">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="rounded-circle bg-white shadow-sm p-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                            <span className="fw-bold text-primary fs-5">{cat.category.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <h4 className="fw-bold m-0 text-dark" style={{ letterSpacing: '-0.5px' }}>{cat.category}</h4>
                                            <div className="d-flex align-items-center gap-1 mt-1">
                                                <span className="fw-bold small text-dark">{cat.average_rating}</span>
                                                <div className="d-flex text-warning" style={{ fontSize: '0.8rem' }}>
                                                    {[...Array(5)].map((_, i) => (
                                                        <span key={i} style={{ opacity: i < Math.round(cat.average_rating) ? 1 : 0.3 }}>★</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="badge bg-dark bg-opacity-10 text-dark rounded-pill px-3 py-2 fw-normal border border-dark border-opacity-10">
                                        {cat.feedback_count}
                                    </span>
                                </div>

                                <div className="p-4 d-flex flex-column flex-fill">
                                    {/* Comments */}
                                    <div className="mb-4">
                                        <h6 className="text-uppercase text-secondary fw-bold small mb-3 ls-1" style={{ fontSize: '0.75rem' }}>Latest Comments</h6>
                                        {cat.comments?.length > 0 ? (
                                            <div className="d-flex flex-column gap-3">
                                                {cat.comments.slice(0, 3).map((cmnt, i) => (
                                                    <div key={i} className="position-relative ps-3">
                                                        <div className="position-absolute top-0 start-0 bottom-0 bg-primary opacity-25 rounded-pill" style={{ width: '3px' }}></div>
                                                        <p className="mb-0 text-dark bg-light bg-opacity-50 p-3 rounded-3 small lh-base" style={{ fontSize: '0.95rem' }}>
                                                            {cmnt}
                                                        </p>
                                                    </div>
                                                ))}
                                                {cat.comments.length > 3 && (
                                                    <button className="btn btn-link btn-sm text-secondary text-decoration-none p-0 text-start w-auto">
                                                        View all {cat.comments.length} comments &rarr;
                                                    </button>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="text-center py-4 rounded-3 border border-dashed border-light">
                                                <p className="text-muted small mb-0">No comments yet</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Suggestions */}
                                    <div className="mt-auto pt-3 border-top border-light">
                                        <h6 className="text-uppercase text-secondary fw-bold small mb-3 ls-1" style={{ fontSize: '0.75rem' }}>Improvements</h6>
                                        {cat.suggestions?.length > 0 ? (
                                            <div className="d-flex flex-wrap gap-2">
                                                {cat.suggestions.slice(0, 5).map((sugg, i) => (
                                                    <span key={i} className="badge bg-white text-secondary border shadow-sm px-3 py-2 fw-normal rounded-2 d-flex align-items-center gap-2">
                                                         <span className="text-primary">•</span> {sugg}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-muted small fst-italic mb-0">No suggestions recorded</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeedbackList;
