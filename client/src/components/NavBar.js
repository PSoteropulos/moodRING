import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

const NavBar = (props) => {

    const {username} = props

    const navigate = useNavigate()

    let activeStyle={
        color: "#DC3545"
    }
    let inActiveStyle={
        color: "white"
    }

    const logout = (e) => {
        axios.get('http://localhost:8000/api/logout', {withCredentials:true})
        .then((res)=>{
            // Session.clear()
            // console.log("Session data:", Session.items())
            // res.clearCookie('userToken')
            console.log('Logged out on front end')
            navigate('/')
        }).catch((err)=>{
            console.log(err)
        })
    }


    return (
        <div className='container-fluid no-gutters justify-content-evenly row m-0 p-0' style={{background: 'rgba(100,100,100, 0.15)',minHeight:"15vh"}}>
            <div className='col-4 row justify-content-center align-items-center'>
                {/* <p className='h4 text-white' style={{fontFamily:'fantasy'}}>Welcome to</p> */}
                <p className="text-white m-0 p-0 row justify-content-start" style={{fontFamily:'fantasy', fontSize:58}}>moodRING</p>
                <p className='text-white mb-2 p-0 h2 row justify-content-start' style={{fontFamily:'fantasy'}}>
                    {username}
                </p>
            </div>
            <div className='col-4 row justify-content-end align-items-center'>
                <div className='row justify-content-end'>
                    <NavLink to="/dashboard" className='h5 row justify-content-end' style={({isActive})=> isActive? activeStyle:inActiveStyle}>The Feed</NavLink>
                    <NavLink to={`/view/${username}`} className='h5 row justify-content-end' style={({isActive})=> isActive? activeStyle:inActiveStyle}>Your Moods</NavLink>
                    <NavLink to="/form" className='h5 row justify-content-end' style={({isActive})=> isActive? activeStyle:inActiveStyle}>New mood</NavLink>
                    <NavLink to='/' className='h5 row justify-content-end' style={inActiveStyle}onClick={logout}>Logout</NavLink>
                </div>
            </div>
        </div>
    )
}

export default NavBar