import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate, Form } from "react-router-dom";
import styles from "./components/Background.module.css";
import Landing from "./views/Landing";
import MoodForm from "./views/MoodForm";
import Dashboard from "./views/Dashboard";
import ViewUser from "./views/ViewUser";
import EditMood from "./views/EditMood";
import LandingMobile from "./views/LandingMobile";
import MoodFormMobile from "./views/MoodFormMobile";
import DashboardMobile from "./views/DashboardMobile";
import ViewUserMobile from "./views/ViewUserMobile";
import EditMoodMobile from "./views/EditMoodMobile";
import Login from "./components/Login";
import Register from "./components/Register";
import Search from "./components/Search";
import NotFound from "./components/NotFound";
import NotFoundLogged from "./components/NotFoundLogged";
import { UserContext } from "./contexts/UserContext";

function App() {
  const [loggedUser, setLoggedUser] = useState("");
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    axios
      .get("http://localhost:8000/api/getLoggedUser", { withCredentials: true })
      .then(
        (res) => (
          console.log(res),
          setLoggedUser({
            id: res.data.user._id,
            username: res.data.user.username,
          })
        )
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={`App ${styles.animatedGradient}`}>
      <UserContext.Provider value={{ loggedUser, setLoggedUser, width, setWidth }}>
        <BrowserRouter>
          <Routes>
            {width>600 ?
            <>
            <Route exact path="/" element={<Landing />} />
            <Route path="/form" element={<MoodForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/onemood/:id" element={<OneMood />} /> */}
            <Route path="/edit/:id" element={<EditMood />} />
            <Route path="/view/:username" element={<ViewUser />} />
            {/* <Route path='/login' element={<Login/>} /> */}
            {/* <Route path='/register' element={<Register/>} /> */}
            <Route path="*" element={<NotFound />} />
            </>
            :
            <>
            <Route exact path="/" element={<LandingMobile />} />
            <Route path="/form" element={<MoodFormMobile />} />
            <Route path="/dashboard" element={<DashboardMobile />} />
            {/* <Route path="/onemood/:id" element={<OneMood />} /> */}
            <Route path="/edit/:id" element={<EditMoodMobile />} />
            <Route path="/view/:username" element={<ViewUserMobile />} />
            {/* <Route path='/login' element={<Login/>} /> */}
            {/* <Route path='/register' element={<Register/>} /> */}
            <Route path="*" element={<NotFound />} />
            </>
}

          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
