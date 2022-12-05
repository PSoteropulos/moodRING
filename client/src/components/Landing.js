import React from 'react'
import styles from './Background.module.css'
import {useNavigate, Link} from 'react-router-dom'
import screenshot from '../assets/moodringclip.PNG'
import Footer from './Footer'
// import bootstrap from 'bootstrap'

const Landing = () => {
    
    return (
        <div>
        {/* <div className={styles.animatedGradient}> */}
            <div>
                <p className='text-white col pt-3 ' style={{fontFamily:'fantasy', fontSize:56}}>moodRING</p>
                <div className='col row justify-content-center'>
                    <div className='col-10 row justify-content-center'>
                        <div className='text-white h4 col-10 rounded-2' style={{background: 'rgba(100,100,100,0.2)'}}>
                            <p>From the Merriam-Webster dictionary</p>
                            <p>music: the science or art of ordering tones or sounds in succession, in combination, and in temporal relationships to produce a composition having unity and continuity</p>
                            <p>What music means to each of us and how we interpret what we hear is as unique as were are. What is not unique is the power a song can have on a person. At moodRING we want you to express that moment in time, with words and with color, to immortalize your experience.</p>
                        </div>
                    </div>
                    <div className='col-10 mt-2' >
                        <img className='col-8 rounded-2' src={screenshot} alt="content_screenshot" />
                    </div>
                </div>
                <p className='text-white h3 mt-3 mb-5'>Ready to dive in? Click <Link style={{textDecoration:'none'}} to={'/register'}> here to register</Link>, or  <Link style={{textDecoration:'none'}} to={'/login'}>here to log in</Link>!</p>
            </div>
            <Footer/>
        </div>
    )
}











// things to do:
// make navbar button flyout (add anonymous/not on dashboard, add toggle for animated bg or static, +standard stuff)
// make one user page
// toggle your dashboard/all entries
// update routes for logged in access, and make a catch all 
// make views from components

// bonus:
// fuck with spotify api for search


















export default Landing