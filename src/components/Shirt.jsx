import { Center, Environment, useGLTF } from '@react-three/drei';
import Shadows from './Shadows';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';

const Shirt = () => {
    const { nodes, materials } = useGLTF('/model/shirt_baked.glb');
    const group = useRef();
    useFrame((state, delta) => {
        easing.dampE(group.current.rotation, [
            state.pointer.y / 5,
            -state.pointer.x / 5,
            0,
            0.15,
            delta,
        ]);
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
                    />
                    {/* <Shadows /> */}
                </Center>
            </group>
        </>
    );
};

export default Shirt;

useGLTF.preload('/shirt_baked.glb');
