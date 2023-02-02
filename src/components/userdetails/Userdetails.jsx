import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Followers from "../followers/Followers";
import Navbar from "../navbar/Navbar";


import './userdetails.css'

const Userdetails = () => {

    let { id } = useParams()
    let [followers, setFollowers] = useState(false)
    let [following, setFollowig] = useState(false);
    let [added , setAddded] = useState(false);

    let [data, setData] = useState(null)

 

    useEffect(() => {

        let favs = JSON.parse(localStorage.getItem('favourites'));
        let result = favs.some((user)=>{ return user.login == id});
        setAddded(result);

        setTimeout(() => {
            fetch(`https://api.github.com/users/` + id)
                .then((response) => {
                    return response.json()
                })
                .then((result) => {
                    // console.log(result);
                    setData(result)
                })

        }, 1000);
    }, [])

    let addtofavs = () => {
        let favs = JSON.parse(localStorage.getItem('favourites'));
        favs.push(data);
        favs = JSON.stringify(favs);
        localStorage.setItem("favourites" , favs);
        // alert("added");
        setAddded(true);
    }

    let removefromfavs = () => {
        let favs = JSON.parse(localStorage.getItem('favourites'));
        let ind = favs.findIndex((user)=>{ return user.login == id })
        favs.splice(ind , 1);
        favs = JSON.stringify(favs);
        localStorage.setItem("favourites" , favs);
        // alert("removed");
        setAddded(false);
    }   
    return (
        <div className="user-individual-details">
            <Navbar />
            {data && <div className="perticular-details" key={data.id}>
                <div className="perticular-details-section1">
                    <img src={data.avatar_url} alt="" width="300px" height="300px" />
                    <h1>Name : {!Number(data.name) ? `${data.name}` : `Anonymus`}</h1>
                </div>
                <div className="perticular-details-section2">

                    <div className="perticular-details-section2-details">

                        <label htmlFor="">Location</label>
                        <h5 id="location"> : {(data.location) ? `${data.location}` : `Not Given`}</h5>
                        <label htmlFor="">Company</label>
                        <h5> : {(data.company) ? `${data.company}` : `Not Given`} </h5>
                        <label htmlFor="">Public Repos</label>
                        <h5>: {data.public_repos}</h5>
                        <label htmlFor="">Public Gists</label>
                        <h5> : {data.public_gists} </h5>

                    </div>
                    <div className="event-buttons">
                        <button onClick={() => { setFollowers(true); setFollowig(false) }}>Followers [{data.followers}]</button>
                        <button onClick={() => { setFollowig(true); setFollowers(false) }}>Following [{data.following}] </button>
                        <div className="handling-buttons">
                        {!added && <button  id='adding' onClick={addtofavs}>Add to favourites</button>}
                        {added && <button id="removing" onClick={removefromfavs} >Remove from favourites</button> } 
                        </div>
                     
                     
                    </div>
                    <a id="linktag" href={data.html_url} target="_blank"> <button id="btn" >Click here for public repos</button> </a>
                </div>

            </div>}

            {followers && <Followers urldata={data.followers_url} />}
            {following && <div className="following">
                <p>Following list cannot be displayed</p>
            </div>}


        </div>
    );
}

export default Userdetails;