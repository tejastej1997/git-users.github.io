import { Link, useNavigate } from "react-router-dom";
import {  signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase-config";

import './signin.css'
import { useState } from "react";
import Forgotpassword from "./Forgotpassword";

          const Signin = () => {
              let navigate=useNavigate()
              const provider = new GoogleAuthProvider();
              let[forgotpassword,setForgotpassword]=useState(false)

            let[email,setEmail]=useState('')
            let[password,setPassword]=useState('')

          let handlesignin=(e)=>{
              e.preventDefault()
              
              signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
            alert('sign in successful')
            navigate('/home')

              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              alert(errorMessage)
            });

          }

let signinwithgoogle=()=>{

  // const auth = getAuth();
  signInWithPopup(auth, provider)
.then((result) => {
  // This gives you a Google Access Token. You can use it to access the Google API.
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  // The signed-in user info.
  const user = result.user;
  console.log(user.email);
  alert("logged in as" +":"+ user.email)
  navigate('/home')
  // ...
}).catch((error) => {
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
  console.log(errorMessage);
  // The email of the user's account used.
  const email = error.customData.email;
  // The AuthCredential type that was used.
  const credential = GoogleAuthProvider.credentialFromError(error);
  // ...
});
 }






    return ( 
   <div className="sign-in-content">
    <div className="sign-in">
    <form action="" onSubmit={handlesignin}>
            <input type="email" name="" id="" placeholder="Enter email"  onChange={(e)=>{setEmail(e.target.value)}} />

            <div className="signin-password">
            <input type="password" name="" id="" placeholder="Enter password"  onChange={(e)=>{setPassword(e.target.value)}} />
            <p id="forgot-password" onClick={()=>{setForgotpassword(true)}} > Forgot password?  </p>
            </div>
           
            <input type="submit" value="Sign-in" id="submit"/>
            <p id='signin-link'>Dont have an account? <Link to="/" >Sign-up</Link> </p>
          <hr />
            <div className="social-media-signin">
                <div className="google-signin" onClick={signinwithgoogle}>Signin with Google</div>
                <div className="facebook-signin">Signin with Facebook</div>
            </div>

            </form>
    </div>
    {forgotpassword && <Forgotpassword/>}


   </div>
        
     );
}
 
export default Signin;