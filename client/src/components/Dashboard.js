import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Orb from './Orb'
import styles from './Background.module.css'
import NavBar from './NavBar'
import {format} from 'date-fns'

const Dashboard = (props) => {
    const {id} = useParams

    const [list,setList]=useState([])
    const [loggedUser, setLoggedUser] = useState("")

    const navigate = useNavigate()
    // const backGroundBoxStyle = {background: '#b5b5b5', filter:`grayscale(100%)sepia(50%)hue-rotate(${mood.hueRotateValue}deg)brightness(${mood.brightnessValue/2+50}%)saturate(${mood.saturateValue/5}%)`}

    useEffect(()=>{
        axios.get('http://localhost:8000/api/allMoods', {withCredentials:true})
            .then((res)=>{
                console.log(res)
                setList(res.data)
            }).catch((err)=>{
                console.log(err)
            })
            axios.get('http://localhost:8000/api/getLoggedUser', {withCredentials:true})
            .then((res)=>(
                console.log(res),
                setLoggedUser({id:res.data.user._id, username:res.data.user.username})
            )).catch((err)=>(
                console.log(err)
            ))
    }, [])

    const dateConvert = (x) => {
        let date = new Date(x)
        // let formattedDate = date.getTparseInt(date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()
        return date
    }

    const deleteHandle = (id) => {
        axios.delete(`http://localhost:8000/api/delete/${id}`, {withCredentials:true})
            .then((res)=>{
                console.log(res)
                setList(list.filter(mood => mood._id !== id))
            }).catch((err)=>{
                console.log(err)
            })
    }


    return (
        <div>
        {/* // <div className={styles.animatedGradient}> */}
            <NavBar  username={loggedUser.username}/>
            <p className='text-white h2 m-3'>Moods</p>
            {/* <div className='d-flex flex-wrap'> */}
            <div className='col row align-items-center justify-content-center'>
                {list.map((mood, index)=>(
                    // <div key={index} className="col-10 row m-3 rounded-4 bg-secondary align-items-center justify-content-center">
                    <div key={index} style={{background: 'rgba(100,100,100,0.2)'}} className="col-8 m-3 rounded-4 align-items-center justify-content-evenly backdrop-blur-md">
                        <div className='row justify-content-evenly align-items-center p-4'>
                            <div className='col-3 p-0'>
                                <iframe style={{borderRadius:14}} src={`https://open.spotify.com/embed/track/${mood.trackURI}?utm_source=generator`} width="100%" height='152' frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                            </div>
                            <div className='col-3 text-white' >
                                <div className='h2 pb-1'>
                                    <p>{mood.moodDescription}</p>
                                </div>
                                <div className=''>
                                    {mood.postedBy==loggedUser.username?
                                    <p className='h5'>You</p>
                                    :<p className='h5'>{mood.postedBy}</p>
                                    }
                                    <p className=''>{format(dateConvert(mood.createdAt),'MMM d yyyy h:mmaaa')}</p>
                                </div>
                                {loggedUser.username==mood.postedBy?
                                <div className='h6 pt-1'>
                                    <button  className='btn m-2'><Link style={{textDecoration:"none", color:'white'}} to={`/edit/${mood._id}`}>Edit Mood</Link></button>
                                    <button onClick={(e)=>deleteHandle(mood._id)} className='btn text-danger m-2'>Delete Mood</button>
                                </div>
                                :null
                                }
                            </div>
                            <div className='col-3' >
                                <Orb formData={mood}/>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default Dashboard