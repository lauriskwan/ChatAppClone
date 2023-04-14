import { signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "firebase/storage";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import Add from "../image/addAvatar.png";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
        </form>
        <p>
          No account? <Link to="/register"> Register </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
