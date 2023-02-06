import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        {useLocation().pathname === "/" ? undefined : (
          <li>
            <Link to="/">Home</Link>
          </li>
        )}
        <li>
          <Link to="/log">Log a Trip</Link>
        </li>
        <li>
          <Link to="/trips">See Trips</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
