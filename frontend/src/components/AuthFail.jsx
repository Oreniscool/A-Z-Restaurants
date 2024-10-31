import React from 'react';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
const AuthFail = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white w-[97%] rounded-[2.5rem] flex flex-col justify-center items-center p-10">
      <div className="flex flex-col items-center">
        <h1>Authentication Failed, please login</h1>
        <Button onClick={() => navigate('/login')}>Login</Button>
      </div>
    </div>
  );
};

export default AuthFail;
