import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import {
  House,
  Search,
  Wallet,
  CircleHelp,
  Settings,
  LogOut,
} from 'lucide-react';
import { useState } from 'react';
const Sidebar = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('home');
  useEffect(() => {
    console.log(window.location.pathname.substring(11));
    setCurrentPage(window.location.pathname.substring(11));
  }, [navigate]);
  return (
    <div className="flex flex-col h-screen justify-evenly w-fit">
      <div className="flex flex-col h-3/4 gap-5">
        <Button
          isIconOnly
          radius="full"
          variant="shadow"
          isDisabled={currentPage == 'home' ? true : false}
          onClick={() => navigate('home')}
        >
          <House />
        </Button>
        <Button
          isIconOnly
          radius="full"
          variant="shadow"
          isDisabled={currentPage == 'search' ? true : false}
          onClick={() => navigate('search')}
        >
          <Search />
        </Button>
        <Button
          isIconOnly
          radius="full"
          variant="shadow"
          isDisabled={currentPage == 'bookings' ? true : false}
          onClick={() => navigate('bookings ')}
        >
          <Wallet />
        </Button>
        <Button
          isIconOnly
          radius="full"
          variant="shadow"
          isDisabled={currentPage == 'help' ? true : false}
          onClick={() => navigate('help')}
        >
          <CircleHelp />
        </Button>
      </div>
      <div className="flex flex-col gap-5">
        <Button
          isIconOnly
          radius="full"
          variant="shadow"
          isDisabled={currentPage == 'settings' ? true : false}
          onClick={() => navigate('settings')}
        >
          <Settings />
        </Button>
        <Button isIconOnly radius="full" color="danger" variant="shadow">
          <LogOut />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
