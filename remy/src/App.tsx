import './App.css';
import Login from './components/pages/login/login';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/pages/home/home';
import Register from './components/pages/register/register';
import requireNotAuth from './controllers/requireNotAuth';
import Pets from './components/pages/pets/pets';
import Layout from './components/pages/layout/layout';
import requireAuth from './controllers/requireAuth';
import Calendar from './components/pages/calendar/calendar';
import Pet from './components/pages/pet/pet';
import UserProfile from './components/pages/user/user';
import PetComponent from './components/pages/pet/pet';


const App = () => {
  const LoginGuard = requireNotAuth(Login)
  const RegisterGuard = requireNotAuth(Register)
  const LayoutWithUser = requireAuth(Layout);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="test" element={<Pet />} />
          <Route path='login' element={<LoginGuard />} />
          <Route path='register' element={<RegisterGuard />} />
          <Route path='/remy' element={<Home />} />
          <Route path='/' element={<LayoutWithUser />} >
            <Route path="pets" element={<Outlet />} >
              <Route index element={<Pets />} />
              <Route path=':petID' element={<PetComponent />} />
            </Route>
            <Route path='calendar' element={<Calendar />} />
            <Route path='user' element={<UserProfile />} />
            <Route path='/' element={<Navigate to="pets" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
