import React from "react";

const Rank = ({ name, entries }) => {
    return(
        <div className="flex center">
            <div className="white f3">
                {` ${name}, your current entry count is ${entries} `}
            </div>
            {/* <div className="white f3">
                {'#3'}
            </div> */}
        </div>
    );
}


export default Rank;