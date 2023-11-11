import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { ToastContainer } from "react-toastify";
import "../firebaseConfig"

function App() {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<h1>Hello</h1>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>}/>
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
