import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = (props) => {
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/api/logout", { method: "POST" });
      navigate("/");
    } catch (err) {
      console.error("Error: ", err);
    }
  };
  return (
    <div className="fitness-navbar">
      <nav className="fit-navbar">
        <div className="navbar-left">
          <Link to="/">Fitway</Link>
        </div>
        <div className="navbar-right">
          <Link to="/workouts">Workouts & Programs</Link>
          <Link to="/nutrition-plans">Nutrition Plans</Link>
          <Link to="/community">Community</Link>
          <div className="navbar-button">
            {props.logout=="no"?(<Link className="nav-auth-button" to="/authenticate">
              Join Us
            </Link>):(<Link className="nav-auth-button" onClick={handleLogout} >
            Logout
          </Link>)}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;