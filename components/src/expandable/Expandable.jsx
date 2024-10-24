import React, { useState } from 'react';

const Expandable = ({ title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="my-8 bg-[#1E201F] py-[20px] px-[16px] rounded-lg">
      <h3 className="text-[19px] leading-[2px] font-bold text-[#0FC679]">
        {title}
      </h3>
      
      <div className="prose-container">
        {isExpanded && (
          <div 
            className="prose prose-invert max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 mb-5"
            dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }}
          />
        )}
      </div>

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