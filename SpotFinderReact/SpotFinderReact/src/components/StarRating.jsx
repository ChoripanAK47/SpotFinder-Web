import React from 'react';

const StarRating = ({ rating, label }) => {
  const totalStars = 5;
  const filledStars = Math.round(rating);

  return (
    <div className="d-flex align-items-center mb-1 small">
      {label && <span className="me-2" style={{ minWidth: '80px' }}>{label}</span>}
      <div>
        {[...Array(totalStars)].map((_, index) => (
          <svg key={index} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={index < filledStars ? '#ffc107' : '#e4e5e9'} className="bi bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg>
        ))}
      </div>
    </div>
  );
};

export default StarRating;