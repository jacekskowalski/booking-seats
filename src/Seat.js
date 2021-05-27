import React, { useState } from "react";


const Seat = ({ top, left, isReserved = true, isRecommended = false }) => {
    const [isClicked, setIsClicked] = useState(false);

    const changeBackgroundColor = () => { setIsClicked(o => !o); }
    if (isReserved === true) {
        return (
            <button className={"btn--custom reserved"}
                style={{ position: "absolute", top: top, left: left, cursor: "auto" }}></button>
        );
    } else if (isRecommended === true) {
        return (
            <button className={`btn--custom active ${isClicked ? "defaultBackground" : "active"}`}
                onClick={changeBackgroundColor}
                style={{ position: "absolute", top: top, left: left }}></button>
        );
    }
    return (
        <button className={`btn--custom ${isClicked ? "active" : "defaultBackground"}`}
            onClick={changeBackgroundColor}
            style={{ position: "absolute", top: top, left: left }}></button>
    );
}
export default Seat;