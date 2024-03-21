import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { auth } from "../firebase"; // Import auth from firebase

function Navbar() {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the current user
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <b>Live News App</b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* Conditional rendering based on authentication status */}
              {!currentUser && (
                <div className="d-flex align-items-center">
                  {" "}
                  {/* Added container for alignment */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Signup
                    </Link>
                  </li>
                </div>
              )}
              {currentUser && (
                <>
                  {/* Navigation Links */}
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/general">
                      General
                    </Link>
                  </li>
                  {/* Add other navigation links */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/apple">
                      Apple
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/entertainment">
                      Entertainment
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/health">
                      Health
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/science">
                      Science
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/technology">
                      Technology
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/sports">
                      Sports
                    </Link>
                  </li>
                  {/* Add a container for the welcome message and logout button */}
                  <div className="d-flex align-items-center">
                    {" "}
                    {/* Added container for alignment */}
                    <li className="nav-item">
                      <span style={{ lineHeight: "1", marginRight: "10px" }}>
                        <b>{currentUser.displayName}</b>
                      </span>
                    </li>
                    <li className="nav-item">
                      <button
                        onClick={handleLogout}
                        className="btn btn-link"
                        style={{
                        borderRadius: "5px",
                        color: "",
                        background: "lightblue",
                        fontFamily: "sans-serif",
                        color:"black"
                      }}
                      >
                        Logout
                      </button>
                    </li>
                  </div>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
