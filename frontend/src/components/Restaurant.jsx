/* eslint-disable react/prop-types */
import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';
import restaurant from '/background/restaurant.jpg';
import { Beer, Cake, Star, Clock } from 'lucide-react';
const Restaurant = ({ dinner }) => {
  return (
    <Card className="py-4 min-w-[14%]" isHoverable shadow="md">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={restaurant}
          width={200}
        />
        <h4 className="font-bold text-large">{dinner.r_name}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex">
        <p className="text-xs text-gray-500">
          {dinner.street}, {dinner.famous_locality}, {dinner.city}
        </p>
        <div className="flex w-full gap-2 items-center">
          <Clock size={20} />
          <div className="flex text-md">
            {dinner.opening_time}-{dinner.closing_time}
          </div>
        </div>
        <div className="flex gap-2">
          {dinner.alcohol_availability ? <Beer size={20} /> : ''}
          {dinner.birthday_party_packages ? <Cake size={20} /> : ''}
          {dinner.michelin_star ? <Star size={20} /> : ''}
        </div>
      </CardBody>
    </Card>
  );
};

export default Restaurant;
