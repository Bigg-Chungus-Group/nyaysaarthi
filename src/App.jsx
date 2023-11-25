import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Profile_setup from "./pages/Profile_setup/Profile_setup";
import { ToastContainer } from "react-toastify";
import "../firebaseConfig";
import Loader from "./Components/Loader/Loader";
import Services from "./pages/Services/Services"
import Privacy from "./pages/Privacy/Privacy";
import Tos from "./pages/Tos/Tos";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile/setup" element={<Profile_setup />} />
        <Route path="/service" element={<Services/>}></Route>
        <Route path="privacy" element={<Privacy />} />
        <Route path="tos" element={<Tos />} />
      </Routes>
      <ToastContainer position="bottom-right" newestOnTop theme="light" />
    </Router>
  );
}

export default App;
