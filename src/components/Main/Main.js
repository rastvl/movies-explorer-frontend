import React from "react";
import Intro from "../Intro/Intro";
import AboutProject from "../AboutProject/AboutProject";
import Tech from "../Tech/Tech";
import Student from "../Student/Student";

const Main = () => {
  return (
    <div className="landing">
      <Intro />
      <AboutProject />
      <Tech />
      <Student />
      
    </div>
  );
}

export default Main;