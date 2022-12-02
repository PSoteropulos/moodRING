import React from 'react'
import styles from './Landing.module.css'
// import bootstrap from 'bootstrap'

const Landing = () => {
    
    return (
        <div className={styles.animatedGradient}>
            <div>
                <h1 className='text-white col mt-3'>moodRING</h1>
                <img src="" alt="content" />
                <h1>member? login</h1>
                <a href="/form">form</a>
                <a href="/dashboard">dashboard</a>
            </div>
        </div>
    )
}

export default Landing