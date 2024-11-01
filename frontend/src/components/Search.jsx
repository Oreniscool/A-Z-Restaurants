import SelectLocation from './SelectLocation';
import { useOutletContext } from 'react-router-dom';
import Dinners from './Dinners';
import { useEffect, useState } from 'react';
import axios from 'axios';
//import dinners from '../assets/dinners.js';

//const types = ['Family', 'Casual', 'Fast Food', 'Fine dine'];
const Search = () => {
  const [location, setLocation, handleChange] = useOutletContext();
  const [dinners, setDinners] = useState({});
  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/restaurant/getAll'
        );
        if (response.status == 200) {
          console.log(response.data.restaurants);
          setDinners(response.data.restaurants);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getRestaurants();
  }, []);
  return (
    <div className="bg-white w-[97%] rounded-[2.5rem] flex flex-col p-10">
      <div className="h-fit w-full flex">
        <SelectLocation
          handleChange={handleChange}
          location={location}
        ></SelectLocation>
      </div>
      <div className="w-full h-fit flex flex-col overflow-x-hidden overflow-y-auto p-3">
        <Dinners
          heading="Family"
          dinners={dinners.family}
          isLimited={false}
          location={location}
        ></Dinners>
        <Dinners
          heading="Fast Food"
          dinners={dinners.fast_food}
          isLimited={false}
          location={location}
        ></Dinners>
        <Dinners
          heading="Fine dine"
          dinners={dinners.fine_dine}
          isLimited={false}
          location={location}
        ></Dinners>
      </div>
    </div>
  );
};

export default Search;
