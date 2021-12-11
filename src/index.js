import React from 'react';
import ReactDOM from 'react-dom';
import './static/index.css';
import { Canvas } from '@react-three/fiber';
import Scene from './App';

ReactDOM.render(
  <div id="canvas-container">
    <Canvas flat camera={{ position: [4, 2, 5] }}>
      <color attach="background" args={["#262837"]} />
      <fog attach="fog" args={['#262837', 1, 15]} />
      <Scene />
    </Canvas>
  </div>,
  document.getElementById('root'),
);