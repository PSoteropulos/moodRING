import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'
import styles from './Background.module.css'

const Register = (props) => {

    const navigate = useNavigate()
    
    const [formData, setFormData] = useState({username:"", email:"", password:"", confirmPassword:""})
    const [errors, setErrors] = useState({})

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
        <div className={styles.animatedGradient}>
            <h1 className='p-4 text-white'>Register for moodRING</h1>
                <form className='col-4 mx-auto p-5' onSubmit={submitHandle}>
                    <label className='form-label text-white h5 pt-2'>Username:</label>
                    <input type="text" name="username" onChange={(e)=>handleChange(e)} value={formData.username} className='form-control'/>
                    {errors.username && <span className='text-danger h6'>{errors.username.message}</span>}<br/>
                    <label className='form-label text-white h5 pt-2'>Email:</label>
                    <input type="text" name="email" onChange={(e)=>handleChange(e)} value={formData.email} className='form-control'/>
                    {errors.email && <span className='text-danger h6'>{errors.email.message}</span>}<br/>
                    <label className='form-label text-white h5 pt-2'>Password:</label>
                    <input type='password' name="password" onChange={(e)=>handleChange(e)} value={formData.password} className='form-control'/>
                    {errors.password && <span className='text-danger h6'>{errors.password.message}</span>}<br/>
                    <label className='form-label text-white h5 pt-2'>Confirm Password:</label>
                    <input type="password" name="confirmPassword" onChange={(e)=>handleChange(e)} value={formData.confirmPassword} className='form-control'/>
                    {errors.confirmPassword && <span className='text-danger h6'>{errors.confirmPassword.message}</span>}<br/>
                    <button className='btn btn-danger btn-lg mt-3' type='submit'>Register</button>
                </form>
                <Link style={{textDecoration:'none', fontSize:22}} to={'/login'}>Already registered? Click here to log in</Link>
        </div>
    )
}

export default Register