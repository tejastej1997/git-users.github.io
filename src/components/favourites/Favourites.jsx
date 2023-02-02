import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import './favourites.css'
const Favourites = () => {
  
    let favouriteitem=JSON.parse(localStorage.getItem('favourites'))

    return ( 
       <>
        <Navbar/>
      
        <div className="favourites">
           
            {
                favouriteitem.map((f)=>{
                   return(
                    
                    <div className="favourites-details">
                        
                        <Link id='link-tag' to={`/userdetails/${f.login}`}>
                    <img src={f.avatar_url} alt="" width="70px" height="70px" />
                    <h1>{Number(f.name) ? `Not Given` : `${f.name}`}</h1>
                    </Link>
                    {/* <button id='remove-button' onClick={handledelete}>Remove</button> */}
                        
                 
                    {/* <button id='remove-button' onClick={handledelete}>Remove</button> */}
                    
                    
                    </div>
                   )
                })
            }
        </div>

        </>
     );
}
 
export default Favourites;