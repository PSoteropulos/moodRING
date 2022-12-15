import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'
import styles from './Background.module.css'
import Footer from './Footer'

const Register = (props) => {
    const {logReg, setLogReg} = props

    const navigate = useNavigate()
    
    const [formData, setFormData] = useState({username:"", email:"", password:"", confirmPassword:""})
    const [errors, setErrors] = useState({})

    const [eye, setEye] = useState(false)
    const Eye = () => {
        setEye(!eye)
    }

    const [confEye, setConfEye] = useState(false)
    const ConfEye = () => {
        setConfEye(!confEye)
    }

    const handleChange= (e) => {
        let key=e.target.name;
        let value=e.target.value;
        setFormData({...formData, [key]:value})
    }

    const submitHandle = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/register',{
            username:formData.username,
            email:formData.email,
            password:formData.password,
            confirmPassword:formData.confirmPassword
        }
        ,{withCredentials:true, credentials:'include'}
        )
        .then((res)=>{
            // Session.set('userID', res.data.user._id)
            // console.log("Session data:", Session.items())
            navigate('/dashboard')
        }).catch((error)=>{
            console.log('register error, clientside',error)
            setErrors(error.response.data.errors)
        })
    }

    return (
        // <div className={styles.animatedGradient}>
        <div className="container-fluid no-gutters m-0 pt-2 pb-5">
            {/* <p className='text-white col pt-5 ' style={{fontFamily:'fantasy', fontSize:56}}>moodRING</p> */}
                <form className='col-12 m-0 p-0 row justify-content-center align-items-center'  onSubmit={submitHandle}>
                    <div className='p-1 col-12'>
                        <label className='form-label text-white h5'>Username:</label>
                        <input type="text" name="username" autoComplete='username' onChange={(e)=>handleChange(e)} value={formData.username} className='form-control'/>
                        {errors.username && <span className='text-danger h6'>{errors.username.message}</span>}<br/>
                    </div>
                    <div className='p-1 col-12'>
                        <label className='form-label text-white h5'>Email:</label>
                        <input type="email" name="email" autoComplete='email' onChange={(e)=>handleChange(e)} value={formData.email} className='form-control'/>
                        {errors.email && <span className='text-danger h6'>{errors.email.message}</span>}<br/>
                    </div>
                    <div className='p-1 col-12'>
                        <label className='form-label text-white h5'>Password:</label>
                        <div className='col-12'>
                            <div className='row m-0 justify-content-end align-items-center col-12'>
                                <input type={eye?"text":'password'} name="password" onChange={(e)=>handleChange(e)} value={formData.password} className='form-control'  />
                                <div className='position-absolute col-1' style={{right:60}}>
                                    <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye" }`} style={{cursor:'pointer', fontSize:'25px', }}></i>
                                </div>
                            </div>
                        </div>
                        {/* <input type='password' name="password"  onChange={(e)=>handleChange(e)} value={formData.password} className='form-control'/> */}
                        {errors.password && <span className='text-danger h6'>{errors.password.message}</span>}<br/>
                    </div>
                    <div className='p-1 col-12'>
                        <label className='form-label text-white h5'>Confirm Password:</label>
                        <div className='col-12'>
                            <div className='row m-0 justify-content-end align-items-center col-12'>
                                <input type={confEye?"text":'password'} name="confirmPassword" onChange={(e)=>handleChange(e)} value={formData.confirmPassword} className='form-control'  />
                                <div className='position-absolute col-1' style={{right:60}}>
                                    <i onClick={ConfEye} className={`fa ${confEye ? "fa-eye-slash" : "fa-eye" }`} style={{cursor:'pointer', fontSize:'25px', }}></i>
                                </div>
                            </div>
                        </div>
                        {/* <input type="password" name="confirmPassword" onChange={(e)=>handleChange(e)} value={formData.confirmPassword} className='form-control'/> */}
                        {errors.confirmPassword && <span className='text-danger h6'>{errors.confirmPassword.message}</span>}<br/>
                    </div>
                    <div className='p-4 m-0 col-12'>
                        <button className='btn btn-danger btn-lg' type='submit'>Register</button>
                    </div>
                </form>
                <p onClick={()=>setLogReg(true)} className='text-white h5'>Already registered? Click to log in.</p>
                {/* <Link style={{textDecoration:'none', fontSize:22}} to={'/login'}>Already registered? Click here to log in</Link> */}
                {/* <Footer/> */}
        </div>
    )
}

export default Register