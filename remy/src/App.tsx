import './App.css';
//import Textfield from './components/input/textfield/textfield';
import Login from './components/pages/login/login';

const App = () => {
  return (
    <>
      <h1>Remy</h1>
      {/*
      <div className='textfield-holder'>
        <Textfield size="big" type="email" changeCallback={(e: any) => { console.log(e) }} placeholder='Inserisci la tua email' label='Email' required icon='Profile' />
      </div>
      */}
      

      <div>
        <Login></Login>
      </div>

    </>
  );
}

export default App;
