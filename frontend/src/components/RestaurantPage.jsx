import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import LoadingScreen from './LoadingScreen';
import axios from 'axios';
import InfoCard from './InfoCard';
import Menu from './Menu';
import { Divider } from '@nextui-org/react';
import ReserveCard from './ReserveCard';
const RestaurantPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [resData, setResData] = useState({
    opening_time: '00:00:00',
    closing_time: '00:00:00',
  });
  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/restaurant/getById',
          {
            headers: {
              r_id: id,
            },
          }
        );
        if (response.status == 200 || response.status == 304) {
          setResData(response.data.info);
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getRestaurant();
  }, [id]);
  return (
    <div className="bg-white w-full rounded-[2.5rem] flex flex-col items-center p-10">
      {loading ? (
        <LoadingScreen></LoadingScreen>
      ) : (
        <div className="w-full h-full flex flex-col gap-10 items-center overflow-y-auto py-2">
          <h1 className="text-4xl text-center">{resData.r_name}</h1>
          <div className="flex gap-10">
            <InfoCard data={resData}></InfoCard>
            <ReserveCard data={resData}></ReserveCard>
          </div>
          <Divider className="my-2"></Divider>
          <h2 className="text-xl">Menu</h2>
          <Menu data={resData.menu}></Menu>
        </div>
      )}
    </div>
  );
};

export default RestaurantPage;
