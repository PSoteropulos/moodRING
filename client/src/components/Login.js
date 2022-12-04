import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'

const Login = (props) => {
    
    const navigate = useNavigate()
    
    const [formData, setFormData] = useState({email:"", password:""})
    const [errors, setErrors] = useState({})

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
        },{withCredentials:true, credentials:'include'})
        .then((res)=>{
            // console.log("here is userID", {id:res.data.user._id})
            // setUserID(res.data.user._id)
            // Session.set('userID', res.data.user._id)
            // console.log("Session data:", Session.items())
            navigate('/dashboard')
        }).catch((error)=>{
            console.log(error)
        })
    }

    return (
        <div className='g-0 bg-secondary p-3'>
            <h1>Login to moodRING</h1>
            <Link to={'/register'}>Not yet registered? Register here</Link>
                <form className='col-4 mx-auto' onSubmit={submitHandle}>
                    <label className='form-label'>Email:</label>
                    <input type="text" name="email" onChange={(e)=>handleChange(e)} value={formData.email} className='form-control'/>
                    {errors.email && <span className='text-warning'>{errors.email.message}</span>}<br/>
                    <label className='form-label'>Password:</label>
                    <input type='password' name="password" onChange={(e)=>handleChange(e)} value={formData.password} className='form-control'/>
                    {errors.password && <span className='text-warning'>{errors.password.message}</span>}<br/>
                    <button className='btn btn-info mt-3' type='submit'>Login</button>
                </form>
        </div>
    )
}

export default Login