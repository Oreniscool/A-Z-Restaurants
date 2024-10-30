import { useState } from 'react';
import { Input, Button, Checkbox } from '@nextui-org/react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="h-screen bg-gray-900 flex items-center justify-center p-10 px-24">
      <div className="w-full bg-gray-900 rounded-xl overflow-hidden flex h-full justify-between">
        {/* Left side with image and caption */}
        <div className="w-1/2 relative bg-food bg-cover p-8 hidden md:block">
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
              Welcome Back!
              <br />
              Ready to Dine?
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
            Login to your account
          </h1>
          <p className="text-gray-400 mb-8">
            Dont have an account?{' '}
            <Link to="/signup" className="text-accent-500">
              Sign up
            </Link>
          </p>

          <form className="space-y-4">
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              className="w-full"
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              endContent={
                <button
                  className="focus:outline-none"
                  onClick={toggleVisibility}
                  type="button"
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

            <div className="flex items-center justify-between">
              <Checkbox checked={rememberMe} onChange={setRememberMe} size="sm">
                <span className="text-gray-400">Remember me</span>
              </Checkbox>
              <Link to="#" className="text-accent-500 text-sm">
                Forgot password?
              </Link>
            </div>

            <Button className="w-full bg-primary-600 text-white py-6 rounded-lg hover:bg-primary-700 transition-colors">
              Log in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
