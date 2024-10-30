import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from '@nextui-org/react';

const rows = [];

const columns = [
  { key: 'restaurant', label: 'RESTAURANT' },
  { key: 'amount', label: 'AMOUNT' },
  { key: 'status', label: 'STATUS' },
];

export default function RecentTranscations() {
  const limitedRows = rows.slice(0, 5);
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
            <TableRow key={row.key}>
              {(columnKey) => (
                <TableCell>{getKeyValue(row, columnKey)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <TableBody emptyContent={'No recent transactions.'}>{[]}</TableBody>
      )}
    </Table>
  );
}
