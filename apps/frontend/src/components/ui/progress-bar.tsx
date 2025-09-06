'use client';

type OccupancyProgressBarProps = {
  value: number;
};

export default function OccupancyProgressBar({ value }: OccupancyProgressBarProps) {
  const getColor = (val: number) => {
    const hue = (1 - val / 100) * 120;
    return `hsl(${hue}, 100%, 45%)`;
  };

  return (
    <div className='w-full max-w-md space-y-2'>
      <div className='relative group'>
        <div className='relative h-5 w-full rounded-full bg-gray-200 overflow-hidden'>
          <div
            className='absolute left-0 top-0 h-5 rounded-full transition-all duration-300'
            style={{ width: `${value}%`, backgroundColor: getColor(value) }}
          />
        </div>

        <div
          className='absolute -top-8 px-2 py-1 text-xs font-medium text-white bg-gray-800 rounded-md shadow hidden group-hover:flex items-center justify-center z-10'
          style={{ left: `min(calc(${value}% + 8px), 95%)`, transform: 'translateX(-50%)' }}
        >
          {value}%
          <div className='absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-800' />
        </div>
      </div>
    </div>
  );
}
