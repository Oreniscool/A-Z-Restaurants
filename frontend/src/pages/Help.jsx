import {
  Card,
  CardBody,
  Accordion,
  AccordionItem,
  Badge,
} from '@nextui-org/react';
import { Info, Users, Calendar, Clock, Phone } from 'lucide-react';

const Help = () => {
  return (
    <div className="bg-white w-full rounded-[2.5rem] flex flex-col p-10 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Info color="#ffa348" className="w-6 h-6 text-blue-500" />
        <h1 className="text-2xl font-bold">How to Use AZ Restaurants</h1>
      </div>

      <Card>
        <CardBody>
          Welcome to AZ Restaurants! We make it easy to book tables at your
          favorite restaurants with various reservation options.
        </CardBody>
      </Card>

      <Accordion variant="bordered">
        <AccordionItem key="basic" title="Basic Reservation">
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <Calendar className="w-5 h-5 mt-1 text-gray-500" />
              <div>
                <p className="font-medium">Select Date & Time</p>
                <p className="text-sm text-gray-600">
                  Choose your preferred dining date and time slot
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Users className="w-5 h-5 mt-1 text-gray-500" />
              <div>
                <p className="font-medium">Party Size</p>
                <p className="text-sm text-gray-600">
                  Indicate the number of guests (1-20 people)
                </p>
              </div>
            </div>
          </div>
        </AccordionItem>

        <AccordionItem key="group" title="Group Reservations">
          <div className="space-y-4">
            <Badge color="warning" className="mb-2">
              For 8+ people
            </Badge>
            <p className="text-sm text-gray-600">
              Special accommodations for large groups:
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-600">
              <li>Pre-order menu options available</li>
              <li>Special seating arrangements</li>
              <li>Dedicated service staff</li>
            </ul>
            <Card className="bg-amber-50">
              <CardBody>
                Group reservations require at least 24 hours advance notice
              </CardBody>
            </Card>
          </div>
        </AccordionItem>

        <AccordionItem key="vip" title="VIP Experience">
          <div className="space-y-4">
            <Badge color="secondary" className="mb-2">
              Premium Service
            </Badge>
            <p className="text-sm text-gray-600">Enjoy exclusive benefits:</p>
            <ul className="list-disc pl-5 text-sm text-gray-600">
              <li>Priority seating</li>
              <li>Complimentary welcome drink</li>
              <li>Personal concierge service</li>
              <li>Special menu options</li>
            </ul>
          </div>
        </AccordionItem>

        <AccordionItem key="special" title="Special Occasions">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge color="danger">Birthday</Badge>
              <Badge color="primary">Anniversary</Badge>
              <Badge color="success">Corporate</Badge>
            </div>
            <p className="text-sm text-gray-600">
              We offer customized experiences for your special moments:
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-600">
              <li>Custom decorations</li>
              <li>Cake arrangements</li>
              <li>Personalized menu cards</li>
            </ul>
          </div>
        </AccordionItem>

        <AccordionItem key="support" title="Need Help?">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-gray-500" />
              <p className="text-sm text-gray-600">
                Call us at: 1-800-AZ-RESTO
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <p className="text-sm text-gray-600">Support available 24/7</p>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Help;
