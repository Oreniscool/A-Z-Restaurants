import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import {
  House,
  Search,
  Wallet,
  CircleHelp,
  Settings,
  LogOut,
} from 'lucide-react';
const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen justify-evenly w-fit">
      <div className="flex flex-col h-3/4 gap-5">
        <Link to="home">
          <Button isIconOnly radius="full" variant="shadow">
            <House />
          </Button>
        </Link>
        <Link to="search">
          <Button isIconOnly radius="full" variant="shadow">
            <Search />
          </Button>
        </Link>
        <Link to="bookings">
          <Button isIconOnly radius="full" variant="shadow">
            <Wallet />
          </Button>
        </Link>
        <Link to="help">
          <Button isIconOnly radius="full" variant="shadow">
            <CircleHelp />
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-5">
        <Link to="settings">
          <Button isIconOnly radius="full" variant="shadow">
            <Settings />
          </Button>
        </Link>
        <Button isIconOnly radius="full" color="danger" variant="shadow">
          <LogOut />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
