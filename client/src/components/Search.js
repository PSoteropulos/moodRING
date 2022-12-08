import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'

const Search = (props) => {

    // const [formData, setFormData] = useState({trackSearch:"", artistSearch:"", trackURI:""})
    const {formData, setFormData} = props
    const [accessToken, setAccessToken] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [trackSelected, setTrackSelected] = useState(false)
    const {pickingTrack, setPickingTrack} = props
    // const [pickingTrack, setPickingTrack] = useState(false)

    const clientID = process.env.REACT_APP_CLIENT_ID
    const clientSecret = process.env.REACT_APP_CLIENT_SECRET

    useEffect(()=>{
        const authParam = {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + clientID + '&client_secret=' + clientSecret
        }
        fetch('https://accounts.spotify.com/api/token', authParam)
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token))
            .catch(err => console.log(err))
    },[])

    async function search(e) {
        e.preventDefault()
        console.log('Track: ' + formData.trackSearch + '; artist: ' + formData.artistSearch)

        const searchParam = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }

        if (formData.artistSearch==''){
        let searchByTrack = await fetch('https://api.spotify.com/v1/search?q=track:' +  formData.trackSearch + '&type=track&market=US&limit=6', searchParam)
            .then(response => response.json())
            // .then(data => console.log(data.tracks.items))
            .then(data => setSearchResults(data.tracks.items))
            .catch(err => console.log(err))
        }
        else{
        let searchByTrackArtist = await fetch('https://api.spotify.com/v1/search?q=track:' +  formData.trackSearch + '%20artist:' + formData.artistSearch + '&type=track&market=US&limit=6', searchParam)
            .then(response => response.json())
            // .then(data => console.log(data.tracks.items))
            .then(data => setSearchResults(data.tracks.items))
            .catch(err => console.log(err))
        }
        setPickingTrack(true)
    }

    const handleChange= (e) => {
        let key=e.target.name;
        let value=e.target.value;
        setFormData({...formData, [key]:value})
    }

    const handleTrackSelect = (uri) => {
        setFormData({...formData, trackURI:uri})
        setPickingTrack(false)
        setTrackSelected(true)
    }

    const handleTrackChange = () => {
        setPickingTrack(true)
        setTrackSelected(false)
        setFormData({...formData, trackURI:''})
    }

    const handleSubmit = (e) => {
        
        e.preventDefault()

        // let modifiedTrackURI = formData.trackURI.replace('spotify:track:', '')
        // console.log(modifiedTrackURI)
        
        // axios.post('http://localhost:8000/api/addMood' ,{
        //     trackURI: modifiedTrackURI,
        //     moodDescription: formData.moodDescription,
        //     hueRotateValue: formData.hueRotateValue,
        //     brightnessValue: formData.brightnessValue,
        //     saturateValue: formData.saturateValue,
        //     postedBy: loggedUser.username

        // },{withCredentials:true})
        // .then((res)=>{
        //     console.log(res)
        //     navigate('/dashboard')
        // }).catch((err)=>{
        //     console.log(err)
        //     setErrors(err.response.data.errors)})
    }

    return (
        <div className='container-fluid row justify-content-center' onClick={()=>setPickingTrack(false)}>
            <div className='col-10 row justify-content-center'>
                {!trackSelected?
                    <form style={{background: 'rgba(100,100,100,0.1)'}} className="row col p-3 rounded-4 justify-content-center" onSubmit={search}>
                        <div className='col-6 p-2 row justify-content-center'>
                            <div className='col p-2'>
                                <p className='text-white h3 p-2'>What's your song?</p>
                            </div>
                            <div className="w-100"></div>
                            <div className='col p-2'>
                                <label className='form-label text-white h5 p-2'>Track Name</label>
                                <input type="text" name="trackSearch" className='form-control' onChange={(e)=>handleChange(e)} value={formData.trackSearch}/>
                            </div>
                            <div className="w-100"></div>
                            <div className='col p-2'>
                                <label className='form-label text-white h5 p-2'>Artist (Optional)</label>
                                <input type="text" name="artistSearch" className='form-control' onChange={(e)=>handleChange(e)} value={formData.artistSearch}/>
                            </div>
                        </div>
                        <div className='pt-4 col-12'>
                            <button type='submit' className='btn btn-lg btn-danger'>Search</button>
                        </div>
                    </form>
                    :
                    <div style={{background: 'rgba(100,100,100,0.1)'}} className="row p-4 col rounded-4 justify-content-center" onSubmit={search}>
                            <div className='col p-3 row justify-content-center align-items-center'>
                                <iframe className='col-10' style={{borderRadius:14}} src={`https://open.spotify.com/embed/track/${formData.trackURI.replace('spotify:track:', '')}?utm_source=generator`} width="100%" height='232' frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                            </div>
                        <div className='pt-5 col-12'>
                            <p className='text-info h4' onClick={()=>handleTrackChange()}>Click here to change your song.</p>
                        </div>
                    </div>
                }
            </div>
            {pickingTrack&&
            <div className='row justify-content-center'>
                <div style={{position:'fixed', top:'8vh', minHeight:'75vh', width: '75%', zIndex:1, background: 'rgba(0,0,0,0.95)'}} className=' rounded-4 col-12 row justify-content-center p-1' >
                    {searchResults.length>0?
                    <>
                    {searchResults.map((info, index)=>(
                        <div style={{background: 'rgba(100,100,100,0.1)'}} className='col-8 text-white row rounded-4 m-2' key={index}>
                            <div className='col p-3 row justify-content-center align-items-center'>
                                <iframe className='col-10' style={{borderRadius:14}} src={`https://open.spotify.com/embed/track/${info.uri.replace('spotify:track:', '')}?utm_source=generator`} width="100%" height='80' frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                            </div>
                            <div className='col row align-items-center p-3 justify-content-center'>
                                <div className='col'>
                                    <p className='text-white h6'>
                                        {/* <img style={{width: 100}} src={info.album.images[0].url} alt={`${info.album.name} cover art`} /> */} {info.name} by {info.artists[0].name}
                                    </p>
                                    <button className='btn btn-danger' onClick={()=>handleTrackSelect(info.uri)}>Select this track</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    </>
                    :
                    <div className='row align-items-center justify-content-center'>
                        <p className='col-6 text-danger h2'>No tracks found. Please refine your search.</p>
                    </div>
                    }
                </div>
            </div>
            }


        </div>
    )
}

export default Search