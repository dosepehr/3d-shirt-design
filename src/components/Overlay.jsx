import { useSnapshot } from 'valtio';
import { state } from '../store/store.js';

export default function Overlay() {
    const { intro } = useSnapshot(state);

    return (
        <div className='container'>
            <header>
                <img src='./images/stylish-tshirt.png' alt='' />
            </header>

            {intro ? <Intro /> : <Customizer />}
        </div>
    );
}

function Intro() {
    return (
        <section key='main'>
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
        </section>
    );
}

function Customizer() {
    const { colors, decals, selectedColor } = useSnapshot(state);

    return (
        <section key='custom'>
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
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <button className='share' style={{ background: selectedColor }}>
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
        </section>
    );
}
