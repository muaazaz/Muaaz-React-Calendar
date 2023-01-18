import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [isUserName, setIsUserName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);

  const handleSubmit = async () => {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, userName, password }),
    });
    const data = await res.json();
    if (data.user) {
      const decodedToken = jwtDecode(data.token);
      const id = decodedToken.id;
      if (data.user && id === data.user._id) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.user.email);

        history.push("/");
        window.location.reload();

      }
    } else {
      setError((v) => data.error);
    }
  };

  const handleEmail = () => {
    const div = document.querySelector(".select");
    div.style.display = "none";
    const div1 = document.querySelector(".select1");
    div1.style.display = "none";
    setIsEmail(true);
  };
  const handleUsername = () => {
    const div = document.querySelector(".select");
    div.style.display = "none";
    const div1 = document.querySelector(".select1");
    div1.style.display = "none";
    setIsUserName(true);
  };

  return (
    <div className="create">
      <h1>Log In</h1>
      <div className="select" onClick={handleEmail}>
        <h2>Log In Using Email Address</h2>
      </div>
      <div className="select1" onClick={handleUsername}>
        <h2>Log In Using Your User Name</h2>
      </div>
      {isEmail && (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            handleSubmit();
          }}
        >
          <label className="lbl">Email:</label>
          <input
            className="inp"
            type="text"
            required
            maxLength={30}
            value={email}
            placeholder="please enter your email"
            onChange={(e) => {
              setError((v) => "");
              setEmail(e.target.value);
            }}
          />
          <label className="lbl">Password:</label>
          <input
            className="inp"
            type="password"
            required
            minLength={8}
            value={password}
            placeholder="please enter your password"
            onChange={(e) => {
              if (e.target.value.length < 8) {
                setError((v) => "paswword is wrong");
                setPass((p) => e.target.value);
              } else {
                setError((v) => "");
                setPass((p) => e.target.value);
              }
            }}
          />
          {error && <h5 className="error">{error}</h5>}
          <button className="create-btn">Log In</button>
          <br />
          <br />
          <a href="/login">Use User Name Instead</a>
        </form>
      )}
      {isUserName && (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            handleSubmit();
          }}
        >
          <label className="lbl">User Name:</label>
          <input
            className="inp"
            type="text"
            required
            maxLength={15}
            value={userName}
            placeholder="please enter your user name"
            onChange={(e) => {
              setError((v) => "");
              setUserName(e.target.value);
            }}
          />
          <label className="lbl" >Password:</label>
          <input
            className="inp"
            type="password"
            required
            value={password}
            minLength={6}
            placeholder="please enter your password"
            onChange={(e) => {
              if (e.target.value.length < 8) {
                setError((v) => "paswword is wrong");
                setPass((p) => e.target.value);
              } else {
                setError((v) => "");
                setPass((p) => e.target.value);
              }
            }}
          />
          {error && <h5 className="error">{error}</h5>}
          <button className="create-btn">Log In</button>
          <br />
          <br />
          <a href="/login">Use Email Instead</a>
        </form>
      )}
    </div>
  );
};

export default Login;
