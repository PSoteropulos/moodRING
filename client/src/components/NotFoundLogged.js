import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import NavBar from './NavBar'

const NotFoundLogged = () => {

    const [loggedUser, setLoggedUser] = useState("")

    useEffect(()=>{
        axios.get('http://localhost:8000/api/getLoggedUser', {withCredentials:true})
            .then((res)=>(
                console.log(res),
                setLoggedUser({id:res.data.user._id, username:res.data.user.username})
            )).catch((err)=>(
                console.log(err)
            ))
        }, [])

    return (
        <div className='container-fluid no-gutters m-0 p-0'>
        <NavBar username={loggedUser.username}/>
            <div className='row justify-content-center'>
                <p className='col-8 row justify-content-center m-5 text-white h2'> <span>The page you are looking for does not exist, or is unauthorized. Please click <Link className='' to='/dashboard'>here</Link> to return home.</span></p> 
            </div>
        </div>
    )
}

export default NotFoundLogged