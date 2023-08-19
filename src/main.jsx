import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Canvas } from '@react-three/fiber';
import Shirt from './components/Shirt';
import { OrbitControls } from '@react-three/drei';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Canvas
            eventSource={document.getElementById('root')}
            eventPrefix='client'
            camera={{
                position: [-1, 0, 2.5],
                fov: 25,
            }}
        >
            <Shirt />
            <OrbitControls />
        </Canvas>
        <App />
    </StrictMode>
);

