import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

function EditNote() {
  const { id } = useParams();
  let navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [value, setValue] = useState("");
  const getNote = async () => {
    try {
      const editNote = await axios.get(`notes/${id}`);
      console.log("editNote-->", editNote);
      setTitle(editNote.data?.notes?.title);
      setNotes(editNote.data?.notes?.notes);
      setValue(editNote.data?.notes?.reminder)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNote();
  }, []);

  const handleEdit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`notes/edit/${id}`, { title, notes });
      console.log("res--->",res);
      if (res.status === 200) {
        toast.success(" Notes edited successfully");
        navigate("/noteslist");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <><ToastContainer position="top-right" />
    <div className="d-flex m-4 flex-column align-items-center">
      <h4>EditNote</h4>
      <form>
        <div className="d-flex flex-column">
          <lable> Title</lable>
          <input
            type="text"
            placeholder="Enter the title"
            className="mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)} />
          <lable> Description</lable>
          <input
            type="text"
            placeholder="Enter the Description"
            className="mb-4"
            value={notes}
            onChange={(e) => setNotes(e.target.value)} />
          <div>
            <p>Set Reminder</p>
            <DateTimePicker
              label="Basic date time picker"
              value={value}
              onChange={(newValue) => setValue(newValue)} />
          </div>
          <button className="btn btn-primary mt-4" onClick={(e) => handleEdit(e)}>
            {" "}
            Save
          </button>
        </div>
      </form>

    </div></>
  );
}

export default EditNote;
