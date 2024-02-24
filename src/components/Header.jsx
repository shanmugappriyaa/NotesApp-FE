import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { UserContext } from "../userContext";
import { BiUserCircle } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function Header() {
  let navigate = useNavigate();
  // let logout = useLogout();
  const { userName, setUserName } = useContext(UserContext);
  const logout = () => {
    setUserName("");
    toast.success("User Logout Successfull");
    navigate("/login");
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} />
      <nav class="navbar navbar-light bg-warning p-2">
        <div className="col-6 text-align-center p-2">
          <h4 onClick={() => navigate("/noteslist")}>
            {" "}
            <MdOutlineSpeakerNotes /> Notes App
          </h4>
        </div>
        <div className="col-6 d-flex justify-content-end">
          {userName ? (
            <div className="d-flex align-items-center">
              <div className="d-flex me-5  align-items-center">
                <BiUserCircle className="header-icon" />
                <div className="d-flex flex-column ms-1">
                  <label>Welcome</label>
                  <label className="text-blue">{userName}</label>
                </div>
              </div>

              <button
                onClick={() => logout()}
                className="p-2 btn btn-secondary"
              >
                {" "}
                Logout
              </button>
            </div>
          ) : (
            <div className="d-flex me-5  align-items-center">
              <button
                onClick={() => navigate("/login")}
                className="me-5 btn btn-primary"
              >
                {" "}
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className=" btn btn-primary"
              >
                {" "}
                Registration
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
