import { useState } from 'react';
import { Input, Button, Checkbox } from '@nextui-org/react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { DatePicker } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
const URL = 'http://localhost:5000';
const SignUpPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [building, setBuilding] = useState('');
  const [block, setBlock] = useState('');
  const [street, setStreet] = useState('');
  const [sector, setSector] = useState('');
  const [locality, setLocality] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const register = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/register',
        {
          username,
          firstName,
          lastName,
          building,
          block,
          street,
          sector,
          locality,
          dob,
          password,
          email,
          city,
        },
        { withCredentials: true }
      );

      if (response.status == 200) {
        navigate('/login');
      }
    } catch (e) {
      if (e.status == 400) {
        console.log('Duplicated username was entered');
      }
    }

    setIsLoading(false);
  };
  return (
    <div className="h-screen bg-gray-900 flex items-center justify-center p-10 px-24">
      <div className="w-full bg-gray-900 rounded-xl overflow-hidden flex h-full justify-between">
        {/* Left side with image and caption */}
        <div className="w-1/2 relative bg-food  bg-cover p-8 hidden md:block">
          <div className="absolute top-4 left-4">
            <span className="text-white text-2xl font-bold">
              AZ Restaurants
            </span>
          </div>
          <Link to="/landing" className="absolute top-4 right-4 text-white">
            Back to website →
          </Link>
          <div className="h-full flex flex-col justify-end">
            <h2 className="text-white text-4xl font-bold mb-8">
              Capturing Moments,
              <br />
              Creating Memories
            </h2>
            <div className="flex gap-2">
              <div className="w-8 h-1 bg-gray-400 rounded"></div>
              <div className="w-8 h-1 bg-gray-400 rounded"></div>
              <div className="w-8 h-1 bg-white rounded"></div>
            </div>
          </div>
        </div>

        {/* Right side with form */}
        <div className="w-full md:w-1/2 p-8 h-full content-center">
          <h1 className="text-4xl text-white font-bold mb-4">
            Create an account
          </h1>
          <p className="text-gray-400 mb-8">
            Already have an account?{' '}
            <Link to="/login" className="text-accent-500">
              Log in
            </Link>
          </p>

          <form className="space-y-4" onSubmit={register}>
            <Input
              type="text"
              label="Username"
              placeholder="Choose a username"
              onChange={(e) => setUsername(e.target.value)}
              isRequired
              required
            />
            <div className="flex gap-4">
              <Input
                type="text"
                label="First name"
                placeholder="Fletcher"
                className="w-1/2"
                onChange={(e) => setFirstName(e.target.value)}
                isRequired
                required
              />
              <Input
                type="text"
                label="Last name"
                placeholder="Last name"
                className="w-1/2"
                onChange={(e) => setLastName(e.target.value)}
                isRequired
                required
              />
            </div>
            <div className="flex gap-4">
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                className="w-full"
                onChange={(e) => setEmail(e.target.value)}
                isRequired
                required
              />
              <DatePicker
                label="Birth Date"
                isRequired
                required
                onChange={(e) => setDob(`${e.year}-${e.month}-${e.day}`)}
              />
            </div>

            <div className="flex gap-4">
              <Input
                label="Building"
                placeholder="Enter your building"
                onChange={(e) => setBuilding(e.target.value)}
                iSRequired
                required
              ></Input>
              <Input
                label="Block no."
                placeholder="Enter your block number"
                onChange={(e) => setBlock(e.target.value)}
              ></Input>
            </div>
            <div className="flex gap-4">
              <Input
                label="Street"
                placeholder="Enter your street"
                onChange={(e) => setStreet(e.target.value)}
              ></Input>
              <Input
                label="Sector no."
                placeholder="Enter your sector number"
                onChange={(e) => setSector(e.target.value)}
              ></Input>
            </div>

            <div className="flex gap-4">
              <Input
                label="Locality"
                placeholder="Enter your locality"
                onChange={(e) => setLocality(e.target.value)}
              ></Input>
              <Input
                label="City"
                placeholder="Enter your city"
                onChange={(e) => setCity(e.target.value)}
                isRequired
                required
              ></Input>
            </div>

            <Input
              label="Password"
              placeholder="Enter your password"
              isRequired
              onChange={(e) => setPassword(e.target.value)}
              endContent={
                <button
                  className="focus:outline-none"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeOff className="text-gray-400" size={20} />
                  ) : (
                    <Eye className="text-gray-400" size={20} />
                  )}
                </button>
              }
              type={isVisible ? 'text' : 'password'}
              className="w-full"
            />

            <div className="flex items-center gap-2">
              <Checkbox checked={isChecked} onChange={setIsChecked} size="sm">
                <span className="text-gray-400">
                  I agree to the{' '}
                  <Link href="#" className="text-accent-500">
                    Terms & Conditions
                  </Link>
                </span>
              </Checkbox>
            </div>

            <Button
              className="w-full bg-primary-600 text-white py-6 rounded-lg hover:bg-primary-700 transition-colors"
              type="submit"
              isLoading={isLoading}
            >
              Create account
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
