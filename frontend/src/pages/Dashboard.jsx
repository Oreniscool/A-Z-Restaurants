import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingScreen from '../components/LoadingScreen';
import AuthFail from '../components/AuthFail';
const Dashboard = () => {
  const [location, setLocation] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleChange = (value) => {
    console.log(value.target.innerText);
    setLocation(value.target.innerText);
  };
  const checkAuth = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user/isAuth', {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      });
      if (response.status == 200) {
        setAuthenticated(true);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <div className="w-screen h-screen p-5 bg-secondary-900 flex gap-5 overflow-hidden">
      <Sidebar></Sidebar>
      {loading ? (
        <LoadingScreen></LoadingScreen>
      ) : authenticated ? (
        <Outlet context={[location, setLocation, handleChange]}></Outlet>
      ) : (
        <AuthFail></AuthFail>
      )}
    </div>
  );
};

export default Dashboard;
