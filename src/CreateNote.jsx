import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import axios from "axios";
import AxiosService from "./utils/ApiService";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoArrowBack } from "react-icons/io5";

function CreateNote() {
  let navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [reminder, setReminder] = useState(new Date());
  let userData = JSON.parse(sessionStorage.getItem("userData"));
  const handleSave = async (ev) => {
    ev.preventDefault();
    console.log(title, notes, reminder);
    // const reminderTime = moment.utc(reminder).local().format('YYYY-MM-DD HH:mm');

    try {
      const res = await AxiosService.post("/notes/create", {
        title,
        notes,
        reminder,
        email: "pshanmu.priya93@gmail.com",
      });
      if (res.status === 201) {
        toast.success("Notes created Successfully");
        navigate("/noteslist");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ToastContainer position="top-right" />
      <div className="min-h d-flex flex-column align-items-center justify-content-center">
        <div className="card shadow">
          <div className="card-body mx-5 m-3">
            <Link
              to={"/noteslist"}
              className="link-decor d-flex flex-col align-items-center my-2"
            >
              <IoArrowBack className="back-arrow-icon" />
              <div className="heading-txt ms-2">CreateNote</div>
            </Link>

            <div className="d-flex flex-row justify-content-center">
              <form>
                <div className="mb-3">
                  <lable className="form-label"> Title</lable>
                  <input
                    type="text"
                    placeholder="Enter the title"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <lable className="form-label"> Description</lable>
                  <textarea
                    type="text"
                    placeholder="Enter the Description"
                    className="form-control"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <p className="form-label">Reminder</p>
                  <DateTimePicker
                    label="Basic date time picker"
                    value={reminder}
                    onChange={(newValue) => setReminder(newValue)}
                  />
                  ;
                </div>
                <button
                  className="col-12 btn btn-danger mt-4"
                  onClick={(e) => handleSave(e)}
                >
                  {" "}
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateNote;
