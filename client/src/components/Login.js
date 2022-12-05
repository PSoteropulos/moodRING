import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'
import styles from './Background.module.css'
import Footer from './Footer'

const Login = (props) => {
    
    const navigate = useNavigate()
    
    const [formData, setFormData] = useState({email:"", password:""})
    const [errors, setErrors] = useState("")

    const handleChange= (e) => {
        let key=e.target.name;
        let value=e.target.value;
        setFormData({...formData, [key]:value})
    }

    const submitHandle = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/login',{
            email:formData.email,
            password:formData.password
        }
        ,{withCredentials:true, credentials:'include'}
        )
        .then((res)=>{
            // console.log("here is userID", {id:res.data.user._id})
            // setUserID(res.data.user._id)
            // Session.set('userID', res.data.user._id)
            // console.log("Session data:", Session.items())
            navigate('/dashboard')
        }).catch((error)=>{
            console.log('login error, clientside',error)
            setErrors(error.response.data.error)
        })
    }

    return (
        <div className={styles.animatedGradient}>
            <h1 className='p-4 text-white'>Login to moodRING</h1>
                {errors && <span className='text-danger h4'>{errors}</span>}<br/>
                <form className='col-4 mx-auto p-4' onSubmit={submitHandle}>
                    <label className='form-label text-white h5 pt-3'>Email:</label>
                    <input type="text" name="email" onChange={(e)=>handleChange(e)} value={formData.email} className='form-control'/>
                    <label className='form-label text-white h5 pt-3'>Password:</label>
                    <input type='password' name="password" onChange={(e)=>handleChange(e)} value={formData.password} className='form-control'/>
                    {/* {errors && <span className='text-warning'>{errors}</span>}<br/> */}
                    <button className='btn btn-danger btn-lg m-5' type='submit'>Login</button>
                </form>
            <Link style={{textDecoration:'none', fontSize:22}} to={'/register'}>Not yet registered? Register here</Link>
            <Footer/>
        </div>
    )
}

export default Login