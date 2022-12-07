import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Orb from './Orb'
import styles from './Background.module.css'
import NavBar from './NavBar'
import Footer from './Footer'
import uriTip from '../assets/uri_img.png'
import Search from './Search'

const MoodForm = (props) => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({trackURI:"", moodDescription:"", hueRotateValue:0, brightnessValue:75, saturateValue:100, trackSearch:'', artistSearch:'' })
    const [errors, setErrors] = useState({})
    const [displayTooltip, setDisplayTooltip] = useState(false)
    const [pickingTrack, setPickingTrack] = useState(false)

    const [loggedUser, setLoggedUser] = useState("")

    // const backGroundBoxStyle = {background: '#b5b5b5', filter:`grayscale(100%)sepia(50%)hue-rotate(${mood.hueRotateValue}deg)brightness(${mood.brightnessValue/2+50}%)saturate(${mood.saturateValue/5}%)`}

    useEffect(()=>{
            axios.get('http://localhost:8000/api/getLoggedUser', {withCredentials:true})
            .then((res)=>(
                console.log(res),
                setLoggedUser({id:res.data.user._id, username:res.data.user.username})
            )).catch((err)=>(
                console.log(err)
            ))
    }, [])

    const handleChange= (e) => {
        let key=e.target.name;
        let value=e.target.value;
        setFormData({...formData, [key]:value})
    }

    const handleSubmit = (e) => {
        
        e.preventDefault()

        let modifiedTrackURI = formData.trackURI.replace('spotify:track:', '')
        console.log(modifiedTrackURI)
        
        axios.post('http://localhost:8000/api/addMood' ,{
            trackURI: modifiedTrackURI,
            moodDescription: formData.moodDescription,
            hueRotateValue: formData.hueRotateValue,
            brightnessValue: formData.brightnessValue,
            saturateValue: formData.saturateValue,
            postedBy: loggedUser.username

        },{withCredentials:true})
        .then((res)=>{
            console.log(res)
            navigate('/dashboard')
        }).catch((err)=>{
            console.log(err)
            setErrors(err.response.data.errors)})
    }

    return (
        <div className='container-fluid no-gutters' onClick={()=>setPickingTrack(false)}>
            <NavBar username={loggedUser.username}/>
            {/* <p className='m-3 h2 text-white'>Log a Mood</p> */}
            <div className='col-12 row justify-content-center align-items-center p-4'>
                <div style={{background: 'rgba(100,100,100,0.1)'}} className="col-10 row justify-content-center p-3 rounded-4" >
                    
                    <div className='row col-12 mt-3 justify-content-center'>
                        <div className='row col-12 justify-content-center'>
                            <Search formData={formData} setFormData={setFormData} pickingTrack={pickingTrack} setPickingTrack={setPickingTrack}/>
                        </div>
                    {errors.trackURI && <p className=' col-8 text-danger h5'>{errors.trackURI.message}</p>}
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                    <div className='col row m-1 justify-content-center align-items-center'>

                        <div style={{background: 'rgba(100,100,100,0.1)'}} className="col-10 row align-items-center justify-content-center p-4 mt-4 rounded-4">
                            <label className='form-label text-white h4 p-1'>How does this track make you feel?</label>
                            <div className='col-6 p-2'>
                                <input type="text" name="moodDescription"className='form-control' onChange={(e)=>handleChange(e)} value={formData.moodDescription}/>
                            </div>
                        </div>
                        {errors.moodDescription && <span className='text-danger h5'>{errors.moodDescription.message}</span>}<br/>

                        <div className="w-100"></div>

                        <div style={{background: 'rgba(100,100,100,0.1)'}} className='col-10 row rounded-4 justify-content-center align-items-center p-4 mt-4'>
                            <div className='col-12 justify-content-center'>
                                <label className='form-label text-white h4'>What color do you associate with this emotion or track?</label>
                                {errors.hueRotateValue && <span className='text-danger h4'>{errors.hueRotateValue.message}</span>}<br/>
                                {errors.brightnessValue && <span className='text-danger h4'>{errors.brightnessValue.message}</span>}<br/>
                                {errors.saturateValue && <span className='text-danger h4'>{errors.saturateValue.message}</span>}<br/>
                                <Orb size={'75%'} formData={formData} setFormData={setFormData}/>
                            </div>
                        </div>

                        <div className='mt-4'>
                            <button type='submit' className='btn btn-lg btn-danger'>Add Your Mood</button>
                        </div>

                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default MoodForm