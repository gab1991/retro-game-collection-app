import React from 'react';
import styles from './PlatformCard.css';


function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
const gamepadImages = importAll(require.context('../../assets/images/icons/', false, /\.(png|jpe?g|svg)$/));

export default function PlatformCard(props) {
    let gamepadImage = '';

    switch(props.name) {
        case 'Sega Genesis' : gamepadImage= gamepadImages['Sega Genesis.png'];
        break;
        case 'Nintendo Entertainment System' : gamepadImage= gamepadImages['Nintendo NES.png'];
        break;
    }

    return (
        <div className={styles.PlatformCard}>
            <div><h1>{props.name}</h1></div>
            <div><img src={gamepadImage} alt={props.name}/></div>
        </div>
    )
}




