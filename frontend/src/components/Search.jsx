import SelectLocation from './SelectLocation';
import { useOutletContext } from 'react-router-dom';
import Dinners from './Dinners';
import dinners from '../assets/dinners.js';

const types = ['Family', 'Casual', 'Fast Food', 'Fine dine'];
const Search = () => {
  const [location, setLocation, handleChange] = useOutletContext();
  return (
    <div className="bg-white w-[97%] rounded-[2.5rem] flex flex-col p-10">
      <div className="h-fit w-full flex">
        <SelectLocation
          handleChange={handleChange}
          location={location}
        ></SelectLocation>
      </div>
      <div className="w-full h-fit flex flex-col overflow-x-hidden overflow-y-auto p-3">
        {types.map((type, index) => (
          <Dinners
            key={index}
            heading={type}
            dinners={dinners}
            isLimited={false}
            location={location}
          ></Dinners>
        ))}
      </div>
    </div>
  );
};

export default Search;
