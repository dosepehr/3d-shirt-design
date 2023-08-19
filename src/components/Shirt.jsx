import {
    Center,
    Decal,
    Environment,
    useGLTF,
    useTexture,
} from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { state } from '../store/store.js';
import { useSnapshot } from 'valtio';
const Shirt = () => {
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF('/model/shirt_baked.glb');
    const group = useRef();
    const texture = useTexture(`./images/${snap.selectedDecal}.png`);

    useFrame((state, delta) => {
        const isBreakpoint = window.innerWidth <= 1260;
        const isMobile = window.innerWidth <= 600;

        // set the initial position of the model
        let targetPosition = [-1.5, 0, 2];
        if (snap.intro) {
            if (isBreakpoint) targetPosition = [-1, 0, 2];
            if (isMobile) targetPosition = [-1, 0.2, 2.5];
        } else {
            if (isMobile) targetPosition = [-1, 0, 2.5];
            else targetPosition = [-0.8, 0, 2];
        }

        // set model camera position
        easing.damp3(state.camera.position, targetPosition, 0.25, delta);

        easing.dampE(
            group.current.rotation,
            [state.pointer.y / 10, -state.pointer.x / 5, 0],
            0.25,
            delta
        );

        easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
    });
    return (
        <>
            <group ref={group}>
                <ambientLight intensity={0.5} />
                <Environment preset='city' />

                <Center>
                    <mesh
                        rotation-y={-Math.PI / 2 + 1.2}
                        castShadow
                        receiveShadow
                        geometry={nodes.T_Shirt_male.geometry}
                        material={materials.lambert1}
                    >
                        <Decal
                            position={[0, 0.04, 0.15]}
                            rotation={[0, 0, 0]}
                            scale={0.15}
                            map={texture}
                        />
                    </mesh>
                </Center>
            </group>
        </>
    );
};

export default Shirt;

useGLTF.preload('/shirt_baked.glb');
