import SelectLocation from './SelectLocation';
import { useOutletContext } from 'react-router-dom';
import Dinners from './Dinners';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingScreen from './LoadingScreen';
const Search = () => {
  const [location, setLocation, handleChange] = useOutletContext();
  const [family, setFamily] = useState([]);
  const [fast_food, setFast_food] = useState([]);
  const [fine_dine, setFine_dine] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/restaurant/getAllByCategory'
        );
        if (response.status == 200 || response.status == 304) {
          setFamily(response.data.restaurants.family);
          setFast_food(response.data.restaurants.fast_food);
          setFine_dine(response.data.restaurants.fine_dine);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getRestaurants();
    setLoading(false);
  }, []);
  return (
    <div className="bg-white w-[97%] rounded-[2.5rem] flex flex-col p-10">
      <div className="h-fit w-full flex">
        <SelectLocation
          handleChange={handleChange}
          location={location}
        ></SelectLocation>
      </div>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="w-full h-fit flex flex-col overflow-x-hidden overflow-y-auto p-3">
          <Dinners
            heading="Family"
            dinners={family}
            isLimited={false}
            location={location}
          ></Dinners>
          <Dinners
            heading="Fast Food"
            dinners={fast_food}
            isLimited={false}
            location={location}
          ></Dinners>
          <Dinners
            heading="Fine dine"
            dinners={fine_dine}
            isLimited={false}
            location={location}
          ></Dinners>
        </div>
      )}
    </div>
  );
};

export default Search;
