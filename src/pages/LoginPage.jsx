import React from "react";
import Add from "../image/addAvatar.png";

const LoginPage = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Login</span>
        <form>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
        </form>
        <p>No account? Register</p>
      </div>
    </div>
  );
};

export default LoginPage;
