import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Orb from './Orb'
import styles from './Background.module.css'
import NavBar from './NavBar'
import uriTip from '../assets/uri_img.png'

const MoodForm = (props) => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({trackURI:"", moodDescription:"", hueRotateValue:0, brightnessValue:75, saturateValue:100 })
    const [errors, setErrors] = useState({})
    const [displayTooltip, setDisplayTooltip] = useState(false)

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
        <div>
            <NavBar username={loggedUser.username}/>
            <p className='m-3 h2 text-white'>Log a Mood</p>
            <div className='col-12 row justify-content-center align-items-center p-3'>
                <form style={{background: 'rgba(100,100,100,0.2)'}} className="col-10 p-3 rounded-4" onSubmit={handleSubmit}>
                    {displayTooltip&& <div onClick={()=>setDisplayTooltip(false)} style={{position:'fixed', top:'5vh', width: '75%', height:'90vh', zIndex:1, background: 'rgba(0,0,0,0.95)'}} className='text-white justify-content-center rounded-4 h5 m-3 p-4'>
                        <p className='p-1'>In your Spotify desktop or browser app, right-click on the track you wish to share.</p>
                        <p className='p-1'>In the dropdown menu that opens, hover youre mouse over the Share option towards the bottom. You should see two flyout options to the right (Copy Song Link, and Embed track).</p>
                        <p className='p-1'>Hold down ALT on Windows (and whatever the Mac equivalent is, for you crazy Apple kids). The Copy Song Link option should change to 'Copy Spotify URI'. Click this, and paste it in to the form field on moodRING by pressing CTRL + V, or right clicking in the field and selecting paste on the dropdown.</p>
                        <p className='p-1'>(Click anywhere within this window to dismiss this message.)</p>
                        <img style={{width:650}} src={uriTip} alt="instructions" />
                    </div>}
                    <div className='col row m-1 justify-content-center align-items-center'>
                        <div style={{minHeight:'20vh'}} className='col-4 m-3 mb-3 justify-content-center row align-items-evenly'>
                                <label className='form-label text-white h4 p-2'>Track URI:</label>
                                <p className='text-info h6 col-6 pb-2' onClick={(e)=>setDisplayTooltip(true)}>What is this? Click here for instructions to get the URI.</p>
                                <input type="text" name="trackURI" className='form-control m-1' onChange={(e)=>handleChange(e)} value={formData.trackURI}/>
                                {errors.trackURI && <span className='text-danger h5 m-2'>{errors.trackURI.message}</span>}<br/>
                        </div>
                        <div style={{minHeight:'20vh'}}className='col-4 row m-3 mb-3 align-items-evenly'>
                            <label className='form-label text-white h4 p-2'>Mood Description:</label>
                            <p className='opacity-0 h6 col-6 pb-2' >What is this? Click here for instructions to get the URI.</p>
                            <input type="text" name="moodDescription"className='form-control m-1' onChange={(e)=>handleChange(e)} value={formData.moodDescription}/>
                            {errors.moodDescription && <span className='text-danger h5 m-2'>{errors.moodDescription.message}</span>}<br/>
                        
                        </div>

                        <div className='col-6 d-flex mt-1'>
                            <div className='col-12 justify-content-center'>
                                <label className='form-label text-white h4 '>Mood Color:</label>
                                {errors.hueRotateValue && <span className='text-danger h4'>{errors.hueRotateValue.message}</span>}<br/>
                                {errors.brightnessValue && <span className='text-danger h4'>{errors.brightnessValue.message}</span>}<br/>
                                {errors.saturateValue && <span className='text-danger h4'>{errors.saturateValue.message}</span>}<br/>
                                <div>
                                    <Orb size={'75%'} formData={formData} setFormData={setFormData}/>
                                </div>
                            </div>
                        </div>

                        <div className='mt-5'>
                            <button type='submit' className='btn btn-lg btn-danger'>Add Your Mood</button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default MoodForm