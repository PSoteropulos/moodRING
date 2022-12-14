import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "../components/Background.module.css";
import Orb from "../components/Orb";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import NotFound from "../components/NotFound";
import { format } from "date-fns";

const ViewUser = (props) => {
  const { username } = useParams();
  // const {loggedUser} = props

  const [list, setList] = useState([]);
  // const [loggedUser, setLoggedUser] = useState("")
  const [notFoundError, setNotFoundError] = useState("");
  const { loggedUser, setLoggedUser, width } = useContext(UserContext);
  // const username = loggedUser.username

  const navigate = useNavigate();
  // const backGroundBoxStyle = {background: '#b5b5b5', filter:`grayscale(100%)sepia(50%)hue-rotate(${mood.hueRotateValue}deg)brightness(${mood.brightnessValue/2+50}%)saturate(${mood.saturateValue/5}%)`}

  useEffect(() => {
    // axios.get('http://localhost:8000/api/getLoggedUser', {withCredentials:true})
    //     .then((res)=>(
    //         console.log(res),
    //         setLoggedUser({id:res.data.user._id, username:res.data.user.username})
    //     )).catch((err)=>(
    //         console.log(err)
    //     ))
    axios
      .get(`http://localhost:8000/api/view/${username}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
        setNotFoundError("A user with that name does not exist.");
      });
  }, [username]);

  const dateConvert = (x) => {
    let date = new Date(x);
    // let formattedDate = date.getTparseInt(date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()
    return date;
  };

  const deleteHandle = (id) => {
    axios
      .delete(`http://localhost:8000/api/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setList(list.filter((mood) => mood._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {loggedUser ? (
        <div className="container-fluid no-gutters m-0 p-0">
          <NavBar />
          {!list[0] ? (
            <div className="row justify-content-center m-5">
              <p className="m-5 col-6 h2 text-white">
                A user with that name does not exist, or they have not posted
                anything yet.
              </p>
            </div>
          ) : (
            <div className="col row align-items-center justify-content-center p-3">
              {loggedUser.username == username ? (
                <p className="h2 text-white">Your moods</p>
              ) : (
                <>
                  <p className="h5 text-white">All moods posted by</p>
                  <p className="h2 text-white">{username}</p>
                </>
              )}
              {list.map((mood, index) => (
                // <div key={index} className="col-10 row m-3 rounded-4 bg-secondary align-items-center justify-content-center">
                <div
                  key={index}
                  style={{ background: "rgba(100,100,100,0.1)" }}
                  className="col-10 m-3 rounded-4 align-items-center justify-content-center backdrop-blur-md"
                >
                  <div className="row justify-content-around align-items-center p-4">
                    <div className="col-4">
                      <iframe
                        style={{ borderRadius: 14 }}
                        src={`https://open.spotify.com/embed/track/${mood.trackURI}?utm_source=generator`}
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                      ></iframe>
                    </div>
                    <div className="col-4 text-white">
                      <div className="h2 pb-1">
                        <p>{mood.moodDescription}</p>
                      </div>
                      <div className="">
                        {
                          mood.postedBy == loggedUser.username ? (
                            <Link
                              className="h5"
                              style={{ textDecoration: "none" }}
                              to={`/view/${mood.postedBy}`}
                            >
                              You
                            </Link>
                          ) : (
                            <Link
                              className="h5"
                              style={{ textDecoration: "none" }}
                              to={`/view/${mood.postedBy}`}
                            >
                              {mood.postedBy}
                            </Link>
                          )
                          // <p className='h5'>{mood.postedBy}</p>
                        }
                        <p className="">
                          {format(
                            dateConvert(mood.createdAt),
                            "MMM d yyyy h:mmaaa"
                          )}
                        </p>
                      </div>
                      {loggedUser.username == mood.postedBy ? (
                        <div className="h6 pt-1">
                          <button
                            style={{ background: "rgba(100,100,100,0.3)" }}
                            className="btn btn-sm m-1"
                          >
                            <Link
                              style={{ textDecoration: "none", color: "white" }}
                              to={`/edit/${mood._id}`}
                            >
                              Edit Mood
                            </Link>
                          </button>
                          <button
                            onClick={(e) => deleteHandle(mood._id)}
                            style={{
                              textDecoration: "none",
                              color: "white",
                              background: "rgba(100,100,100,0.3)",
                            }}
                            className="btn btn-sm m-1"
                          >
                            Delete Mood
                          </button>
                        </div>
                      ) : null}
                    </div>
                    <div className="col-4 d-flex  justify-content-start">
                      <div className="col-11">
                        <Orb size={"120%"} formData={mood} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Footer />
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default ViewUser;
