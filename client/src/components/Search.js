import React, {useEffect, useState, useContext} from 'react'
import { UserContext } from "../contexts/UserContext";
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
    const { loggedUser, setLoggedUser, width } = useContext(UserContext);

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

    async function searchMobile(e) {
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
        let searchByTrack = await fetch('https://api.spotify.com/v1/search?q=track:' +  formData.trackSearch + '&type=track&market=US&limit=3', searchParam)
            .then(response => response.json())
            // .then(data => console.log(data.tracks.items))
            .then(data => setSearchResults(data.tracks.items))
            .catch(err => console.log(err))
        }
        else{
        let searchByTrackArtist = await fetch('https://api.spotify.com/v1/search?q=track:' +  formData.trackSearch + '%20artist:' + formData.artistSearch + '&type=track&market=US&limit=3', searchParam)
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

    return (
        <>
        {width>600?
        // desktop
        <>
        <div className='container-fluid row justify-content-center'>
            <div className='col-10 row justify-content-center'>
                {!trackSelected?
                    <form 
                    // style={{background: 'rgba(100,100,100,0.1)'}} 
                    className="row col p-3 rounded-4 justify-content-center" onSubmit={search}>
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
                    <div className="row p-4 col rounded-4 justify-content-center" onSubmit={search}>
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
                <div style={{position:'fixed', top:'8vh', minHeight:'75vh', width: '75%', zIndex:1, background: 'rgba(0,0,0,0.95)'}} className=' rounded-4 col-12 row justify-content-center p-1' >\
                <div className='row p-2 justify-content-end position-absolute'>
                    <p className='col-1 row justify-content-center text-white h1' style={{cursor:'pointer'}} onClick={()=>setPickingTrack(false)}>x</p>
                </div>
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
        </>
        :
        // mobile
        <>
        <div className='container-fluid m-0 p-0 row align-items-center justify-content-center'>
            <div className='col-12 row justify-content-center'>
                {!trackSelected?
                    <form 
                    // style={{background: 'rgba(100,100,100,0.1)'}} 
                    className="row p-1 m-0 rounded-4 justify-content-center" onSubmit={searchMobile}>
                        <div className='col-12 p-2 row justify-content-center'>
                            <div className='col p-0'>
                                <p className='text-white h3 p-1'>What's your song?</p>
                            </div>
                            <div className="w-100"></div>
                            <div className='col p-1'>
                                <label className='form-label text-white h5 p-0'>Track Name</label>
                                <input type="text" name="trackSearch" className='form-control' onChange={(e)=>handleChange(e)} value={formData.trackSearch}/>
                            </div>
                            <div className="w-100"></div>
                            <div className='col p-1'>
                                <label className='form-label text-white h5 p-0'>Artist (Optional)</label>
                                <input type="text" name="artistSearch" className='form-control' onChange={(e)=>handleChange(e)} value={formData.artistSearch}/>
                            </div>
                        </div>
                        <div className='p-2 col'>
                            <button type='submit' className='btn btn-danger'>Search</button>
                        </div>
                    </form>
                    :
                    <div className="row p-0 col-12 rounded-4 justify-content-center" onSubmit={search}>
                            <div className='col p-1 row justify-content-center align-items-center'>
                                <iframe className='col-12' style={{borderRadius:14}} src={`https://open.spotify.com/embed/track/${formData.trackURI.replace('spotify:track:', '')}?utm_source=generator`} width="100%" height='80' frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                            </div>
                        <div className='p-1 col-12'>
                            <p className='text-info h4' onClick={()=>handleTrackChange()}>Click here to change your song.</p>
                        </div>
                    </div>
                }
            </div>
            {pickingTrack&&
            <div className='row justify-content-center'>
                <div style={{position:'fixed', top:'6vh', height:'84vh', width: '90%', zIndex:1, background: 'rgba(0,0,0,0.95)'}} className=' rounded-4 col-12 row justify-content-center p-1' >
                <div className='row p-2 pt-0 justify-content-end position-absolute'>
                    <p className='col-1 row justify-content-center text-white h1' style={{cursor:'pointer'}} onClick={()=>setPickingTrack(false)}>x</p>
                </div>
                    {searchResults.length>0?
                    <>
                    {searchResults.map((info, index)=>(
                        <div style={{background: 'rgba(200,200,200,0.15'}} className='col-11  text-white row rounded-4 justify-content-center align-items-center p-1 m-2' key={index}>
                            <div className='col-12 row justify-content-center align-items-center'>
                                <p className='text-white h6'>
                                    {info.name} by {info.artists[0].name}
                                </p>
                            </div>
                            <div className='col-12 p-1 row justify-content-center align-items-center'>
                                <iframe className='col-12' style={{borderRadius:14}} src={`https://open.spotify.com/embed/track/${info.uri.replace('spotify:track:', '')}?utm_source=generator`} width="100%" height='80' frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                            </div>
                            <div className='col-12 row align-items-center p-1 justify-content-center'>
                                <div className=''>
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
        </>

        }
        </>
    )
}

export default Search