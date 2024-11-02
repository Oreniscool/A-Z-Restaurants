import { useEffect, useState } from 'react';
import SelectLocation from './SelectLocation';
import Dinners from './Dinners';
import RecentTranscations from './RecentTranscations';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from './LoadingScreen';
const Home = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation, handleChange] = useOutletContext();
  const [dinners, setDinners] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUsername = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/user/getUsername',
          {
            headers: {
              'x-access-token': localStorage.getItem('token'),
            },
          }
        );
        if (response.status == 200) {
          setUsername(response.data.username);
        }
      } catch (e) {
        console.error(e);
      }
    };
    const getRestaurants = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/restaurant/getAll'
        );
        if (response.status == 200) {
          setDinners(response.data.restaurants);
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getUsername();
    getRestaurants();
  }, []);
  return (
    <div className="bg-white w-full rounded-[2.5rem] flex flex-col p-10">
      {loading ? (
        <LoadingScreen></LoadingScreen>
      ) : (
        <>
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
                dinners={[]}
                location={location}
                isLimited={true}
              ></Dinners>
              <Dinners
                heading={'Recommended'}
                dinners={dinners}
                location={location}
                isLimited={true}
              ></Dinners>
            </div>
            <div className="w-1/4">
              <h1 className="text-2xl font-semibold">Recent Bookings</h1>
              <RecentTranscations></RecentTranscations>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
