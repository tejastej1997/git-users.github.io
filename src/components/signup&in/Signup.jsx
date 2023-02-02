import './signup.css'


import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { auth } from '../../firebase-config';



import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,FacebookAuthProvider } from "firebase/auth";













const Signup = () => {

    const provider = new GoogleAuthProvider();
    const fprovider = new FacebookAuthProvider();

    let gpassword=document.getElementById('gpassword')
    let cpassowrd=document.getElementById('cpassword')
    let hs=document.getElementById('hs')
  let navigate=useNavigate()
  let [email,setEmail]=useState("")
   let [password,setPassword]=useState("")


   let handlesignup=(e)=>{
      e.preventDefault()
      if(gpassword.value==cpassowrd.value)
      {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          alert("sign in successful")
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage)
          // ..
        });
        cpassowrd.style.border="1px solid #0c2461"

      }
      else
      {
        alert("please check the password")
        cpassowrd.style.border="1px solid red"
      }

   }

       
   let toggle=()=>{
    if(gpassword.type=="password")
    {
        gpassword.type="text"
        hs.innerHTML="Hide"
    }
    else
    {
      gpassword.type="password"
      hs.innerHTML="Show"
    }

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

//     let handlesigninwithfacebook=()=>{

//     signInWithPopup(auth, fprovider)
//   .then((result) => {
//     // The signed-in user info.
//     const user = result.user;

//     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//     const credential = FacebookAuthProvider.credentialFromResult(result);
//     const accessToken = credential.accessToken;

//     // ...
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = FacebookAuthProvider.credentialFromError(error);

//     // ...
//   });
// }



 

    return ( 
        <div className="signup-content">

                <div className="signup">
            <form action="">
            <input type="email" name="" id="" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
            <div className="pass">
            <input type="password" name="" id="gpassword" placeholder="Enter password" maxLength="10" onChange={(e)=>{setPassword(e.target.value)}}/>
              <p id='hs' onClick={toggle}>Hide</p>
            </div>
            <input type="text" name="" id="cpassword" placeholder="Confirm password"/>
            <input type="submit" value="Sign-up" id="submit" onClick={handlesignup}/>
            <p id='signup-link'>Already have an account? <Link to="/signin" >Sign-in</Link> </p>
          <div className="division">
            <hr />
            <p>OR</p>
            <hr />
          </div>
          <div className="social-media-signin">
                <div className="google-signin" onClick={signinwithgoogle}>Signin with Google</div>
                <div className="facebook-signin"  >Signin with Facebook</div>
               
            </div>
            </form>
        </div>

        </div>
      
     );
}
 
export default Signup;