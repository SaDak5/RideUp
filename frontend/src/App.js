import "./App.css";
import Home from "./components/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
