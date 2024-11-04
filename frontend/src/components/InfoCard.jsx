/* eslint-disable react/prop-types */
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react';
import {
  Clock,
  Beer,
  Cake,
  Star,
  Car,
  Baby,
  CookingPot,
  MapPinHouse,
  HandPlatter,
  Shirt,
} from 'lucide-react';
import { format } from 'date-fns';

const FineDineFeatures = ({ data }) => {
  return (
    <div className="flex gap-2 h-full">
      {data.michelin_star ? (
        <div className="flex items-center gap-2">
          <Star size={30} color="#f8e45c" /> <p>Michelin star</p>
        </div>
      ) : (
        ''
      )}
      {data.personalised_service ? (
        <div className="flex items-center gap-2">
          <HandPlatter size={30} color="#f8e45c" /> <p>Personalised service</p>
        </div>
      ) : (
        ''
      )}
      {data.dress_code ? (
        <div className="flex items-center gap-2">
          <Shirt size={30} /> <p>{data.dress_code}</p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const FamilyFeatures = ({ data }) => {
  return (
    <div className="flex gap-2 h-full">
      {data.birthday_package ? (
        <div className="flex items-center gap-2">
          <Cake size={30} color="#c061cb" /> <p>Birthday packages available</p>
        </div>
      ) : (
        ''
      )}
      {data.kids_entertainment ? (
        <div className="flex items-center gap-2">
          <Baby size={30} /> <p>Kids play area available</p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const InfoCard = ({ data }) => {
  const type = data.family
    ? 'Family'
    : data.fast_food
    ? 'Fast food'
    : data.fine_dine
    ? 'Fine dine'
    : '';
  const openingTime = format(
    new Date(`01/01/2022 ${data.opening_time}`),
    'hh:mm aa'
  );
  const closingTime = format(
    new Date(`01/01/2022 ${data.closing_time}`),
    'hh:mm aa'
  );
  return (
    <Card className="p-5 w-fit">
      <CardHeader className="">
        <h1 className="text-xl text-center w-full">{type}</h1>
      </CardHeader>
      <CardBody className="h-fit overflow-visible">
        <div className="flex flex-col w-full gap-2 items-start">
          <div className="flex items-center gap-2">
            <CookingPot size={30} /> <p>{data.cusine_type} cuisine</p>
          </div>
          <div className="flex text-md gap-2">
            <Clock size={25} />
            {openingTime}-{closingTime}
          </div>
          <div className="flex gap-2 flex-col">
            {data.alcohol_avail ? (
              <div className="flex items-center gap-2">
                <Beer size={30} color="#f5c211" /> <p>Alcohol available</p>
              </div>
            ) : (
              ''
            )}
            {type == 'Family' ? (
              <FamilyFeatures data={data.family}></FamilyFeatures>
            ) : (
              ''
            )}
            {type == 'Fine dine' ? (
              <FineDineFeatures data={data.fine_dine}></FineDineFeatures>
            ) : (
              ''
            )}
            {type == 'Fast food' ? (
              data.fast_food.drive_thru_avail ? (
                <div className="flex items-center gap-2">
                  <Car size={30} /> <p>Drive thru available</p>
                </div>
              ) : (
                ''
              )
            ) : (
              ''
            )}
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex gap-2">
        <MapPinHouse />
        <p>
          {data.building_name}, {data.block_no}, {data.famous_locality},
          {data.city}
        </p>
      </CardFooter>
    </Card>
  );
};

export default InfoCard;
