import './App.css';
import Login from './components/pages/login/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/home/home';
import Register from './components/pages/register/register';
import RequireNotAuth from './controllers/requireNotAuth';


const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<RequireNotAuth><Login /></RequireNotAuth>} />
          <Route path='register' element={<RequireNotAuth><Register /></RequireNotAuth>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
