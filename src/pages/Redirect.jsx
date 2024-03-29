import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Head from "../components/Head";
import { Spinner } from "../components/Spinner";
import { getOauthUser } from "../redux/actions/authActions";
import { setUser } from "../redux/features/users/loginSlice";
import { resetOauthUser } from "../redux/features/users/oauthUserSlice";

const Redirect = () => {
  const { isSuccess, oauthUserData } = useSelector((state) => state.oauthUser);
  const { route } = useSelector((state) => state.savedRoute);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(oauthUserData));
      if (route) {
        navigate(route);
      } else {
        navigate("/");
      }
      dispatch(resetOauthUser());
    } else {
      dispatch(getOauthUser());
    }
  }, [dispatch, isSuccess, route, navigate, oauthUserData]);

  return (
    <div className="redirect-container">
      <Head title="Redirecting..." />
      <Spinner width={100} height={100} color="#7dce13" />
      <h1>redirecting</h1>
    </div>
  );
};

export default Redirect;
