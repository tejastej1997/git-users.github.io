import {  Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase-config';
import {  onAuthStateChanged,signOut} from "firebase/auth";
import './navbar.css'
import { useState } from 'react';

const Navbar = () => {

    let navigate=useNavigate()
   let length=JSON.parse(localStorage.getItem('favourites'))
   let[usermail,setUsermail]=useState("")
   let un=JSON.parse( localStorage.getItem('data')) 
   
   onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      setUsermail(user.email)
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

   
    let handlesignout=()=>{
        signOut(auth).then(() => {
            alert('signout successful')
            window.location.reload()
            
          }).catch((error) => {
            alert(error.message)
          });
       
    }
    
    
    return ( 
        <div className="navbar">
            <nav>
               <Link to="/home" id='link'> <h2>Home</h2> </Link>
                {/* <div className="searchbar">
                    <input type="search" name="" id="search-input" placeholder="Search here" />
                    <button id='searchbtn'>Search</button>
                </div> */}
             <Link to="/favourites" ><button id='favourites'>Favourites <p >{length.length} </p></button></Link> 
              <button >Usermail :{usermail} </button>
              <button onClick={handlesignout}>Logout</button>
            </nav>
        </div>
     );
}
 
export default Navbar;