import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const NavBar = (props) => {
  // const {username} = props
  const { loggedUser, setLoggedUser, width } = useContext(UserContext);
  const username = loggedUser.username;

  const navigate = useNavigate();

  let activeStyle = {
    color: "#DC3545",
  };
  let inActiveStyle = {
    color: "white",
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getLoggedUser", { withCredentials: true })
      .then(
        (res) => (
        //   console.log(res),
          setLoggedUser({
            id: res.data.user._id,
            username: res.data.user.username,
          })
        )
      )
      .catch((err) => console.log(err));
  }, []);


  const logout = (e) => {
    axios
      .get("http://localhost:8000/api/logout", { withCredentials: true })
      .then((res) => {
        // Session.clear()
        // console.log("Session data:", Session.items())
        // res.clearCookie('userToken')
        console.log("Logged out on front end");
        setLoggedUser("");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    {loggedUser?
    <>
    {width>600?
    // desktop
        <>
            <div
            className="container-fluid no-gutters justify-content-evenly row m-0 p-0"
            style={{ background: "rgba(100,100,100, 0.15)", minHeight: "15vh" }}
            >
            <div className="col-4 row justify-content-center align-items-center">
                {/* <p className='h4 text-white' style={{fontFamily:'fantasy'}}>Welcome to</p> */}
                <p
                className="text-white m-0 p-0 row justify-content-start"
                style={{ fontFamily: "fantasy", fontSize: 58 }}
                >
                moodRING
                </p>
                <p
                className="text-white mb-2 p-0 h2 row justify-content-start"
                style={{ fontFamily: "fantasy" }}
                >
                {username}
                </p>
            </div>
            <div className="col-4 row justify-content-end align-items-center">
                <div className="row justify-content-end">
                <NavLink
                    to="/dashboard"
                    className="h5 row justify-content-end"
                    style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                >
                    The Feed
                </NavLink>
                <NavLink
                    to={`/view/${username}`}
                    className="h5 row justify-content-end"
                    style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                >
                    Your Moods
                </NavLink>
                <NavLink
                    to="/form"
                    className="h5 row justify-content-end"
                    style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                >
                    New mood
                </NavLink>
                <NavLink
                    to="/"
                    className="h5 row justify-content-end"
                    style={inActiveStyle}
                    onClick={logout}
                >
                    Logout
                </NavLink>
                </div>
            </div>
            </div>
        </>
        :
        // mobile
        <>
            <div className="container-fluid col-12 no-gutters justify-content-evenly align-items-center row m-0 p-0" style={{ background: "rgba(100,100,100, 0.15)", minHeight: "12vh" }}>
                <div className="col-12 row justify-content-center align-items-center">
                        <p className="text-white col-6 h1" style={{ fontFamily: "fantasy" }}>moodRING</p>
                        <p className="text-white col-6 h3" style={{ fontFamily: "fantasy" }}>{username}</p>
                </div>
                <div className="col-12 row justify-content-end align-items-center">
                    <NavLink to="/dashboard" className="h6 col" style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}>
                        The Feed
                    </NavLink>
                    <NavLink to={`/view/${username}`} className="h6 col" style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}>
                        Your Moods
                    </NavLink>
                    <NavLink to="/form" className="h6 col" style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}>
                        New mood
                    </NavLink>
                    <NavLink to="/" className="h6 col" style={inActiveStyle} onClick={logout}>
                        Logout
                    </NavLink>
                </div>
            </div>
        </>
        }
        </>
        :
        <>
        {width>600?
        // desktop
            <>
                <div
                className="container-fluid no-gutters justify-content-evenly row m-0 p-0"
                style={{ background: "rgba(100,100,100, 0.15)", minHeight: "15vh" }}
                >
                <div className="col-4 row justify-content-center align-items-center">
                    {/* <p className='h4 text-white' style={{fontFamily:'fantasy'}}>Welcome to</p> */}
                    <p
                    className="text-white m-0 p-0 row justify-content-start"
                    style={{ fontFamily: "fantasy", fontSize: 58 }}
                    >
                    moodRING
                    </p>
                    <p
                    className="text-white mb-2 p-0 h2 row justify-content-start"
                    style={{ fontFamily: "fantasy" }}
                    >
                    Login for the full experience
                    </p>
                </div>
                <div className="col-4 row justify-content-end align-items-center">
                    <div className="row justify-content-end">
                    <NavLink
                        to="/dashboard"
                        className="h5 row justify-content-end"
                        style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                    >
                        The Feed
                    </NavLink>

                    {/* <NavLink
                        to={`/view/${username}`}
                        className="h5 row justify-content-end"
                        style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                    >
                        Your Moods
                    </NavLink> */}

                    {/* <NavLink
                        to="/form"
                        className="h5 row justify-content-end"
                        style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
                    >
                        New mood
                    </NavLink> */}

                    <NavLink
                        to="/"
                        className="h5 row justify-content-end"
                        style={inActiveStyle}
                        // onClick={logout}
                    >
                        Login or Register
                    </NavLink>

                    </div>
                </div>
                </div>
            </>
            :
            // mobile
            <>
                <div className="container-fluid col-12 no-gutters justify-content-evenly align-items-center row m-0 p-0" style={{ background: "rgba(100,100,100, 0.15)", minHeight: "12vh" }}>
                    <div className="col-12 row justify-content-center align-items-center">
                            <p className="text-white col-12 h1" style={{ fontFamily: "fantasy" }}>moodRING</p>
                            <p className="text-white col-12 h4" style={{ fontFamily: "fantasy" }}>Login for the full experience</p>
                    </div>
                    <div className="col-12 row justify-content-end align-items-center">
                        <NavLink to="/dashboard" className="h6 col" style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}>
                            The Feed
                        </NavLink>

                        {/* <NavLink to={`/view/${username}`} className="h6 col" style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}>
                            Your Moods
                        </NavLink> */}

                        {/* <NavLink to="/form" className="h6 col" style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}>
                            New mood
                        </NavLink> */}

                        <NavLink to="/" className="h6 col" style={inActiveStyle} onClick={logout}>
                            Login or Register
                        </NavLink>

                    </div>
                </div>
            </>
            }
            </>
        
        }
    </>
  );
};

export default NavBar;
