import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import HowItWorks from './Components/comoFunciona';
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
    </div>
  );
}

export default App;

