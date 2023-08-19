import { useSnapshot } from 'valtio';
import { state } from '../store/store.js';
import { motion, AnimatePresence } from 'framer-motion';
export default function Overlay() {
    const { intro } = useSnapshot(state);
    const transition = { type: 'spring', duration: 0.8 };

    const config = {
        initial: {
            x: -100,
            opacity: 0,
            transition: { ...transition, delay: 0.5 },
        },
        animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
        exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
    };
    return (
        <div className='container'>
            <motion.header
                initial={{
                    opacity: 0,
                    y: -120,
                }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', duration: 1.8, delay: 1 }}
            >
                <img src='./images/stylish-tshirt.png' alt='' />
            </motion.header>

            <AnimatePresence>
                {intro ? (
                    <Intro key='main' config={config} />
                ) : (
                    <Customizer key='custom' config={config} />
                )}
            </AnimatePresence>
        </div>
    );
}

function Intro({ config }) {
    return (
        <motion.section key='main' {...config}>
            <div className='section--container'>
                <div>
                    <h1>LET'S DO IT.</h1>
                </div>
                <div className='support--content'>
                    <div>
                        <p>
                            Create your unique and exclusive shirt with our
                            brand-new 3D customization tool.{' '}
                            <strong>Unleash your imagination</strong> and define
                            your own style.
                        </p>
                        <button
                            style={{ background: 'black' }}
                            onClick={() => (state.intro = false)}
                        >
                            CUSTOMIZE IT
                        </button>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}

function Customizer({ config }) {
    const downloadImg = () => {
        const link = document.createElement('a');
        link.setAttribute('download', 'canvas.png');
        link.setAttribute(
            'href',
            document
                .querySelector('canvas')
                .toDataURL('image/png')
                .replace('image/png', 'image/octet-stream')
        );
        link.click();
    };
    const { colors, decals, selectedColor } = useSnapshot(state);

    return (
        <motion.section key='custom' {...config}>
            <div className='customizer'>
                <div className='color-options'>
                    {colors.map((color) => (
                        <div
                            key={color}
                            className='circle'
                            style={{ background: color }}
                            onClick={() => (state.selectedColor = color)}
                        ></div>
                    ))}
                </div>
                <div className='decals'>
                    <div className='decals--container'>
                        {decals.map((decal) => (
                            <div key={decal} className='decal'>
                                <img
                                    src={`./images/${decal}.png`}
                                    alt='brand'
                                    onClick={() =>
                                        (state.selectedDecal = decal)
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    onClick={downloadImg}
                    className='share'
                    style={{ background: selectedColor }}
                >
                    DOWNLOAD
                </button>
                <button
                    className='exit'
                    style={{ background: selectedColor }}
                    onClick={() => (state.intro = true)}
                >
                    GO BACK
                </button>
            </div>
        </motion.section>
    );
}
