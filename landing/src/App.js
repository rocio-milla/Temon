import React from 'react';
import './App.css';
import HowItWorks from './Components/comoFunciona';
import Footer from './Components/Footer/Footer';
import SeguinosEnIG from './Components/instagram';
import Menu from './Components/Menu/Menu';
import Test from './Components/Probame/Test';
import Product from './Components/Product';
import Us from './Components/Us';

const App = () => {
  return (
    <div className="App">
      <Menu />
      <Product />
      <Test />
      <HowItWorks />
      <Us />
      <SeguinosEnIG />
      <Footer />
    </div>
  );
}

export default App;

