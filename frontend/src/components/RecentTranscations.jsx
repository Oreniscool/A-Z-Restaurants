import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
const columns = [
  { key: 'restaurant_name', label: 'RESTAURANT' },
  { key: 'reservation_date', label: 'DATE' },
  { key: 'reservation_time', label: 'TIME' },
];

export default function RecentTranscations() {
  const [rows, setRows] = useState([]);
  const limitedRows = rows.slice(0, 5);
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
        }
      } catch (e) {
        console.error(e);
      }
    };
    getReservations();
  }, []);
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      {limitedRows.length ? (
        <TableBody>
          {limitedRows.map((row) => (
            <TableRow key={row.reservation_id}>
              {(columnKey) => {
                return columnKey == 'reservation_date' ? (
                  <TableCell>
                    {format(getKeyValue(row, columnKey), 'dd-MM-yyyy')}
                  </TableCell>
                ) : (
                  <TableCell>{getKeyValue(row, columnKey)}</TableCell>
                );
              }}
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <TableBody emptyContent={'No recent transactions.'}>{[]}</TableBody>
      )}
    </Table>
  );
}
