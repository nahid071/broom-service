import React from "react";

import PropTypes from "prop-types";

import { FaStar, FaStarHalf, FaRegStar } from "react-icons/fa";
const Rating = ({ value, text, color }) => {
  return (
    <div className="rating">
      <span>
        {value >= 1 ? (
          <FaStar style={{ color: color }} />
        ) : value >= 0.5 ? (
          <FaStarHalf style={{ color: color }} />
        ) : (
          <FaRegStar style={{ color: color }} />
        )}
      </span>

      <span>
        {value >= 2 ? (
          <FaStar style={{ color: color }} />
        ) : value >= 1.5 ? (
          <FaStarHalf style={{ color: color }} />
        ) : (
          <FaRegStar style={{ color: color }} />
        )}
      </span>

      <span>
        {value >= 3 ? (
          <FaStar style={{ color: color }} />
        ) : value >= 2.5 ? (
          <FaStarHalf style={{ color: color }} />
        ) : (
          <FaRegStar style={{ color: color }} />
        )}
      </span>

      <span>
        {value >= 4 ? (
          <FaStar style={{ color: color }} />
        ) : value >= 3.5 ? (
          <FaStarHalf style={{ color: color }} />
        ) : (
          <FaRegStar style={{ color: color }} />
        )}
      </span>

      <span>
        {value >= 5 ? (
          <FaStar style={{ color: color }} />
        ) : value >= 4.5 ? (
          <FaStarHalf style={{ color: color }} />
        ) : (
          <FaRegStar style={{ color: color }} />
        )}
      </span>
      <span> {text && text} </span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
  // color:'red'
};

Rating.prototype = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Rating;
