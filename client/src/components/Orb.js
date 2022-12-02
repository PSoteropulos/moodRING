import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
// import crystalBall from '../assets/anotherball.png' //no-has background
// import crystalBall from '../assets/awesome-orb.png' //top contender
// import crystalBall from '../assets/glass_ball.png'
// import crystalBall from '../assets/moreglass.png' //not bad
// import crystalBall from '../assets/orb_highlight.png'
// import crystalBall from '../assets/orb_shadow.png'
// import crystalBall from '../assets/pngegg.png' //not bad
// import crystalBall from '../assets/pngegg1.png' //decent maybe contender
// import crystalBall from '../assets/sphere.png' //not bad
import crystalBall from '../assets/swirlyball.png' //top contender
// import crystalBall from '../assets/texture.png' //not bad

const Orb = (props) => {

    const {formData, setFormData} = props
    
    const hueRotateVal = formData.hueRotateValue
    const brightnessVal = formData.brightnessValue
    const saturateVal = formData.saturateValue

    const handleChange= (e) => {
        let key=e.target.name;
        let value=e.target.value;
        setFormData({...formData, [key]:value})
    }

    const orbStyle={
        width:200,
        filter:`grayscale(100%)sepia(100%)hue-rotate(${hueRotateVal}deg)brightness(${brightnessVal}%)saturate(${saturateVal}%)`
        // filter:`hue-rotate(${hueRotateVal}deg)saturate(${saturationRotateVal}%)`
    }

    const boxStyle={
        width:400,
        height:400,
        text:'black',
        backgroundColor: '#b5b5b5',
        filter:`grayscale(100%)sepia(50%)hue-rotate(${hueRotateVal}deg)brightness(${brightnessVal/2+50}%)saturate(${saturateVal/5}%)`
        // filter:`hue-rotate(${hueRotateVal}deg)saturate(${saturationRotateVal}%)`
    }

    // const hueValueChange = (e) => {
    //     // console.log(e)
    //     setHueRotateVal(e.target.value)
    //     // console.log(setHueRotateVal)
    // }

    // const saturationValueChange = (e) => {
    //     // console.log(e)
    //     setSaturationRotateVal(e.target.value)
    //     // console.log(setHueRotateVal)
    // }

    return (
        <>
            <div className=''>
                {/* <p id='value'>Hue rotation (0 to 359 degrees) <br/>{hueRotateVal}deg</p>
                <input name='hue' step={0.5} type="range" min={0} max={359} onChange={(e)=>hueValueChange(e)} value={hueRotateVal} ></input>
                <p name='saturationLabel'>Saturation (10 to 300%) <br/>{saturationRotateVal}%</p>
                <input name='saturation' step={0.5} type="range" min={10} max={300} onChange={(e)=>saturationValueChange(e)} value={saturationRotateVal} ></input> */}
                {/* <p id='value'>Sepia</p>
                <input name='hue' step={0.5} type="range" min={0} max={100} onChange={(e)=>setSepiaRotateVal (e.target.value)} value={sepiaRotateVal} ></input> */}
                {setFormData && 
                <div id='sliders'>
                    <p name='hueRotateValLabel'>Hue</p>
                    <input name='hueRotateValue' step={0.25} type="range" min={0} max={359} onChange={(e)=>handleChange(e)} value={hueRotateVal} ></input>
                    <p name='brightnessValLabel'>Brightness</p>
                    <input name='brightnessValue' step={1} type="range" min={50} max={100} onChange={(e)=>handleChange(e)} value={brightnessVal} ></input>
                    <p name='saturateValLabel'>Saturation</p>
                    <input name='saturateValue' step={1} type="range" min={10} max={500} onChange={(e)=>handleChange(e)} value={saturateVal} ></input>
                </div>}
                <div id="image">
                    <div className="tile"><img style={orbStyle} src={crystalBall} alt="" /> </div>
                </div>
                {/* <div>
                    <div className="col" style={boxStyle}>awdawdawdawd</div>
                </div> */}
            </div>
        </>
    )
}

export default Orb