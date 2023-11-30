import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ShowsList from "./components/ShowsList";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import ProfilePage from "./components/ProfilePage";

const token = localStorage.getItem("token");
if (token) {
  console.log("Token found:", token);
} else {
  console.log("No token found");
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shows" element={<ShowsList />} />
        <Route path="/me" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
