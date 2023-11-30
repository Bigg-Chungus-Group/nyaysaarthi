import React, { useEffect } from "react";
import Navbar from "../../Components/User/Navbar/Navbar";
import User from "./User/User";
import TFA from "./Popups/TFA/TFA";

const Home = () => {
  const [isTfaOpen, setIsTfaOpen] = React.useState(false);
  return (
    <>
      <Navbar />
      <User />
      <TFA isTfaOpen={isTfaOpen} />
    </>
  );
};

export default Home;
