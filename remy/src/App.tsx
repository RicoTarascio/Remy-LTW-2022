import './App.css';
import Login from './components/pages/login/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/home/home';
import Register from './components/pages/register/register';
import RequireNotAuth from './controllers/requireNotAuth';
import requireNotAuth from './controllers/requireNotAuth';


const App = () => {
  const LoginGuard = requireNotAuth(Login)
  const RegisterGuard = requireNotAuth(Register)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<LoginGuard />} />
          <Route path='register' element={<RegisterGuard />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
