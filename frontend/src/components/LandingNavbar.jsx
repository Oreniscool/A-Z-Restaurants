import { Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/navbar';
import { useNavigate } from 'react-router-dom';
function LandingNavbar() {
  const navigate = useNavigate();
  return (
    <Navbar className="text-white">
      <NavbarBrand>
        <span className="text-xl font-bold">AZ Restaurants</span>
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem>
          <Link to="/landing">Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/about">About Us</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/support">Support</Link>
        </NavbarItem>
        <NavbarItem>
          <Button flat onClick={() => navigate('/login')}>
            Booking
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default LandingNavbar;
