import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

const NavBar = (props) => {

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
        <div className='col-12 fluid p-3' style={{background: 'rgba(100,100,100, 0.2)',minHeight:"20vh"}}>
                <h1 className="text-white">moodRING</h1>
                <h3 className='text-white p-2'>Hey </h3>
                {/* <div className='border justify-content-start'> */}
                    <NavLink to="/dashboard" className='m-3' style={({isActive})=> isActive? activeStyle:inActiveStyle}>Home</NavLink>
                    <NavLink to="/form" className='m-3' style={({isActive})=> isActive? activeStyle:inActiveStyle} >Add a new mood</NavLink>
                    {/* <NavLink to="/" className='m-3' style={inActiveStyle} onClick={(e)=>logout(e)} end>Logout</NavLink> */}
                    <button className='btn btn-danger' onClick={logout}>Logout</button>
                {/* </div> */}
        </div>
    )
}

export default NavBar