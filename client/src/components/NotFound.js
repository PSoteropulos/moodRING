import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className='row justify-content-center'>
            <p className='col-8 row justify-content-center m-5 text-white h2'><span>The page you are looking for does not exist, or is unauthorized. Please click <Link to='/login'>here</Link> to log in.</span></p> 
        </div>
    )
}

export default NotFound