import React from "react";
import './FaceRecognition.css'

const FaceRecognition = ({imageURL, box}) => {

    if (Object.values(box)[0]?.length !== undefined){ 
        var renderBox = [];
        for (let i = 0; i < Object.values(box)[0]?.length; i++) {
            renderBox.push(<div className="bounding-box" key={i} style={{top: box?.topRow?.[i], right: box?.rightCol?.[i], bottom: box?.bottomRow?.[i], left: box?.leftCol?.[i]}}><span>{box?.confidence?.[i]}</span></div>)
//            console.log(renderBox);
        }
    }

   return(
        <div className="center flex justify-around" id="face-recognition">
            <div className="absolute">           
                <img id='inputimage' alt='' src={imageURL} width='500px' height='auto'/>              
                {renderBox}
            </div>
        </div>
    );
}

export default FaceRecognition;
