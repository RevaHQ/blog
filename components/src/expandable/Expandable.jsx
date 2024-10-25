import React from 'react';

const Expandable = ({ title, content }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Decode content if it's still encoded
  const decodeHTML = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const decodedContent = decodeHTML(content);

  return (
    <div className="my-8 bg-[#1E201F] py-[20px] px-[16px] rounded-lg">
      <h3 onClick={() => setIsExpanded(!isExpanded)} className="!text-[19px] leading-[2px] font-bold text-[#0FC679] cursor-pointer">
        {title}
      </h3>
      
      
      {isExpanded && <div 
        className="expandable-content text-gray-300 mt-4"
        dangerouslySetInnerHTML={{ __html: decodedContent }}
      />}

<button 
  onClick={() => setIsExpanded(!isExpanded)}
  className={`font-normal text-[16px] leading-[13px] hover:opacity-80 inline-flex items-center gap-1 cursor-pointer ${
    isExpanded ? '!text-[#0FC679]' : '!text-[#979797]'
  }`}
>
  {isExpanded ? 'Hide full response' : (
    <>
      View full response →
      
    </>
  )}
</button>
    </div>
  );
};

export default Expandable;
