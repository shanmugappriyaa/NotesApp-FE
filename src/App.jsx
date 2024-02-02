import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Registration from "./Registration";
import Notes from "./Notes";
import "./App.css";
import { UserContextProvider } from "./userContext";
import axios from "axios";
import CreateNote from "./CreateNote";
import EditNote from "./EditNote";
import Layout from "./components/Layout";

function App() {
  axios.defaults.baseURL = "http://localhost:8000/";
  axios.defaults.withCredentials = true;
  return (


    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
   
        <Route path="/noteslist" element={<Notes />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/edit/:id" element={<EditNote />} />
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
