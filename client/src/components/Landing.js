import React, {useState} from 'react'
import styles from './Background.module.css'
import {useNavigate, Link} from 'react-router-dom'
import screenshot from '../assets/moodringclip.PNG'
import Footer from './Footer'
import Login from './Login'
import Register from './Register'
// import bootstrap from 'bootstrap'

const Landing = () => {
    const [logReg, setLogReg] = useState(true)
    
    return (
        <div>
        {/* <div className={styles.animatedGradient}> */}
            <div>
                <div className='col row justify-content-center align-items-center m-1 mb-5'>
                    <div className='row col-12 justify-content-center align-items-center'>
                        <div className='row col-12 justify-content-center align-items-center m-2'>
                            <p className='text-white' style={{fontFamily:'fantasy', fontSize:80}}>moodRING</p>
                        </div>
                        <div className='row col-12 justify-content-center align-items-center'>
                            <div className='col-12 row justify-content-center align-items-center'>
                                <div className='text-white h5 p-2 col-12 rounded-4' style={{background: 'rgba(100,100,100,0.2)'}}>
                                    <p>From the Merriam-Webster dictionary</p>
                                    <p>music: the science or art of ordering tones or sounds in succession, in combination, and in temporal relationships to produce a composition having unity and continuity</p>
                                    <p>What music means to each of us and how we interpret what we hear is as unique as we are. What is not unique is the power a song can have on a person. At moodRING we want you to express that moment in time, with words and with color, to immortalize your experience.</p>
                                </div>
                            </div>
                            <div className='col-12 row justify-content-center align-items-center p-2'>
                                <div className='col-6 row justify-content-center align-items-center' >
                                    <img className='col-12 rounded-4' src={screenshot} alt="content_screenshot" />
                                </div>
                                <div className='col-6 row justify-content-center align-items-center rounded-4'>
                                    {logReg?
                                    <Login logReg={logReg} setLogReg={setLogReg}/>
                                    :
                                    <Register logReg={logReg} setLogReg={setLogReg}/>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <p className='text-white h3 mt-3 mb-5'>Ready to dive in? Click <Link style={{textDecoration:'none'}} to={'/register'}> here to register</Link>, or  <Link style={{textDecoration:'none'}} to={'/login'}>here to log in</Link>!</p> */}
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