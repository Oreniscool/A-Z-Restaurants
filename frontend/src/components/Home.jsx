import { useState } from 'react';
import SelectLocation from './SelectLocation';
import restaurants from '../assets/dinners';
import Dinners from './Dinners';
import RecentTranscations from './RecentTranscations';
import { useOutletContext } from 'react-router-dom';
const Home = () => {
  const [username, setUsername] = useState('Qitiya');
  const [location, setLocation, handleChange] = useOutletContext();
  return (
    <div className="bg-white w-full rounded-[2.5rem] flex flex-col p-10">
      <div className="w-full h-fit flex items-center justify-around">
        <div className="w-1/2">
          <p className="text-text-800 text-md">Welcome back,</p>
          <h1 className="text-3xl text-text-100">{username}</h1>
        </div>
        <SelectLocation
          handleChange={handleChange}
          location={location}
        ></SelectLocation>
      </div>
      <div className="h-full flex p-7 gap-3 w-full">
        <div className="h-full flex flex-col justify-between w-3/4">
          <Dinners
            heading={'You Frequent'}
            dinners={restaurants}
            location={location}
            isLimited={true}
          ></Dinners>
          <Dinners
            heading={'Recommended'}
            dinners={restaurants}
            location={location}
            isLimited={true}
          ></Dinners>
        </div>
        <div className="w-1/4">
          <h1 className="text-2xl font-semibold">Recent Bookings</h1>
          <RecentTranscations></RecentTranscations>
        </div>
      </div>
    </div>
  );
};

export default Home;
