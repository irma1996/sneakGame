import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";

const WelcomeSite = () => {
  const [user, setUser] = useState({ name: "", email: "" });

  const Login = (info) => {
    console.log(info);

    setUser({
      name: info.name
    });
  };

  return (
    <div className="App">
      {user.name != "" ? (
        <div className="welcome">
          <h2>
            Welcome, <span>{user.name}</span>
          </h2>
          <Link className="play-buttom" to="game">
            Play
          </Link>
        </div>
      ) : (
        <LoginForm Login={Login} />
      )}
    </div>
  );
};

export default WelcomeSite;
