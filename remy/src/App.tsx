import './App.css';
import Login from './components/pages/login/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/home/home';
import Register from './components/pages/register/register';
import RequireNotAuth from './controllers/requireNotAuth';
import requireNotAuth from './controllers/requireNotAuth';
import Pets from './components/pages/pets/pets';
import Layout from './components/pages/layout/layout';
import requireAuth from './controllers/requireAuth';
import Calendar from './components/pages/calendar/calendar';
import User from './components/pages/user/user';
import Pet from './components/pages/pet/pet';


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
            <Route index element={<Pets />} />
            <Route path='calendar' element={<Calendar />} />
            <Route path='user' element={<User />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
