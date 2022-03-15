import React from "react";
import { Link } from "react-router-dom";

const Auth = () => {
  return (
    <div className="auth">
      <Link to="/signup" className="auth__signup">Регистрация</Link>
      <Link to="/signin" className="auth__signin">Войти</Link>
    </div>
  );
}

export default Auth;