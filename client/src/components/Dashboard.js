import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Orb from './Orb'

const Dashboard = (props) => {

    const [list,setList]=useState([])

    // const backGroundBoxStyle = {background: '#b5b5b5', filter:`grayscale(100%)sepia(50%)hue-rotate(${mood.hueRotateValue}deg)brightness(${mood.brightnessValue/2+50}%)saturate(${mood.saturateValue/5}%)`}

    useEffect(()=>{
        axios.get('http://localhost:8000/api/allMoods', {withCredentials:true})
            .then((res)=>{
                console.log(res)
                // console.log("User id is", userID)
                // console.log("Session data:", Session.items())
                setList(res.data)
            }).catch((err)=>{
                console.log(err)
            })
            // axios.get('http://localhost:8000/api/getLoggedUser', {withCredentials:true})
            // .then((res)=>(
            //   // console.log(loaded),
            //     console.log(res),
            //     setLoggedUser({id:res.data.user._id, username:res.data.username})
            //     // setLoaded(true)
            //   // console.log(loaded)
            // )).catch((err)=>(
            //   // console.log(loaded),
            //     console.log(err)
            //     // setLoaded(true)
            //   // console.log(loaded)
            // ))
    }, [])

    return (
        <div>
            <h1>Moods</h1>
            {/* <div className='d-flex flex-wrap'> */}
            <div className='col row align-items-center justify-content-center p-2'>
                {list.map((mood, index)=>(
                    <div key={index} className="col-10 row m-3 rounded-4 bg-secondary align-items-center justify-content-center">
                        <div className='col-3 p-0'>
                            <iframe style={{borderRadius:14}} src={`https://open.spotify.com/embed/track/${mood.trackURI}?utm_source=generator`} width="100%" height='152' frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                        </div>
                        <div className='col-3'>
                            <h4>{mood.moodDescription}</h4>
                        </div>
                        <div className='col-3' >
                            <Orb formData={mood}/>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default Dashboard