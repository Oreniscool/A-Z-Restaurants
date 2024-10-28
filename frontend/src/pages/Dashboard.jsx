import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
const Dashboard = () => {
  return (
    <div className="w-screen h-screen p-5 bg-secondary-900 flex">
      <Sidebar></Sidebar>
      <Outlet></Outlet>
    </div>
  );
};

export default Dashboard;
