import './App.css';
import Login from './components/pages/login/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/home/home';

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
