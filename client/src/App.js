import './App.css';
import {BrowserRouter, Routes, Route, Navigate, Form} from 'react-router-dom'
import Landing from './components/Landing';
import MoodForm from './components/MoodForm';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Landing/>} />
          <Route path='/form' element={<MoodForm/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
