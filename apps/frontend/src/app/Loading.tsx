import { Loader2 } from 'lucide-react';

export default function LoadingFullScreen() {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-50 z-50'>
      <Loader2 size={100} color='#96BE2D' className='animate-spin' />
    </div>
  );
}
