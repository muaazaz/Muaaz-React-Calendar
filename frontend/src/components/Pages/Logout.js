import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();
  const [url, setUrl] = useState();

  const removeUser = () => {
    fetch("/logout", {
      method: "GET",
    }).then(() => {
      history.push("/");
      window.location.reload();
    });
  };

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUrl(process.env.REACT_APP_API_URL);
    removeUser();
  }, [url]);
  
  return (
    <div className="lgo">
      <h5>Logging Out .....</h5>
    </div>
  );
};

export default Logout;
