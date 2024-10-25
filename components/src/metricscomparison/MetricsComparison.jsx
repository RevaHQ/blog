import { useRef, useState, useEffect } from 'react';

const ModelCard = ({ model, isBaseline }) => {
  return (
    <div className="bg-[#1a1a1a] rounded-xl px-4 py-5 w-[189px] h-[130px] flex flex-col">
      <div className="text-[#EBEBEB] text-[14px] font-medium leading-[20px]">Model</div>
      <div className="flex-grow flex flex-col justify-center">
        <div className={`text-[24px] font-semibold ${isBaseline ? 'text-[#8B75B7]' : 'text-[#0FC679]'} leading-[32px]`}>
          {model}
        </div>
      </div>
      {isBaseline && (
        <div className="w-fit text-xs font-medium bg-[#2C1C5F] border-[#53389E] text-[#D6BBFB] px-2 py-1 rounded-lg border-2">
          Baseline
        </div>
      )}
    </div>
  );
 };
 
 const MetricCard = ({ title, metric, isBaseline }) => {
  const formatChange = (value) => {
    if (value === '--') return '--';
    const num = parseFloat(value);
    return num > 0 ? `+${num}` : num;
  };
 
  return (
    <div className="bg-[#1a1a1a] rounded-xl px-4 py-5 w-[122px] h-[132px] flex flex-col shrink-0">
      <div className="text-[#EBEBEB] text-[14px] font-medium leading-[20px]">{title}</div>
      <div className={`flex-grow flex flex-col justify-center ${!isBaseline && '-mt-2'}`}>
        <div className={`text-[24px] font-semibold ${isBaseline ? 'text-[#8B75B7]' : 'text-[#0FC679]'} leading-[32px]`}>
          {isBaseline ? metric.value : formatChange(metric.change)}
        </div>
        {!isBaseline && (
          <div className="text-[#9f9f9f] text-[14px] font-normal mt-1 leading-[13px]">
            Total: {metric.total}
          </div>
        )}
      </div>
    </div>
  );
 };

const MetricsComparison = () => {


  const baselineMetrics = [
    { 
      name: "Tokens",
      metrics: { isBaseline: true, value: '269.3' }
    },
    { 
      name: "Unique Words",
      metrics: { isBaseline: true, value: '134' }
    },
    { 
      name: "Word Count",
      metrics: { isBaseline: true, value: '207' }
    },
    { 
      name: "Readability",
      metrics: { isBaseline: true, value: '9.66' }
    },
    { 
      name: "Joy",
      metrics: { isBaseline: true, value: '0.92' }
    },
    { 
      name: "Anger",
      metrics: { isBaseline: true, value: '0.02' }
    },
    { 
      name: "Surprise",
      metrics: { isBaseline: true, value: '0.003' }
    },
    { 
      name: "Sadness",
      metrics: { isBaseline: true, value: '0.02' }
    }
  ];
  
  const claudeMetrics = [
    { 
      name: "Tokens",
      metrics: { change: 14.2, total: '283.56' }
    },
    { 
      name: "Unique Words",
      metrics: { change: 2.7, total: '136.96' }
    },
    { 
      name: "Word Count",
      metrics: { change: 10.9, total: '218.12' }
    },
    { 
      name: "Readability",
      metrics: { change: 0.58, total: '10.24' }
    },
    { 
      name: "Joy",
      metrics: { change: -0.08, total: '0.84' }
    },
    { 
      name: "Anger",
      metrics: { change: 0.02, total: '0.04' }
    },
    { 
      name: "Surprise",
      metrics: { change: -0.001, total: '0.002' }
    },
    { 
      name: "Sadness",
      metrics: { change: '--', total: '0.05' }
    }
  ];
  
  const gptMiniMetrics = [
    { 
      name: "Tokens",
      metrics: { change: 6.5, total: '275.9' }
    },
    { 
      name: "Unique Words",
      metrics: { change: 1.17, total: '135.43' }
    },
    { 
      name: "Word Count",
      metrics: { change: 5, total: '212' }
    },
    { 
      name: "Readability",
      metrics: { change: 0.2, total: '9.98' }
    },
    { 
      name: "Joy",
      metrics: { change: -0.01, total: '0.907' }
    },
    { 
      name: "Anger",
      metrics: { change: -0.01, total: '0.01' }
    },
    { 
      name: "Surprise",
      metrics: { change: -0.002, total: '0.001' }
    },
    { 
      name: "Sadness",
      metrics: { change: '--', total: '0.03' }
    }
  ];

  const models = [
    {
      model: `GPT-4o`,
      isBaseline: true,
      metrics: baselineMetrics,
    },
    {
      model: `Claude 3.5 Sonnet`,
      isBaseline: false,
      metrics: claudeMetrics,
    },
    {
      model: `GPT-4o mini`,
      isBaseline: false,
      metrics: gptMiniMetrics,
    },
  ];
  
  const scrollContainerRef = useRef(null);
  const [hasMoreToScroll, setHasMoreToScroll] = useState(true);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        
        
        const modelCardWidth = 189;
        const metricCardWidth = 122;
        const gap = 8;
        const padding = 16;
        const availableWidth = clientWidth - modelCardWidth - gap - padding;
        const visibleMetrics = Math.floor(availableWidth / (metricCardWidth + gap));

        
        const totalMetrics = models[0].metrics.length; 
        const hasMoreMetrics = totalMetrics > visibleMetrics;
        
        const isNearEnd = scrollWidth - (scrollLeft + clientWidth) < 40;
        setHasMoreToScroll(hasMoreMetrics && !isNearEnd);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      // Initial check
      checkScroll();
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      }
    };
  }, []);

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="overflow-x-auto -ml-[1rem] -mr-[1rem]" ref={scrollContainerRef}>
          <div className="min-w-min pb-4 bg-[#262626] flex justify-center">
            <div className="space-y-2">
              {models.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-2 pl-[1rem]"
                >
                  <ModelCard model={item.model} isBaseline={item.isBaseline} />
                  <div className="flex gap-2">
                    {item.metrics.map((metric, metricIndex) => (
                      <MetricCard
                        key={metricIndex}
                        title={metric.name}
                        metric={metric.metrics}
                        isBaseline={item.isBaseline}
                      />
                    ))}
                    {/* Use scroll-based state for peek effect */}
                    <div className={`shrink-0 ${hasMoreToScroll ? 'w-[40px]' : 'w-[10px]'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsComparison;