import React from 'react';
import ReactDOM from 'react-dom';
import './static/index.css';
import { Canvas } from '@react-three/fiber';
import Scene from './App';

ReactDOM.render(
  <div id="canvas-container">
    <Canvas flat camera={{ position: [4, 2, 5] }}>
      <Scene />
    </Canvas>
  </div>,
  document.getElementById('root'),
);