import "./home.css"

import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { auth } from "../../firebase-config";
import Signin from "../signup&in/Signin";


const Home = () => {


  let [data, setData] = useState(null)
  let [currentData, setCurrentData] = useState(5);
  let [display, setDisplay] = useState(false)




  useEffect(() => {
    if (localStorage.getItem("favourites") == null) {
      localStorage.setItem("favourites", "[]")
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(uid);
        if (user.email != null) {
          setDisplay(true)
        }
        // ...
      } else {

        alert("Please signin")
      }
    });


    setTimeout(() => {
      fetch("https://api.github.com/users")
        .then((response) => {
          return response.json()
        })
        .then((result) => {
          // console.log(result.forEach((d)=>{console.log(d);}));
          let currentdata = result.slice(0, 5);
          setData(result);
          setCurrentData(currentdata);
        })
        .catch((err) => {
          alert(err.message)
        })

    }, 1000);
  }, [])
  let handleloadmore = () => {
    setCurrentData(data.slice(0, currentData.length + 5))
    // setCurrentData(currentData+currentData)

  }







  return (


    <div className="home">

      {display ?
        <>
          <Navbar />
          <h1>Details of git Users</h1>
          {data && <div className="details-division">
            {
              currentData.map((d) => {
                return (

                  <div className="user-list" key={d.id}>
                    <Link to={`/userdetails/${d.id}`}>
                      <img src={d.avatar_url} alt="" width="200px" height="200px" />
                      <h3>User name: <br /> {d.login.toUpperCase()}</h3>
                    </Link>
                  </div>

                )
              })
            }

            <button onClick={handleloadmore} id="load-more" >Load More</button>
          </div>}</> : <Signin />}


    </div>


  );
}

export default Home;