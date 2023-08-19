import { Environment, useGLTF } from '@react-three/drei';

const Shirt = (props) => {
    const { nodes, materials } = useGLTF('/model/shirt_baked.glb');
    return (
        <>
            <ambientLight intensity={0.5} />
            <Environment preset='city' />

            <group {...props} dispose={null}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.T_Shirt_male.geometry}
                    material={materials.lambert1}
                />
            </group>
        </>
    );
};

export default Shirt;

useGLTF.preload('/shirt_baked.glb');
