import { proxy } from 'valtio';

const state = proxy({
    intro: true,
    color: '#79E800',
    decals: ['react', 'threejs', 'logo-tshirt'],
    selectedDecal: 'threejs',
});

export { state };
