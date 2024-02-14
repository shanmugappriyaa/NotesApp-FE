import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "./userContext";
import { useNavigate } from "react-router-dom";
function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { setUserName } = useContext(UserContext);
  let navigate = useNavigate();

  async function handleSubmit(ev) {
    ev.preventDefault();
    const { data } = await axios.post(`user/login`, {
      userName: name,
      password,
    });
    setUserName(name);
    console.log("login/reg------------->", data);

    if (data?.token) {
      // setUserName(data.user.userName)
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("userData", JSON.stringify(data.user));
      navigate("/noteslist");
    } else {
      alert("login fail");
    }
  }
  return (
    <div className="d-flex flex-column p-2 m-2 align-items-center">
      <div>
        <h4> Login </h4>
      </div>
      <div>
        <form className="form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Username"
            className="form-control m-2"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="form-control m-2"
          />
          <button className="btn btn-primary m-4" onClick={handleSubmit}>
            Login
          </button>
        </form>
      </div>
      <div className="d-flex align-items-center ">
        Don't have an Account?
        <button
          className="btn btn-primary m-2"
          onClick={() => navigate("/register")}
        >
          Register Here
        </button>
      </div>
    </div>
  );
}

export default Login;
