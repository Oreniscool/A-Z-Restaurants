import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  getKeyValue,
  TableColumn,
} from '@nextui-org/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import LoadingScreen from '../components/LoadingScreen';
const columns = [
  {
    key: 'restaurant_name',
    label: 'RESTAURANT',
  },
  {
    key: 'reservation_date',
    label: 'DATE',
  },
  {
    key: 'reservation_time',
    label: 'TIME',
  },
  {
    key: 'no_of_tables',
    label: 'TABLES',
  },
  {
    key: 'reservation_status',
    label: 'STATUS',
  },
];
const RecentBookings = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getReservations = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/user/getReservation',
          {
            headers: {
              'x-access-token': localStorage.getItem('token'),
            },
          }
        );
        if (response.status == 200) {
          setRows(response.data.reservations);
          console.log(response.data.reservations);
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getReservations();
  }, []);
  return !loading ? (
    <div className="bg-white w-full rounded-[2.5rem] flex flex-col p-10 gap-10">
      <h1 className="text-3xl text-text-600">Your transactions</h1>
      <Table aria-label="All transaction" isStriped shadow="md">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows} emptyContent={'No transactions.'}>
          {(item) => (
            <TableRow key={item.reservation_id}>
              {(columnKey) => {
                return columnKey == 'reservation_date' ? (
                  <TableCell>
                    {format(getKeyValue(item, columnKey), 'dd-MM-yyyy')}
                  </TableCell>
                ) : (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                );
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  ) : (
    <LoadingScreen></LoadingScreen>
  );
};

export default RecentBookings;
