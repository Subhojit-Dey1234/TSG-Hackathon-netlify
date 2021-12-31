import React from 'react'
import topCircle from "../../Images/TopCircle.png";
import topCircle1 from "../../Images/topCircle1.png";
import topCircle2 from "../../Images/topCircle2.png";
import triangle from "../../Images/triangular.png";
import './style.css'

export default function Images() {
    return (
        <div>
            <img className="topCircle" src={topCircle} alt="Top Circle" />
			<img className="topCircle1" src={topCircle1} alt="Top Circle" />
			<img className="topCircle2" src={topCircle2} alt="Top Circle" />
            <img className="triangle" src={triangle} alt='triangle'/>
        </div>
    )
}
