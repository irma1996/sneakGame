import "./App.css";
import WelcomeSite from "./WelcomeSite";
import React, { useState } from "react";
import LoginForm from "./components/LoginForm";

function App() {
  const adminUser = {
    email: "admin@admin.com",
    password: "admin123"
  };

  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  const Login = (info) => {
    console.log(info);

    if (info.email == adminUser.email && info.password == adminUser.password) {
      console.log("Just logged in");
      setUser({
        name: info.name,
        email: info.email
      });
    } else {
      console.log("Please verify your information and try again.");
      setError("Please verify your information and try again.");
    }
  };

  const Logout = () => {
    setUser({
      name: "",
      email: ""
    });
  };

  return (
    <div className="App">
      {user.email != "" ? (
        <div className="welcome">
          <h2>
            {" "}
            Welcome, <span>{user.name}</span>
          </h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
    </div>
  );
}
export default App;
