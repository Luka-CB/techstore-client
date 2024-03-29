import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import {
  setRegSuccessMsg,
  toggleAuthModal,
  toggleIsModalOpen,
} from "../../redux/features/statesSlice";
import { login } from "../../redux/actions/authActions";
import { resetLogin } from "../../redux/features/users/loginSlice";
import Dots from "../Dots";
import { useNavigate } from "react-router-dom";

const apiUrl = "https://techstore-api-3jmr.onrender.com/api/users/login";
const apiUrlLocal = "http://localhost:5000/api/users/login";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");

  const { regSuccessMsg } = useSelector((state) => state.states);
  const { isLoading, isSuccess, isError } = useSelector((state) => state.login);
  const { route } = useSelector((state) => state.savedRoute);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleLoginHandler = () => {
    window.open(`${apiUrl}/google`, "_self");
  };

  const facebookLoginHandler = () => {
    window.open(`${apiUrl}/facebook`, "_self");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    if (regSuccessMsg) {
      setTimeout(() => dispatch(setRegSuccessMsg("")), 5000);
    }

    if (isSuccess) {
      dispatch(toggleAuthModal(false));
      dispatch(toggleIsModalOpen());
      if (route) {
        navigate(route);
      }
      dispatch(resetLogin());
    }

    if (isError) {
      setLoginErr("Username or Password is Incorrect!");
      setTimeout(() => {
        setLoginErr("");
        dispatch(resetLogin());
      }, 5000);
    }
  }, [dispatch, route, regSuccessMsg, isSuccess, isError]);

  return (
    <>
      <form className="auth-form" onSubmit={submitHandler}>
        <h1 className="h1">Sign in</h1>
        {regSuccessMsg && (
          <div className="auth-success">
            <p>{regSuccessMsg}</p>
          </div>
        )}
        {loginErr && (
          <div className="auth-error">
            <p>{loginErr}</p>
          </div>
        )}
        <div className="social-container">
          <div className="social" onClick={googleLoginHandler}>
            <FcGoogle id="google-icon" />
          </div>
          <div className="social" onClick={facebookLoginHandler}>
            <FaFacebook id="facebook-icon" />
          </div>
        </div>
        <span className="span">or use your account</span>
        <input
          type="text"
          placeholder="username"
          className="auth-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="123456"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="auth-link">Forgot your password?</p>
        <button className="auth-btn" disabled={isLoading}>
          {isLoading ? <Dots color="#d800a6" /> : "Sign In"}
        </button>
      </form>
    </>
  );
};

export default Login;
