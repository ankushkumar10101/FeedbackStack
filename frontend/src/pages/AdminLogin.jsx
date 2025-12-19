import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Client-side simple check as requested
        if (username === 'admin' && password === 'admin') {
            navigate('/admin/dashboard');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center">
            <div className="glass-card p-5 shadow-lg animate-fade-in" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-dark">Admin Login</h2>
                    <p className="text-secondary small">Access Feedback Dashboard</p>
                </div>

                <div className="alert alert-info border-0 rounded-3 small py-2 text-center mb-3">
                    <i className="bi bi-info-circle me-2"></i>
                    Username: <strong>admin</strong>, Password: <strong>admin</strong>
                </div>

                {error && (
                    <div className="alert alert-danger border-0 rounded-3 small py-2 text-center mb-3">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label text-secondary small fw-bold">Username</label>
                        <input 
                            type="text" 
                            className="form-control border-0 bg-light rounded-3 py-2"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label text-secondary small fw-bold">Password</label>
                        <input 
                            type="password" 
                            className="form-control border-0 bg-light rounded-3 py-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary w-100 rounded-pill py-2 fw-bold shadow-sm hover-lift btn-smooth"
                        style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', border: 'none' }}
                    >
                        Login
                    </button>
                    <div className="text-center mt-3">
                        <button 
                             type="button" 
                             className="btn btn-link text-secondary text-decoration-none small btn-smooth"
                             onClick={() => navigate('/')}
                        >
                            &larr; Back to Feedback
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
