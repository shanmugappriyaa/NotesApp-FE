import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { Container, Button, Link } from "react-floating-action-button";
import { FaCirclePlus } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AxiosService from "./utils/ApiService";
function Notes() {
  let navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  // const [status, setStatus] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await AxiosService.get("notes/byUser");
      console.log("res------------> ", res);
      setNotes(res?.data?.userNotes);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("all notes", notes);
  const deleteNote = async (id, i) => {
    try {
      const del = await AxiosService.delete(`/notes/${id}`);
      if (del?.data?.message === "Success") {
        notes.splice(i, 1);
        setNotes([...notes]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const completeStatus = async (noteid, i) => {
    try {
      const res = await AxiosService.put(`/notes/status/${noteid}`, { status: true });
      console.log("res--->", res);
      if (res.status === 200) {
        toast.success(" Notes  successfully completed");
        notes[i].status = true;
        setNotes([...notes]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="m-4 d-flex flex-column ">
        {notes &&
          notes.map((note, index) => (
            <div
              className="card border-0 shadow mt-3"
              style={{ width: "500px;" }}
              key={index}
            >
              <div className="card-body " style={{ width: "500px;" }}>
                <div className="d-flex justify-content-between">
                  <h4 class="card-title">{note.title}</h4>
                  <CiEdit
                    className="edit-icon"
                    onClick={() => navigate(`/edit/${note._id}`)}
                  />
                </div>

                <p class="card-text">{note.notes}.</p>

                <div className="d-flex justify-content-between">
                  {note.status ? (
                    "Completed"
                  ) : (
                    <button
                      className="btn btn-outline-success"
                      onClick={() => completeStatus(note._id, index)}
                    >
                      Complete
                    </button>
                  )}

                  <RiDeleteBin2Line
                    className="delte-icon"
                    onClick={() => deleteNote(note._id, index)}
                  />
                </div>
              </div>
            </div>
          ))}
        <Container>
          <Button
            tooltip="Create a New Note!"
            onClick={() => navigate("/create")}
          >
            <FaPlus />
          </Button>
        </Container>
      </div>
    </>
  );
}

export default Notes;
