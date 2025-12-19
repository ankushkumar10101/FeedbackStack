import React, { useState } from 'react';

const StarRating = ({ rating, setRating }) => {
    const [hover, setHover] = useState(0);

    return (
        <div className="star-rating d-inline-flex gap-2">
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                const isActive = ratingValue <= (hover || rating);
                
                return (
                    <button
                        type="button"
                        key={ratingValue}
                        className={`btn p-0 border-0 bg-transparent star-btn ${isActive ? "active" : ""}`}
                        onClick={() => setRating(ratingValue)}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                        style={{ 
                            fontSize: '2.5rem', 
                            lineHeight: 1,
                            color: isActive ? '#fbbf24' : '#e2e8f0', // Amber-400 vs Slate-200
                            cursor: 'pointer'
                        }}
                        aria-label={`Rate ${ratingValue} stars`}
                    >
                        <span style={{ 
                            filter: isActive ? 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.5))' : 'none' 
                        }}>
                            &#9733;
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

export default StarRating;
