import React, { useState } from "react";

function LoginForm({ Login, error }) {
  const [info, setInfo] = useState({ name: "" });

  const submitHandler = (e) => {
    e.preventDefault();

    Login(info);
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="form-inner">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setInfo({ ...info, name: e.target.value })}
            value={info.name}
            required
          />
        </div>

        <input type="submit" value="LOGIN" />
      </div>
    </form>
  );
}

export default LoginForm;
