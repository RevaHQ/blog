import React, { useState } from 'react';
import './styles.css';

const Expandable = ({ title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="my-8 bg-[#1E201F] py-[20px] px-[16px] rounded-lg">
      <h3 className="text-[19px] leading-[2px] font-bold text-[#0FC679]">
        {title}
      </h3>
      
      <div 
          className="expandable-content text-gray-300 mt-4"
          dangerouslySetInnerHTML={{ __html: content }}
        />

      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`font-normal text-[16px] leading-[13px] hover:opacity-80 ${isExpanded ? '!text-[#0FC679]' : '!text-[#979797]'}`}
      >
        {isExpanded ? 'Hide full response' : 'View full response'}
      </button>
    </div>
  );
};

export default Expandable;