import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

function App() {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<h1>Hello</h1>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
   </Router>
  )
}

export default App
