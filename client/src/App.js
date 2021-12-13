import React from "react";
import {
  Routes,
  Route
} from "react-router-dom";

import Homepage from "./Components/Home";
import Login from './Components/Login';
import SignUp from "./Components/Signup";

export default function App() {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Homepage />} />
    </Routes>
  );
}