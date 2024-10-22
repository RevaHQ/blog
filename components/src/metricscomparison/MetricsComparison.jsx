const ModelCard = ({ model, isBaseline }) => {
  return (
    <div className="bg-[#1a1a1a] rounded-xl px-4 py-5 w-[164px] h-[136px] flex flex-col lg:w-[229px] lg:h-[136px]">
      <div className="text-[#EBEBEB] text-xs sm:text-sm font-medium">Model</div>
      <div className="flex-grow flex flex-col justify-center">
        <div className={`text-xl sm:text-[24px] lg:text-[30px] font-semibold ${isBaseline ? 'text-[#8B75B7]' : 'text-[#0FC679]'}`}>
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
    <div className="bg-[#1a1a1a] rounded-xl px-4 py-5 w-[164px] h-[136px] flex flex-col shrink-0 lg:w-[229px] lg:h-[136px]">
      <div className="text-[#EBEBEB] text-xs sm:text-sm font-medium">{title}</div>
      <div className={`flex-grow flex flex-col justify-center ${!isBaseline && '-mt-2'}`}>
        <div className={`text-2xl sm:text-[34px] lg:text-[40px] font-semibold ${isBaseline ? 'text-[#8B75B7]' : 'text-[#0FC679]'}`}>
          {isBaseline ? metric.value : formatChange(metric.change)}
        </div>
        {!isBaseline && (
          <div className="text-[#9f9f9f] text-xs font-normal mt-1">
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

  return (
    <div className="overflow-x-auto">
      <div className="min-w-min pb-4">
        
        <div className="grid grid-cols-3 gap-4 lg:hidden">
          {models.map((item, index) => (
            <div key={index} className="flex flex-col gap-4">
              <ModelCard model={item.model} isBaseline={item.isBaseline} />
              {item.metrics.map((metric, metricIndex) => (
                <MetricCard
                  key={metricIndex}
                  title={metric.name}
                  metric={metric.metrics}
                  isBaseline={item.isBaseline}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="hidden lg:block">
          <div className="space-y-8">
            {models.map((item, index) => (
              <div key={index} className="flex gap-4">
                <ModelCard model={item.model} isBaseline={item.isBaseline} />
                {item.metrics.map((metric, metricIndex) => (
                  <MetricCard
                    key={metricIndex}
                    title={metric.name}
                    metric={metric.metrics}
                    isBaseline={item.isBaseline}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsComparison;