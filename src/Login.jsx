import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "./userContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import SimpleAxiosService from "./utils/SimpleApiService";
function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { setUserName } = useContext(UserContext);
  let navigate = useNavigate();

  async function handleSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await SimpleAxiosService.post(`user/login`, {
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
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  return (
    <>
      <ToastContainer position="top-right" />
      <div className="d-flex flex-column align-items-center justify-content-center min-h">
        <div className="card shadow">
          <div className="card-body d-flex flex-column align-items-center m-3">
            <h4 className="text-primary"> Login </h4>

            <form className="form d-flex flex-column align-items-center mt-3">
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
              <button
                className="col-12 btn btn-danger my-4"
                onClick={handleSubmit}
              >
                Login
              </button>
            </form>

            <div className="d-flex align-items-center ">
              Don't have an Account?
              <button
                className="btn btn-link"
                onClick={() => navigate("/register")}
              >
                Register Here
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
