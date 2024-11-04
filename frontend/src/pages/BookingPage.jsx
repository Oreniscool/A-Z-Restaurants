import { useParams, useNavigate } from 'react-router-dom';
import {
  DatePicker,
  TimeInput,
  Input,
  Select,
  SelectItem,
  Checkbox,
  Button,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { today, getLocalTimeZone } from '@internationalized/date';
import axios from 'axios';
const BookingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [date, setDate] = useState(today(getLocalTimeZone()));
  const [time, setTime] = useState('');
  const [noOfGuests, setNoOfGuests] = useState(1);
  const [special, setSpecial] = useState('');
  const [tables, setTables] = useState(1);
  const [type, setType] = useState('normal');
  const [sepChecks, setSepChecks] = useState(false);
  const [waitstaff, setWaitstaff] = useState('');
  const [seating, setSeating] = useState('none');
  const [event, setEvent] = useState('other');
  const [loading, setLoading] = useState(false);
  const [tableError, setTableError] = useState(false);
  const items = [
    { key: 'group', label: 'group' },
    { key: 'vip', label: 'vip' },
    { key: 'normal', label: 'normal' },
  ];
  const seatingTypes = [
    { key: 'balcony', label: 'Balcony' },
    { key: 'round_table', label: 'Round Table' },
    { key: 'booth', label: 'Booth' },
    { key: 'private', label: 'Private' },
    { key: 'patio', label: 'Patio' },
    { key: 'none', label: 'None' },
  ];
  const eventTypes = [
    { key: 'birthday', label: 'Birthday' },
    { key: 'corporate', label: 'Corporate' },
    { key: 'anniversary', label: 'Anniversary' },
    { key: 'other', label: 'Other' },
  ];
  const createReservation = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/reserve',
        {
          date,
          time,
          noOfGuests: Number(noOfGuests),
          special,
          tables: Number(tables),
          type,
          sepChecks,
          waitstaff,
          seating,
          event,
          r_id: Number(id),
        },
        {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        }
      );
      if (response.status == 200) {
        console.log(response);
        navigate('/dashboard/home');
      }
    } catch (e) {
      if (e.status == 400) {
        setTableError(true);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log(time);
  }, [time]);
  return (
    <div className="bg-white w-full rounded-[2.5rem] flex flex-col p-10">
      <h1 className="text-2xl font-semibold text-text-600">
        Book a reservation
      </h1>
      <form
        className="grid grid-rows-auto grid-cols-3 p-10 gap-10 items-center"
        onSubmit={(e) => {
          createReservation(e);
        }}
      >
        <DatePicker
          isRequired
          required
          variant="underlined"
          label="Date"
          value={date}
          onChange={setDate}
          minValue={today(getLocalTimeZone())}
        />
        <TimeInput
          isRequired
          required
          label="Event Time"
          variant="underlined"
          onChange={setTime}
        />
        <Input
          isRequired
          required
          variant="underlined"
          label="Number of guests"
          type="number"
          min={1}
          value={noOfGuests}
          onValueChange={setNoOfGuests}
        ></Input>
        <Input
          isRequired
          required
          variant="underlined"
          label="Number of tables"
          type="number"
          min={1}
          isInvalid={tableError}
          errorMessage="Not enough free tables in the restaurant"
          value={tables}
          onValueChange={setTables}
          onChange={() => {
            setTableError(false);
          }}
        ></Input>
        <Input
          variant="underlined"
          label="Special request"
          value={special}
          onValueChange={setSpecial}
        ></Input>
        <Select
          isRequired
          required
          variant="underlined"
          label="Type of reservation"
          defaultSelectedKeys={['normal']}
          onChange={(e) => {
            setType(e.target.value);
            setSeating('None');
            setEvent('other');
          }}
        >
          {items.map((item) => (
            <SelectItem key={item.key}>{item.label}</SelectItem>
          ))}
        </Select>
        {type == 'vip' ? (
          <Input
            variant="underlined"
            label="Preferred waitstaff"
            value={waitstaff}
            onValueChange={setWaitstaff}
          ></Input>
        ) : (
          ''
        )}
        {type == 'vip' ? (
          <Select
            isRequired
            required
            variant="underlined"
            label="Seating types"
            defaultSelectedKeys={['none']}
            value={seating}
            onChange={(e) => setSeating(e.target.value)}
          >
            {seatingTypes.map((item) => (
              <SelectItem key={item.key}>{item.label}</SelectItem>
            ))}
          </Select>
        ) : (
          ''
        )}
        {type == 'group' ? (
          <Checkbox
            color="warning"
            value={sepChecks}
            onValueChange={setSepChecks}
          >
            Separate Checks
          </Checkbox>
        ) : (
          ''
        )}
        {type == 'group' ? (
          <Select
            isRequired
            required
            variant="underlined"
            label="Special Event"
            defaultSelectedKeys={['other']}
            onChange={(e) => setEvent(e.target.value)}
          >
            {eventTypes.map((item) => (
              <SelectItem key={item.key}>{item.label}</SelectItem>
            ))}
          </Select>
        ) : (
          ''
        )}
        <Button className="col-start-2" type="submit" isLoading={loading}>
          Book
        </Button>
      </form>
    </div>
  );
};

export default BookingPage;
