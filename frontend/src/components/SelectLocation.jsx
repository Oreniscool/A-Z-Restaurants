/* eslint-disable react/prop-types */
import { Select, SelectItem } from '@nextui-org/react';
import { MapPin } from 'lucide-react';
import indianCities from '../assets/cities.js';
const SelectLocation = ({ handleChange, location }) => {
  console.log(location);
  return (
    <Select
      className="max-w-xs"
      defaultSelectedKeys={[location]}
      label="Location"
      startContent={<MapPin />}
      variant="bordered"
      color="warning"
    >
      {indianCities.map((city) => (
        <SelectItem onClick={handleChange} key={city.name}>
          {city.name}
        </SelectItem>
      ))}
    </Select>
  );
};

export default SelectLocation;
