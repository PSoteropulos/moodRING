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
        <div className='col row fluid align-items-center fluid p-3' style={{background: 'rgba(100,100,100, 0.2)',minHeight:"15vh"}}>
            <div className='col-6 justify-content-start align-items-center'>
                {/* <p className='h4 text-white' style={{fontFamily:'fantasy'}}>Welcome to</p> */}
                <p className="text-white h1" style={{fontFamily:'fantasy'}}>moodRING</p>
            </div>
            <div className='col-6 h4 justify-content-center align-items-center'>
                <div className='text-white h3' style={{fontFamily:'fantasy'}}>
                    {username}
                </div>
                <div>
                    <NavLink to="/dashboard" className='ms-3 h5' style={({isActive})=> isActive? activeStyle:inActiveStyle}>Home</NavLink>
                    <NavLink to="/form" className='ms-3 h5' style={({isActive})=> isActive? activeStyle:inActiveStyle} >Add a new mood</NavLink>
                    {/* <NavLink to="/" className='m-3' style={inActiveStyle} onClick={(e)=>logout(e)} end>Logout</NavLink> */}
                    <button className='btn btn-sm btn-danger ms-3' onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default NavBar