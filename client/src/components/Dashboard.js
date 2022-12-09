import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Orb from './Orb'
import styles from './Background.module.css'
import NavBar from './NavBar'
import Footer from './Footer'
import {format} from 'date-fns'
import NotFound from './NotFound'

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
        <>
        {!loggedUser?
        <NotFound />
        :
        <div className='container-fluid no-gutters m-0 p-0'>
        {/* // <div className={styles.animatedGradient}> */}
            <NavBar username={loggedUser.username}/>
            {/* <p className='text-white h2 m-3'>Moods</p> */}
            {/* <div className='d-flex flex-wrap'> */}
            <div className='col row align-items-center justify-content-center p-3'>
            <p className='h2 text-white'>The Feed</p>
                {list.map((mood, index)=>(
                    // <div key={index} className="col-10 row m-3 rounded-4 bg-secondary align-items-center justify-content-center">
                    <div key={index} style={{background: 'rgba(100,100,100,0.1)', minHeight:'30vh'}} className="col-10 row m-3 rounded-4 align-items-center justify-content-center backdrop-blur-md">
                        <div className='row justify-content-around align-items-center p-4'>
                            <div className='col-4'>
                                <iframe style={{borderRadius:14}} src={`https://open.spotify.com/embed/track/${mood.trackURI}?utm_source=generator`} width="100%" height='152' frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                            </div>
                            <div className='col-4 text-white' >
                                <div className='h2 pb-1'>
                                    <p>{mood.moodDescription}</p>
                                </div>
                                <div className=''>
                                    {mood.postedBy==loggedUser.username?
                                    <Link className='h5' style={{textDecoration:"none"}} to={`/view/${mood.postedBy}`}>You</Link>
                                    :
                                    <Link className='h5' style={{textDecoration:"none"}} to={`/view/${mood.postedBy}`}>{mood.postedBy}</Link>
                                    // <p className='h5'>{mood.postedBy}</p>
                                    }
                                    <p className=''>{format(dateConvert(mood.createdAt),'MMM d yyyy h:mmaaa')}</p>
                                </div>
                                {loggedUser.username==mood.postedBy?
                                <div className='h6 pt-1'>
                                    <button style={{background: 'rgba(100,100,100,0.3)'}} className='btn btn-sm m-1'><Link style={{textDecoration:"none", color:'white'}} to={`/edit/${mood._id}`}>Edit Mood</Link></button>
                                    <button onClick={(e)=>deleteHandle(mood._id)} style={{textDecoration:"none", color:'white', background: 'rgba(100,100,100,0.3)'}} className='btn btn-sm m-1'>Delete Mood</button>
                                </div>
                                :null
                                }
                            </div>
                            <div className='col-4 d-flex  justify-content-start'>
                                <div className='col-11'>
                                    <Orb size={'120%'} formData={mood}/>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
            <Footer/>
        </div>
        }
        </>
    )
}

export default Dashboard