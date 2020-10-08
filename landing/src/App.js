import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Menu from './Components/Menu/Menu';
import Test from './Components/Probame/Test';
import Product from './Components/Product';
import Us from './Components/Us';

const App = () => {
  // const appPlayer = useRef();
  // const [isPaused, setIsPaused] = useState(false);

  // useEffect(() => {
  //   let { player } = appPlayer.current.getState();
  //   player.volume = 0.3;
  // }, [])

  // const handlePlay = () => {
  //   let { player } = appPlayer.current.getState();
  //   if (player.paused) {
  //     appPlayer.current.play();
  //     setIsPaused(false);
  //   }
  //   else {
  //     setIsPaused(true)
  //     appPlayer.current.pause()
  //   }
  // }

  return (
    <div className="App">
      <Menu/>
      <Product />
      <Test/>
      <Us/>
    </div>
  );
}

export default App;

