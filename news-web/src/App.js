import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Footer from "./components/Footer";
import FetchData from "./components/FetchData";
import Login from './Sign-up-pages/Login/Login'
import Signup from './Sign-up-pages/Signup/Signup'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/general" element={<FetchData cat="general" />} />
          <Route path="/business" element={<FetchData cat="business" />} />
          <Route
            path="/entertainment"
            element={<FetchData cat="entertainment" />}
          />
          <Route path="/health" element={<FetchData cat="health" />} />
          <Route path="/science" element={<FetchData cat="science" />} />
          <Route path="/technology" element={<FetchData cat="technology" />} />
          <Route path="/sports" element={<FetchData cat="sports" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
