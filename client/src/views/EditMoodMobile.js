import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import styles from "../components/Background.module.css";
import Orb from "../components/Orb";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import NotFound from "../components/NotFound";
import uriTip from "../assets/uri_img.png";

const EditMood = (props) => {
  const { id } = useParams();
  // const {loggedUser} = props

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    trackURI: "",
    moodDescription: "",
    hueRotateValue: 0,
    brightnessValue: 75,
    saturateValue: 100,
  });
  const [errors, setErrors] = useState({});
  // const [displayTooltip, setDisplayTooltip] = useState(false)

  const [notFoundError, setNotFoundError] = useState("");
  // const [loggedUser, setLoggedUser] = useState("")
  const { loggedUser, setLoggedUser, width } = useContext(UserContext);
  // const username = loggedUser.username;

  // const backGroundBoxStyle = {background: '#b5b5b5', filter:`grayscale(100%)sepia(50%)hue-rotate(${mood.hueRotateValue}deg)brightness(${mood.brightnessValue/2+50}%)saturate(${mood.saturateValue/5}%)`}

  useEffect(() => {
    // axios.get('http://localhost:8000/api/getLoggedUser', {withCredentials:true})
    // .then((res)=>(
    //     console.log(res),
    //     setLoggedUser({id:res.data.user._id, username:res.data.user.username})
    // )).catch((err)=>(
    //     console.log(err)
    // ))
    axios
      .get(`http://localhost:8000/api/mood/${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setFormData(res.data);
      })
      .catch((err) => {
        console.log(err);
        setNotFoundError("A mood with that ID does not exist.");
      });
  }, []);

  const handleChange = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setFormData({ ...formData, [key]: value });
  };

  const modifiedTrackURI = formData.trackURI.replace("spotify:track:", "");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        `http://localhost:8000/api/update/${id}`,
        {
          moodDescription: formData.moodDescription,
          hueRotateValue: formData.hueRotateValue,
          brightnessValue: formData.brightnessValue,
          saturateValue: formData.saturateValue,
          postedBy: loggedUser.username,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <>
      {!loggedUser ? (
        <NotFound />
      ) : (
        <div className="container-fluid no-gutters m-0 p-0">
          <NavBar />
          {notFoundError ? (
            <p className="m-3 h2 text-white">
              The entry you are looking for does not exist.
            </p>
          ) : (
            <>
              {/* <p className='m-3 h2 text-white'>Edit a Mood</p> */}
              <div className="col-12 row justify-content-center align-items-center m-0 mb-5 p-1">
                <form
                  style={{ background: "rgba(100,100,100,0.1)" }}
                  className="col-11 row justify-content-center m-1 rounded-4"
                  onSubmit={handleSubmit}
                >
                  <div className="col row m-1 justify-content-center align-items-center">
                    <div className="col-12 pt-2">
                      <iframe
                        style={{ borderRadius: 14 }}
                        src={`https://open.spotify.com/embed/track/${modifiedTrackURI}?utm_source=generator`}
                        width="100%"
                        height="80"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                      ></iframe>
                    </div>
                    <div
                      style={{ minHeight: "20vh" }}
                      className="col-12 row m-1 align-items-evenly"
                    >
                      <label className="form-label text-white h4 p-1">
                        How does this track make you feel?
                      </label>
                      <input
                        type="text"
                        name="moodDescription"
                        className="form-control m-1"
                        onChange={(e) => handleChange(e)}
                        value={formData.moodDescription}
                      />
                      {errors.moodDescription && (
                        <span className="text-danger h5">
                          {errors.moodDescription.message}
                        </span>
                      )}
                      <br />
                    </div>
                    <div className="col-12 row rounded-4 justify-content-center align-items-center p-1 mt-2">
                      <div className="col-12 justify-content-center">
                        <label className="form-label text-white h4">
                          What color do you associate with this emotion or
                          track?
                        </label>
                        <br />
                        <div>
                          <Orb
                            size={"100%"}
                            formData={formData}
                            setFormData={setFormData}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-2">
                      <button type="submit" className="btn btn-lg btn-danger">
                        Edit This Mood
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </>
          )}
          <Footer />
        </div>
      )}
    </>
  );
};

export default EditMood;
