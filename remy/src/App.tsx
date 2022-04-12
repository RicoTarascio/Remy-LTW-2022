import './App.css';
import Textfield from './components/input/textfield/textfield';

const App = () => {
  return (
    <>
      <h1>Remy</h1>
      <div className='textfield-holder'>
        <Textfield size="big" type="email" changeCallback={(e: any) => { console.log(e) }} placeholder='Inserisci la tua email' label='Email' required icon='Profile' />
      </div>

    </>
  );
}

export default App;
