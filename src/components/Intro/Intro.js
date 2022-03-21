import { Link } from "react-router-dom";
import React from "react";
import introLogo from './../../images/logo-intro.svg';

const Intro = () => {
  return (
    <section className="intro">
      <div className="intro__info">
        <h1 className="intro__title">Учебный проект студента факультета Веб-разработки.</h1>
        <p className="intro__next">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <a className="into__btn" href="#about">Узнать больше</a>
      </div>
      <img className="intro__art" alt="графика из слов" src={introLogo} />
    </section>
  );
};

export default Intro;
