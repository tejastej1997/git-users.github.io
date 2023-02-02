import './followers.css'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';


const Followers = ({urldata}) => {
    console.log(urldata);
    
    let [data,setData]=useState(null)
    useEffect(()=>{
        setTimeout(() => {
            fetch(urldata)
            .then((response)=>{
              return response.json()
            })
            .then((result)=>{
                console.log(result);
                setData(result)
                // console.log(result.followers_url);
            //   setData(result.followers)
            })
            
        }, 1000);
            
    },[])

    return ( 

      <div className="followers-page">
        {data && <div className="followers-details">
            
            {
                    data.map((i)=>{
                        
                     return(
                        <Link to="/individualfollowers">
                        <div className="indi-follower-details">
                        <img src={i.avatar_url} alt="" width="50px" height="50px" />
                        <h4>{i.login}</h4>
                        </div>
                        </Link>
                        
                     )
                    })
            }
            
        </div>}
      </div>
     );
}
 
export default Followers;