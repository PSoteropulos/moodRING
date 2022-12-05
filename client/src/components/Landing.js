import React from 'react'
import styles from './Background.module.css'
import {useNavigate, Link} from 'react-router-dom'
// import bootstrap from 'bootstrap'

const Landing = () => {
    
    return (
        <div>
        {/* <div className={styles.animatedGradient}> */}
            <div>
                <p className='text-white col p-3 h1' style={{fontFamily:'fantasy'}}>moodRING</p>
                <img src="" alt="content" />
                <a href="/form">form</a>
                <a href="/dashboard">dashboard</a>
                <p className='text-white h3'>Ready to dive in? Click <Link style={{textDecoration:'none'}} to={'/register'}> here to register</Link>, or  <Link style={{textDecoration:'none'}} to={'/login'}>here to log in</Link>!</p>
            </div>
        </div>
    )
}











// things to do:
// update landing description and photo
// update instructions and make onClick
// make navbar button flyout
// make one user page
// toggle your dashboard/all entries


















export default Landing