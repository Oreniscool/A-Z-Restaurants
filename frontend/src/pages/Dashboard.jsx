import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';
const Dashboard = () => {
  const [location, setLocation] = useState('');
  const handleChange = (value) => {
    console.log(value.target.innerText);
    setLocation(value.target.innerText);
  };
  return (
    <div className="w-screen h-screen p-5 bg-secondary-900 flex gap-5 overflow-hidden">
      <Sidebar></Sidebar>
      <Outlet context={[location, setLocation, handleChange]}></Outlet>
    </div>
  );
};

export default Dashboard;
