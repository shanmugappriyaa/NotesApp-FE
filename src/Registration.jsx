import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SimpleAxiosService from "./utils/SimpleApiService";
function Registration() {
  let navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  async function handleReg(ev) {
    ev.preventDefault();
    try {
      const { data } = await SimpleAxiosService.post(`user/register`, {
        userName: username,
        password,
        email,
      });
      console.log(data);
      if (data?.User?._id) {
        toast.success("Registration success");
        navigate("/login");
      } else {
        toast.error("registration Fail");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
  return (
    <>
      <ToastContainer position="top-right" />
      <div className="d-flex flex-column align-items-center justify-content-center min-h">
        <div className="col-6 card shadow">
          <div className="card-body d-flex flex-column align-items-center m-2">
            <h4> Registration </h4>

            <form className="form d-flex flex-column m-3">
              <label class="form-label">UserName</label>
              <input
                type="text"
                id="form3Example1"
                className="form-control"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />

              <label class="form-label mt-2">Email</label>
              <input
                type="text"
                id="form3Example1"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="form-label mt-2">Password</label>

              <input
                type="password"
                id="form3Example4"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="col-12 btn btn-danger mt-3"
                onClick={handleReg}
              >
                Sign up
              </button>
            </form>
            <div className="d-flex align-items-center ">
              You have an Account?
              <button
                className="btn btn-link"
                onClick={() => navigate("/login")}
              >
                Login Here
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;
