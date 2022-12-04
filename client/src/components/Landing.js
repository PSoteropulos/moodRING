import React from 'react'
import styles from './Background.module.css'
import {useNavigate, Link} from 'react-router-dom'
// import bootstrap from 'bootstrap'

const Landing = () => {
    
    return (
        <div className={styles.animatedGradient}>
            <div>
                <h1 className='text-white col p-3'>moodRING</h1>
                <img src="" alt="content" />
                <a href="/form">form</a>
                <a href="/dashboard">dashboard</a>
                <p className='text-white h3'>Ready to dive in? Click <Link style={{textDecoration:'none'}} to={'/register'}> here to register</Link>, or  <Link style={{textDecoration:'none'}} to={'/login'}>here to log in</Link>!</p>
            </div>
        </div>
    )
}

export default Landing