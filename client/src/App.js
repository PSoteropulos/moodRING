import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Landing from './components/Landing';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
