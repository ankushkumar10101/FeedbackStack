import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const FeedbackList = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Overview');

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

    const categories = ['Overview', ...(data?.category_breakdown?.map(c => c.category) || [])];
    const activeCategoryData = data?.category_breakdown?.find(c => c.category === activeTab);

    const categoryDisplayMap = {
        'Website': 'Website Experience',
        'Teaching': 'Teaching Quality',
        'Service': 'Customer Service',
        'Product': 'Product Features',
        'Other': 'Other',
        'Overview': 'Overview'
    };

    return (
        <div className="min-vh-100 py-5 overflow-x-hidden" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)' }}>
            <div className="container">
                {/* Header Section */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 animate-fade-in">
                    <div className="mb-4 mb-md-0 text-center text-md-start">
                        <h1 className="fw-bold text-dark mb-1 display-6">Dashboard</h1>
                        <p className="text-secondary mb-0">Insights from user feedback</p>
                    </div>
                    <button 
                         className="btn btn-white bg-white btn-smooth shadow-sm text-secondary fw-bold rounded-pill px-4"
                         onClick={() => navigate('/')}
                    >
                        <i className="bi bi-arrow-left me-2"></i> Back to Home
                    </button>
                </div>

                {/* Tabs Navigation - Wrapped Layout */}
                <div className="mb-5 d-flex flex-wrap justify-content-center justify-content-md-start gap-3 animate-fade-in">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`btn rounded-pill px-4 py-2 fw-bold btn-smooth border ${
                                activeTab === cat 
                                ? 'btn-white text-primary shadow-sm border-white' 
                                : 'btn-white bg-white text-secondary border-light hover-shadow'
                            }`}
                        >
                            {categoryDisplayMap[cat] || cat}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="animate-fade-in">
                    {activeTab === 'Overview' ? (
                        <>
                            {/* Global KPI Cards - Distinct Data Blocks */}
                            <div className="row g-5 mb-5">
                                 <div className="col-md-6">
                                    <div className="glass-card p-5 d-flex align-items-center justify-content-between h-100 hover-lift shadow-sm border border-white">
                                        <div>
                                            <p className="text-secondary small fw-bold text-uppercase mb-2 ls-1">Total Feedback</p>
                                            <h2 className="display-3 fw-bold text-dark mb-0">{data?.total_feedback}</h2>
                                        </div>
                                        <div className="bg-primary bg-opacity-10 rounded-circle text-primary d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                                            <i className="bi bi-chat-square-text fs-2"></i>
                                        </div>
                                    </div>
                                 </div>
                                 <div className="col-md-6">
                                    <div className="glass-card p-5 d-flex align-items-center justify-content-between h-100 hover-lift shadow-sm border border-white">
                                        <div>
                                            <p className="text-secondary small fw-bold text-uppercase mb-2 ls-1">Average Rating</p>
                                            <div className="d-flex align-items-center gap-3">
                                                <h2 className="display-3 fw-bold text-dark mb-0">{data?.average_rating}</h2>
                                                <div className="d-flex text-warning fs-4">
                                                    {[...Array(5)].map((_, i) => (
                                                        <i key={i} className={`bi ${i < Math.round(data?.average_rating || 0) ? 'bi-star-fill' : 'bi-star'} me-1`}></i>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-warning bg-opacity-10 rounded-circle text-warning d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                                            <i className="bi bi-star fs-2"></i>
                                        </div>
                                    </div>
                                 </div>
                            </div>

                            {/* Summary Table - Distinct Block */}
                            <div className="glass-card overflow-hidden shadow-sm border border-white">
                                <div className="p-4 border-bottom border-light bg-white bg-opacity-50">
                                    <h5 className="fw-bold m-0 d-flex align-items-center gap-2">
                                        <i className="bi bi-bar-chart-fill text-primary"></i> Category Performance
                                    </h5>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover mb-0 align-middle">
                                        <thead className="bg-light">
                                            <tr>
                                                <th className="ps-4 py-4 text-secondary small fw-bold text-uppercase border-0">Category</th>
                                                <th className="py-4 text-secondary small fw-bold text-uppercase border-0 text-center">Responses</th>
                                                <th className="py-4 text-secondary small fw-bold text-uppercase border-0 text-center">Rating</th>
                                                <th className="pe-4 py-4 text-secondary small fw-bold text-uppercase border-0 text-end">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data?.category_breakdown?.map((cat, idx) => (
                                                <tr key={idx} style={{ cursor: 'pointer' }} onClick={() => setActiveTab(cat.category)} className="group-hover-bg">
                                                    <td className="ps-4 py-4 border-light">
                                                        <div className="d-flex align-items-center gap-3">
                                                            <div className="rounded-circle bg-white border shadow-sm text-primary d-flex align-items-center justify-content-center fw-bold" style={{ width: '48px', height: '48px', fontSize: '1.1rem' }}>
                                                                {(categoryDisplayMap[cat.category] || cat.category).charAt(0)}
                                                            </div>
                                                            <span className="fw-bold text-dark fs-5">{categoryDisplayMap[cat.category] || cat.category}</span>
                                                        </div>
                                                    </td>
                                                    <td className="text-center border-light">
                                                        <span className="badge bg-light text-dark border border-secondary border-opacity-25 fw-bold px-3 py-2 rounded-pill" style={{ minWidth: '40px' }}>
                                                            {cat.feedback_count}
                                                        </span>
                                                    </td>
                                                    <td className="text-center border-light">
                                                        <div className="d-flex align-items-center justify-content-center gap-2">
                                                            <span className="fw-bold fs-5">{cat.average_rating}</span>
                                                            <span className="text-warning"><i className="bi bi-star-fill"></i></span>
                                                        </div>
                                                    </td>
                                                    <td className="pe-4 text-end border-light">
                                                        <button className="btn btn-light rounded-pill text-primary fw-bold px-4 btn-smooth">
                                                            View Details <i className="bi bi-chevron-right small ms-1"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    ) : (
                        // Detailed Category View - Distinct Block
                        <div className="glass-card shadow-lg p-0 overflow-hidden border border-white">
                            {/* Detailed Header */}
                            <div className="p-5 bg-white border-bottom border-light">
                                <div className="d-flex flex-column flex-md-row align-items-center gap-4 mb-4 text-center text-md-start">
                                    <div className="rounded-circular bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center shadow-sm" style={{ width: '80px', height: '80px' }}>
                                        <i className="bi bi-folder2-open fs-2"></i>
                                    </div>
                                    <div>
                                        <h2 className="fw-bold text-dark mb-2">{categoryDisplayMap[activeCategoryData?.category] || activeCategoryData?.category}</h2>
                                        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-4 text-secondary">
                                            <span className="d-flex align-items-center gap-2 bg-light px-3 py-1 rounded-pill border">
                                                <i className="bi bi-chat-left-text"></i> {activeCategoryData?.feedback_count} Responses
                                            </span>
                                            <span className="d-flex align-items-center gap-2 bg-light px-3 py-1 rounded-pill border">
                                                <i className="bi bi-star-fill text-warning"></i> {activeCategoryData?.average_rating} Avg Rating
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row g-0">
                                {/* Comments Column */}
                                <div className="col-md-7 border-end border-light">
                                    <div className="p-5">
                                        <h5 className="fw-bold mb-4 d-flex align-items-center gap-2 text-dark">
                                            <i className="bi bi-chat-quote-fill text-primary"></i> User Comments
                                        </h5>
                                        {activeCategoryData?.comments?.length > 0 ? (
                                            <div className="d-flex flex-column gap-3">
                                                {activeCategoryData.comments.map((comment, i) => (
                                                    <div key={i} className="p-4 pt-5 bg-white rounded-3 border border-light shadow-sm position-relative mt-2">
                                                        <i className="bi bi-quote position-absolute top-0 start-0 text-primary opacity-25 display-3 ms-3 mt-n1"></i>
                                                        <p className="mb-0 text-dark lh-lg position-relative z-1 ps-2 pt-2">"{comment}"</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-5 text-muted bg-light rounded-3 border border-dashed">
                                                <i className="bi bi-chat-square opacity-25 fs-1 mb-2 d-block"></i>
                                                No comments available for this category.
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Suggestions Column */}
                                <div className="col-md-5 bg-light bg-opacity-25">
                                    <div className="p-5">
                                        <h5 className="fw-bold mb-4 d-flex align-items-center gap-2 text-dark">
                                            <i className="bi bi-lightbulb-fill text-warning"></i> Suggestions
                                        </h5>
                                        {activeCategoryData?.suggestions?.length > 0 ? (
                                            <ul className="list-group list-group-flush bg-transparent gap-3">
                                                {activeCategoryData.suggestions.map((suggestion, i) => (
                                                    <li key={i} className="list-group-item bg-white border-0 rounded-3 shadow-sm py-3 px-4 d-flex align-items-start gap-3">
                                                        <i className="bi bi-check-circle-fill text-success mt-1 fs-5"></i>
                                                        <span className="text-dark">{suggestion}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="text-center py-5 text-muted bg-white rounded-3 border border-dashed">
                                                <i className="bi bi-inbox opacity-25 fs-1 mb-2 d-block"></i>
                                                No suggestions recorded.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <style>
                {`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                `}
            </style>
        </div>
    );
};

export default FeedbackList;
