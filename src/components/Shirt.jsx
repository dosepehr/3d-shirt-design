import { Center, Environment, useGLTF } from '@react-three/drei';
import Shadows from './Shadows';

const Shirt = () => {
    const { nodes, materials } = useGLTF('/model/shirt_baked.glb');
    return (
        <>
            <ambientLight intensity={0.5} />
            <Environment preset='city' />

            <Center>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.T_Shirt_male.geometry}
                    material={materials.lambert1}
                />
                <Shadows />
            </Center>
        </>
    );
};

export default Shirt;

useGLTF.preload('/shirt_baked.glb');
