import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import face from './face.png'

const Logo = () => {
    return(
        <div className="ma4 mt0">
            <Tilt tiltMaxAngleX={30} tiltMaxAngleY={30} className='Tilt br2 shadow-3 pa3' style ={{height: '150px', width: '150px'}}>
                <img src={face} alt="face_image"/>
            </Tilt>
        </div>
    );
}

export default Logo;