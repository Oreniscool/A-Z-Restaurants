import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './components/Home';
import Search from './components/Search';
import Bookings from './components/Bookings';
import Help from './components/Help';
import Settings from './components/Settings';
function App() {
  return (
    <BrowserRouter>
      {/* <AppLayout> */}
      <Routes>
        <Route path="landing" element={<Landing></Landing>}></Route>
        <Route path="signup" element={<SignUp></SignUp>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="dashboard" element={<Dashboard></Dashboard>}>
          <Route path="home" element={<Home></Home>}></Route>
          <Route path="search" element={<Search></Search>}></Route>
          <Route path="bookings" element={<Bookings></Bookings>}></Route>
          <Route path="help" element={<Help></Help>}></Route>
          <Route path="settings" element={<Settings></Settings>}></Route>
        </Route>
        <Route
          path="*"
          element={
            <div className="w-full h-full bg-[#232323] text-text flex flex-col justify-center items-center">
              <h1>
                Looks like you went astray,{' '}
                <a href="/home" className="text-accent">
                  click here to go back.
                </a>
              </h1>
            </div>
          }
        />
      </Routes>
      {/* </AppLayout> */}
    </BrowserRouter>
  );
}

export default App;
