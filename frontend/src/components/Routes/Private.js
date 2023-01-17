import { Route } from "react-router-dom";
import { useMemo, useState } from "react";
import Login from "../Login";
const PrivateRoutes = ({ path, component }) => {
  const token = localStorage.getItem("token");
  const [logIn, setLogIn] = useState(false);
  useMemo(() => {
    if (token) {
      setLogIn(true);
    }
  }, [token]);

  return (
    <>
      {logIn ? (
        <Route path={path} component={component} />
      ) : (
            <Login/>
      )}
    </>
  );
};

export default PrivateRoutes;
