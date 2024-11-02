/* eslint-disable react/prop-types */
import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';
import { Beer, Cake, Star, Clock, Car } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import images from '../assets/images.js';
const Restaurant = ({ dinner }) => {
  const navigate = useNavigate();
  const openingTime = format(
    new Date(`01/01/2022 ${dinner.opening_time}`),
    'hh:mm aa'
  );
  const closingTime = format(
    new Date(`01/01/2022 ${dinner.closing_time}`),
    'hh:mm aa'
  );
  const image = images[Math.floor(Math.random() * images.length)];
  return (
    <Card
      className="py-4 min-w-[14%] "
      isHoverable
      isPressable
      shadow="md"
      onClick={() => navigate(`/dashboard/restaurant/${dinner.r_id}`)}
    >
      <CardHeader className="pb-0 pt-2 px-4 flex-col  items-center">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={image}
          width={200}
          height={125}
        />
        <h4 className="font-bold text-large">{dinner.r_name}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex gap-2">
        <p className="text-xs text-gray-500">
          {dinner.street}, {dinner.famous_locality}, {dinner.city}
        </p>
        <div className="flex w-full gap-2 items-center">
          <Clock size={20} />
          <div className="flex text-md">
            {openingTime}-{closingTime}
          </div>
        </div>
        <div className="flex gap-2">
          {dinner.alcohol_avail ? <Beer size={20} color="#f5c211" /> : ''}
          {dinner.birthday_package ? <Cake size={20} color="#c061cb" /> : ''}
          {dinner.michelin_star ? <Star size={20} color="#f8e45c" /> : ''}
          {dinner.drive_thru_avail ? <Car size={20} /> : ''}
        </div>
      </CardBody>
    </Card>
  );
};

export default Restaurant;
