import './App.css';
import {BrowserRouter, Routes, Route, Navigate, Form} from 'react-router-dom'
import Landing from './components/Landing';
import MoodForm from './components/MoodForm';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Landing/>} />
          <Route path='/form' element={<MoodForm/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          {/* <Route path="/onemood/:id" element={<OneMood />} /> */}
          {/* <Route path="/edit/:id" element={<EditMood />} /> */}
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
