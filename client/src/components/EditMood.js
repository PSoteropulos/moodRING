import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom'
import Orb from './Orb'
import styles from './Background.module.css'
import NavBar from './NavBar'
import Footer from './Footer'
import uriTip from '../assets/uri_img.png'

const EditMood = (props) => {

    const {id} = useParams()

    const navigate = useNavigate()

    const [formData, setFormData] = useState({trackURI:"", moodDescription:"", hueRotateValue:0, brightnessValue:75, saturateValue:100 })
    const [errors, setErrors] = useState({})
    // const [displayTooltip, setDisplayTooltip] = useState(false)

    const [notFoundError, setNotFoundError] = useState("")
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
            axios.get(`http://localhost:8000/api/mood/${id}`, {withCredentials:true})
            .then((res)=>{
                console.log(res)
                setFormData(res.data)
            }).catch((err)=>{
                console.log(err)
                setNotFoundError("A mood with that ID does not exist.")
            })
    }, [])

    const handleChange= (e) => {
        let key=e.target.name;
        let value=e.target.value;
        setFormData({...formData, [key]:value})
    }

    const modifiedTrackURI = formData.trackURI.replace('spotify:track:', '')

    const handleSubmit = (e) => {
        
        e.preventDefault()

        axios.put(`http://localhost:8000/api/update/${id}` ,{
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
        <div className='container-fluid no-gutters'>
            <NavBar username={loggedUser.username}/>
            {notFoundError?
            <p className='m-3 h2 text-white'>The entry you are looking for does not exist.</p>
            :
            <>
                {/* <p className='m-3 h2 text-white'>Edit a Mood</p> */}
                <div className='col-12 row justify-content-center align-items-center p-4'>
                    <form style={{background: 'rgba(100,100,100,0.2)'}} className="col-10 p-3 rounded-4" onSubmit={handleSubmit}>
                        <div className='col row m-1 justify-content-center align-items-center'>
                            <div className='col-5 p-0'>
                                <iframe style={{borderRadius:14}} src={`https://open.spotify.com/embed/track/${modifiedTrackURI}?utm_source=generator`} width="100%" height='152' frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                            </div>
                            {/* <div style={{minHeight:'20vh'}} className='col-4 m-3 mb-3 justify-content-center row align-items-evenly'>
                                    <label className='form-label text-white h4 p-2'>Track URI:</label>
                                    <input type="text" name="trackURI" className='form-control m-1' onChange={(e)=>handleChange(e)} value={formData.trackURI}/>
                                    {errors.trackURI && <span className='text-danger h5 m-1'>{errors.trackURI.message}</span>}<br/>
                                    <p className='text-secondary h5 col-9 mt-4' onMouseOver={()=>setDisplayTooltip(true)} >Where do I get this?</p>
                            </div> */}
                            {/* <div style={{minHeight:'20vh'}}className='col-4 row m-3 mb-3 align-items-evenly'>
                                <label className='form-label text-white h4 p-2'>Mood Description:</label>
                                <input type="text" name="moodDescription"className='form-control m-1' onChange={(e)=>handleChange(e)} value={formData.moodDescription}/>
                                {errors.moodDescription && <span className='text-danger h5 m-1'>{errors.moodDescription.message}</span>}<br/>
                                <p className='opacity-0 h5 mt-4' >_</p>                            
                            </div> */}
                            <div style={{minHeight:'20vh'}}className='col-5 row m-3 mb-3 align-items-evenly'>
                                <label className='form-label text-white h4 p-2'>How does this track make you feel?</label>
                                <p className='opacity-0 h6 col-6 pb-2' >What is this? Click here for instructions to get the URI.</p>
                                <input type="text" name="moodDescription"className='form-control m-1' onChange={(e)=>handleChange(e)} value={formData.moodDescription}/>
                                {errors.moodDescription && <span className='text-danger h5 m-2'>{errors.moodDescription.message}</span>}<br/>
                            </div>

                            {/* <div className='col-6 mb-4'>
                                <label className='form-label text-white h4 pt-2'>Mood Color:</label>
                                {errors.hueRotateValue && <span className='text-danger h4'>{errors.hueRotateValue.message}</span>}<br/>
                                {errors.brightnessValue && <span className='text-danger h4'>{errors.brightnessValue.message}</span>}<br/>
                                {errors.saturateValue && <span className='text-danger h4'>{errors.saturateValue.message}</span>}<br/>
                                <div>
                                    <Orb formData={formData} setFormData={setFormData}/>
                                </div>
                            </div>

                            <div className='mt-5'>
                                <button type='submit' className='btn btn-lg btn-danger'>Edit Mood</button>
                            </div> */}

                        <div className='col-6 d-flex mt-4'>
                            <div className='col-12 justify-content-center'>
                                <label className='form-label text-white h4'>What color do you associate with this emotion or track?</label>
                                {errors.hueRotateValue && <span className='text-danger h4'>{errors.hueRotateValue.message}</span>}<br/>
                                {errors.brightnessValue && <span className='text-danger h4'>{errors.brightnessValue.message}</span>}<br/>
                                {errors.saturateValue && <span className='text-danger h4'>{errors.saturateValue.message}</span>}<br/>
                                <div>
                                    <Orb size={'75%'} formData={formData} setFormData={setFormData}/>
                                </div>
                            </div>
                        </div>

                        <div className='mt-4'>
                            <button type='submit' className='btn btn-lg btn-danger'>Edit This Mood</button>
                        </div>

                        </div>
                    </form>
                </div>
            </>
            }
            <Footer/>
        </div>
    )
}

export default EditMood