
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Favourites from './components/favourites/Favourites';
import Followers from './components/followers/Followers';
import Home from './components/home/Home';


import Signin from './components/signup&in/Signin';
import Signup from './components/signup&in/Signup';
import Userdetails from './components/userdetails/Userdetails';

function App() {
  return (
    <BrowserRouter>

    <div className="App">
  
      <Routes>

        
        <Route path='/' element={<Signup/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/home'element={<Home/>} />
        <Route path='/userdetails/:id' element={<Userdetails/>}/>
        {/* <Route path='/individualfollowers' element={<Individualfollowers/>}/> */}
        <Route path='/favourites' element={<Favourites/>}/>
        {/* <Route path='/followers' element={<Followers/>}/> */}
        

      
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
