import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Registration() {
  let navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  async function handleReg(ev) {
    ev.preventDefault();
    const { data } = await axios.post(`user/register`, {
      userName: username,
      password,
      email
    });
    console.log(data);
    if (data?.User?._id) {
      toast.success("Registration success")
      navigate("/login");
    } else {
      toast.error("registration Fail");
    }
  }
  return (
    <><ToastContainer position="top-right" />
    <div className="d-flex flex-column align-items-center p-2 m-4">
      <div className=" ">
        <h4> Registration </h4>
      </div>

      <div className="col-8 justify-content-center">
        <form>

          <label class="form-label">UserName</label>
          <input
            type="text"
            id="form3Example1"
            className="form-control"
            value={username}
            onChange={(e) => setUserName(e.target.value)} />

          <label class="form-label">Email</label>
          <input
            type="text"
            id="form3Example1"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <label className="form-label">Password</label>

          <input
            type="password"
            id="form3Example4"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />

          <button
            type="button"
            className="btn btn-primary  m-4"
            onClick={handleReg}
          >
            Sign up
          </button>
        </form>
      </div>
    </div></>
  );
}

export default Registration;
