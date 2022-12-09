import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios'
import {BrowserRouter, Routes, Route, Navigate, Form} from 'react-router-dom'
import styles from './components/Background.module.css'
import Landing from './components/Landing';
import MoodForm from './components/MoodForm';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import EditMood from './components/EditMood';
import Search from './components/Search';
import ViewUser from './components/ViewUser';
import NotFound from './components/NotFound';
import NotFoundLogged from './components/NotFoundLogged';

function App() {

  const [loggedUser, setLoggedUser] = useState("")

  useEffect(()=>{
        axios.get('http://localhost:8000/api/getLoggedUser', {withCredentials:true})
        .then((res)=>(
            console.log(res),
            setLoggedUser({id:res.data.user._id, username:res.data.user.username})
        )).catch((err)=>(
            console.log(err)
        ))
}, [])

  return (
    <div className={`App ${styles.animatedGradient}`}>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Landing loggedUser={loggedUser}/>} />
          <Route path='/form' element={<MoodForm loggedUser={loggedUser}/>}/>
          <Route path='/dashboard' element={<Dashboard loggedUser={loggedUser}/>}/>
          {/* <Route path="/onemood/:id" element={<OneMood />} /> */}
          <Route path="/edit/:id" element={<EditMood loggedUser={loggedUser}/>} />
          <Route path="/view/:username" element={<ViewUser loggedUser={loggedUser}/>} />
          {/* <Route path='/login' element={<Login/>} /> */}
          {/* <Route path='/register' element={<Register/>} /> */}
          <Route path='*' element={<NotFound loggedUser={loggedUser}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
