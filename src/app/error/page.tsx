import { CircleAlert } from 'lucide-react';

const Error = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-5 text-center text-xl font-semibold text-[#afaeae]">
      <div className="flex items-center justify-center">
        <CircleAlert className="h-20 w-20" color="#afaeae" />
      </div>
      <div>
        <h1>Error</h1>
      </div>
    </div>
  );
};

export default Error;
