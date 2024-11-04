/* eslint-disable react/prop-types */
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
  getKeyValue,
  TableColumn,
} from '@nextui-org/react';

const columns = [
  {
    key: 'item_name',
    label: 'ITEM',
  },
  {
    key: 'price',
    label: 'PRICE',
  },
];

const giveKeys = (data) => {
  let i = 0;
  data.starters.forEach((item) => {
    item.key = i;
    i++;
  });
  i = 0;
  data.main.forEach((item) => {
    item.key = i;
    i++;
  });
  i = 0;
  data.desserts.forEach((item) => {
    item.key = i;
    i++;
  });
  i = 0;
  data.drinks.forEach((item) => {
    item.key = i;
    i++;
  });
  return data;
};

const Menu = ({ data }) => {
  data = giveKeys(data);
  return (
    <div className="flex gap-10">
      <Table
        aria-label="Example table with dynamic content"
        topContent="Starters"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={data.starters}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Table
        aria-label="Example table with dynamic content"
        topContent="Main course"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={data.main}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Table
        aria-label="Example table with dynamic content"
        topContent="Desserts"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={data.desserts}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Table
        aria-label="Example table with dynamic content"
        topContent="Drinks"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={data.drinks}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Menu;
