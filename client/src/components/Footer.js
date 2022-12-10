import React from 'react'
import linkedIn from '../assets/linkedin.png'
import gitHub from '../assets/github.png'

const Footer = () => {
    return (
        <div className='fixed-bottom text-secondary' style={{background: 'rgba(20,20,20, 0.8)'}}>Designed and developed by Paul Soteropulos, Full-Stack Engineer <a className='text-secondary' href="https://www.linkedin.com/in/paulsoteropulos/"><img className='rounded-1' style={{width:22}}src={linkedIn} alt="linkedIn" /></a> <a className='text-secondary' href="https://github.com/PSoteropulos"><img  style={{width:36}}src={gitHub} alt="github" /></a></div>
    )
}
export default Footer