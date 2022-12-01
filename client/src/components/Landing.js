import React from 'react'
import styles from './Landing.module.css'

const Landing = () => {
    const bgStyle = {
        animationClass:styles
        // animatedGradient {
        //     animation: animateBg 20s linear infinite;
        //     background-image: linearGradient(90deg,#32287b,#671d57,#660b0b,#80451e,#858f32,#2b6441,#064a7f,#32287b,#671d57);
        //     background-size: 800% 100%;
        // }
        // @keyframes animateBg {
        //     0% { background-position: 0% 0%; }
        //     100% { background-position: 100% 0%; }
        // }
    }
    return (
        <div className={styles.animatedGradient} style={{minHeight:'100vh'}}>
            <div>
                <h1>moodRING</h1>
                <img src="" alt="content" />
                <h1>member? login</h1>
            </div>
        </div>
    )
}

export default Landing