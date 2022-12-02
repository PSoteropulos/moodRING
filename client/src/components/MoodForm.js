import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Orb from './Orb'

const MoodForm = (props) => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({trackURI:"", moodDescription:"", hueRotateValue:0, brightnessValue:75, saturateValue:100 })
    const [errors, setErrors] = useState({})


    const handleChange= (e) => {
        let key=e.target.name;
        let value=e.target.value;
        setFormData({...formData, [key]:value})
    }

    const handleSubmit = (e) => {
        
        e.preventDefault()

        let modifiedTrackURI = formData.trackURI.replace('spotify:track:', '')
        console.log(modifiedTrackURI)
        
        axios.post('http://localhost:8000/api/addMood', {
            trackURI: modifiedTrackURI,
            moodDescription: formData.moodDescription,
            hueRotateValue: formData.hueRotateValue,
            brightnessValue: formData.brightnessValue,
            saturateValue: formData.saturateValue
        })
        .then((res)=>{
            console.log(res)
            navigate('/dashboard')
        }).catch((err)=>{
            console.log(err)
            setErrors(err.response.data.errors)})
    }

    return (
        <div className='fluid bg-secondary p-4' style={{minHeight:'85vh'}}>
            <h1 className='m-2'>Enter Mood</h1>
                <div>
                <form className='row justify-content-center ' onSubmit={handleSubmit}>

                    <div className='col-3 m-4'>

                        <label className='form-label'>Track URI:</label>
                        <input type="text" name="trackURI" className='form-control' onChange={(e)=>handleChange(e)} value={formData.trackURI}/>
                        {errors.trackURI && <span className='text-warning'>{errors.trackURI.message}</span>}<br/>


                        <label className='form-label'>Mood Description:</label>
                        <input type="text" name="moodDescription"className='form-control' onChange={(e)=>handleChange(e)} value={formData.moodDescription}/>
                        {errors.moodDescription && <span className='text-warning'>{errors.moodDescription.message}</span>}<br/>

                        <label className='form-label'>Mood Color:</label>
                        {errors.hueRotateValue && <span className='text-warning'>{errors.hueRotateValue.message}</span>}<br/>
                        {errors.brightnessValue && <span className='text-warning'>{errors.brightnessValue.message}</span>}<br/>
                        {errors.saturateValue && <span className='text-warning'>{errors.saturateValue.message}</span>}<br/>
                        <div>
                            <Orb formData={formData} setFormData={setFormData}/>
                        </div>

                        <div className='mt-4'>
                            <button type='submit' className='btn btn-primary'>Add Your Mood</button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default MoodForm