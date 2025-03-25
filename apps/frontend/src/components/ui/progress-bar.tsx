'use client';

type OccupancyProgressBarProps = {
  value: number;
};

export default function OccupancyProgressBar({ value }: OccupancyProgressBarProps) {
  const getColor = (val: number) => {
    const hue = (1 - val / 100) * 120; // 120 = green, 0 = red
    return `hsl(${hue}, 100%, 45%)`;
  };

  return (
    <div className='w-full max-w-md space-y-2'>
      <div className='relative h-5 w-full rounded-full bg-gray-200 overflow-hidden'>
        <div
          className='absolute left-0 top-0 h-5 rounded-full transition-all duration-300'
          style={{
            width: `${value}%`,
            backgroundColor: getColor(value),
          }}
        />
      </div>
    </div>
  );
}
