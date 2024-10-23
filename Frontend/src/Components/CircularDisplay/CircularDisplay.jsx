import React from 'react'
import "./CircularDisplay.css"

const CircularDisplay = ({circular}) => {
    const {category, dateIssued, circular_id, subject, description} = circular;

  return (
    <div className='circular-popup'>
        <div className="circular-category">
        <div className={`${category.toLowerCase()}-category`}>
          {category}
        </div>
        </div>
        <div className="circular-date">
        {new Date(dateIssued).toLocaleDateString()}

        </div>
        <div className="circular-title">
            <p>{circular_id}</p>
            <p>{subject}</p>
        </div>
        <div className="circular-content">
            <p>
                Dear Students, <br />
                {description}
            </p>
        </div>
        <div className="circular-sign">
            <p>MIT WPU</p>
        </div>
    </div>
  )
}

export default CircularDisplay