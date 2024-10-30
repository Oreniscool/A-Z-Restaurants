import { Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import LandingNavbar from '../components/LandingNavbar';
const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-restaurant bg-cover">
      <LandingNavbar></LandingNavbar>
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-4 text-white">
          Book a Perfect Restaurant
        </h1>
        <h1 className="text-4xl font-bold mb-8 text-accent-700">
          For Your Dinning
        </h1>
        <div className="flex space-x-4 text-white">
          <Link to="/signup">
            <Button auto size="lg">
              <span className="text-accent-500 font-bold">Sign Up</span>
            </Button>
          </Link>
          <Link to="/login">
            <Button auto light variant="ghost" color="default" size="lg">
              <span className="text-accent-800 font-bold">Login</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
