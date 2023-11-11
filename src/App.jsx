import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Profile_setup from './pages/Profile_setup/Profile_setup';
import { ToastContainer } from "react-toastify";
import "../firebaseConfig";
import  Navbar  from "./Components/Navbar.js/Navbar";

function App() {
  return (
   <Router>
   <Navbar/>
      <Routes>
        <Route path="/" element={<h1>Hello</h1>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path="/profile" element={<Profile_setup/>}/>
      </Routes>
      <ToastContainer
        position="bottom-right"
        newestOnTop
        theme="light"
      />
   </Router>
  )
}

export default App
