import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'

const Search = (props) => {

    const [formData, setFormData] = useState({trackname:"", artist:""})
    const [accessToken, setAccessToken] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const clientID = '282e65ee03554ba9b977f9d741298af3'
    const clientSecret = '91a708eb6e82401993f204afe96449d1'

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
        console.log('Track: ' + formData.trackname + '; artist: ' + formData.artist)

        const searchParam = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }

        if (formData.artist==''){
        let searchByTrack = await fetch('https://api.spotify.com/v1/search?q=track:' +  formData.trackname + '&type=track&market=US&limit=10', searchParam)
            .then(response => response.json())
            .then(data => console.log(data.tracks.items))
            .then(trackArray => setSearchResults(trackArray))
            .catch(err => console.log(err))
        }else{
        let searchByTrackArtist = await fetch('https://api.spotify.com/v1/search?q=track:' +  formData.trackname + '%20artist:' + formData.artist + '&type=track&market=US&limit=10', searchParam)
            .then(response => response.json())
            .then(data => console.log(data.tracks.items))
            .then(trackArray => setSearchResults(trackArray))
            .catch(err => console.log(err))}

    }

    const handleChange= (e) => {
        let key=e.target.name;
        let value=e.target.value;
        setFormData({...formData, [key]:value})
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
        <div>
            <div>
                <form style={{background: 'rgba(100,100,100,0.2)'}} className="col-10 p-3 rounded-4" onSubmit={search}>
                    <label className='form-label text-white h4 p-2'>Track Name</label>
                    <input type="text" name="trackname" className='form-control m-1' onChange={(e)=>handleChange(e)} value={formData.trackname}/>
                    <label className='form-label text-white h4 p-2'>Artist</label>
                    <input type="text" name="artist" className='form-control m-1' onChange={(e)=>handleChange(e)} value={formData.artist}/>
                    <button type='submit' className='btn btn-lg btn-danger'>Search</button>
                </form>
            </div>
            {/* {searchResults&&
            <div> */}
                {/* {searchResults.map((info, index)=>(
                    <div key={index}>
                        <p>{info.name}</p>
                    </div>
                ))} */}
            {/* </div>
            } */}

        </div>
    )
}

export default Search