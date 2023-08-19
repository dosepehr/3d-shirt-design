import { proxy } from 'valtio';

const state = proxy({
    intro: true,
    color: '#EFBD48',
    decals: ['react', 'threejs', 'logo-tshirt'],
    selectedDecal: 'ai',
});

export { state };
