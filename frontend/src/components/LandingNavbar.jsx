import { Button, Link } from '@nextui-org/react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/navbar';
function LandingNavbar() {
  return (
    <Navbar className="text-white">
      <NavbarBrand>
        <span className="text-xl font-bold">AZ Restaurants</span>
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem>
          <Link href="/landing">Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/about">About Us</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/support">Support</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/login">
            <Button auto flat>
              Booking
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default LandingNavbar;
