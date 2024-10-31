import React from 'react';
import { Spinner } from '@nextui-org/spinner';
const LoadingScreen = () => {
  return (
    <div className="bg-white w-[97%] rounded-[2.5rem] flex flex-col justify-center p-10">
      <Spinner className="scale-150" color="warning" size="lg"></Spinner>
    </div>
  );
};

export default LoadingScreen;
