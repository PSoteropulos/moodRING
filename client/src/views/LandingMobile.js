import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import screenshot from "../assets/moodringclip.PNG";
import styles from '../components/Background.module.css'
import Footer from "../components/Footer";
import LoginMobile from "../components/LoginMobile";
import RegisterMobile from "../components/RegisterMobile";
// import bootstrap from 'bootstrap'

const Landing = () => {
    const [logReg, setLogReg] = useState(true);

    return (
    <div className="container-fluid no-gutters m-0 p-0">
        <div className="col row justify-content-center align-items-center m-0">
            <div className="col-12 justify-content-center align-items-center">
                <p className="text-white" style={{ fontFamily: "fantasy", fontSize: 42 }}>
                moodRING
                </p>
            </div>
            <div className="col-12 m-2 justify-content-center align-items-center">
                <a href="/dashboard">
                    <img
                    className="col-12 rounded-4"
                    src={screenshot}
                    alt="content_screenshot"
                    />
                </a>
            </div>
            <div className="row col-11 justify-content-center align-items-center m-0 p-0">
                <div className="text-white p-0 col-12 rounded-4 p-1" style={{ background: "rgba(100,100,100,0.2)" }}>
                    <p>From the Merriam-Webster dictionary</p>
                    <p>
                    music: the science or art of ordering tones or sounds in
                    succession, in combination, and in temporal relationships to
                    produce a composition having unity and continuity
                    </p>
                    <p>
                    What music means to each of us and how we interpret what we
                    hear is as unique as we are. What is not unique is the power
                    a song can have on a person. At moodRING we want you to
                    express that moment in time, with words and with color, to
                    immortalize your experience.
                    </p>
                </div>
            <div className="col-12 justify-content-center align-items-center rounded-4">
                {logReg ? (
                <LoginMobile logReg={logReg} setLogReg={setLogReg} />
                ) : (
                <RegisterMobile logReg={logReg} setLogReg={setLogReg} />
                )}
            </div>
        </div>
        {/* <p className='text-white h3 mt-3 mb-5'>Ready to dive in? Click <Link style={{textDecoration:'none'}} to={'/register'}> here to register</Link>, or  <Link style={{textDecoration:'none'}} to={'/login'}>here to log in</Link>!</p> */}
        </div>
        <Footer />
    </div>
    );
};

export default Landing;