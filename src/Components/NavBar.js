import { Link, useLocation } from "react-router-dom";
import { BiBookHeart, BiHomeHeart } from "react-icons/bi";
import { SlPlane } from "react-icons/sl";

const NavBar = () => {
  return (
    <nav>
      <ul>
        {useLocation().pathname === "/" ? undefined : (
          <li>
            <Link to="/">
              <BiHomeHeart className="icon" />
              Home
            </Link>
          </li>
        )}
        <li>
          <Link to="/log">
            <BiBookHeart className="icon" />
            Log a Trip
          </Link>
        </li>
        <li>
          <Link to="/trips">
            <SlPlane className="icon" />
            See Trips
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
