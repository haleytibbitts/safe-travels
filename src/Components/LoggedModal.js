import { Link } from "react-router-dom";
import { BiWorld, BiBookHeart } from "react-icons/bi";
import { SlPlane } from "react-icons/sl";

const LoggedModal = ({ openModal, setOpenModal, allValues }) => {
  return (
    <div
      className="overlay"
      onClick={(e) => {
        e.preventDefault();
        setOpenModal(false);
      }}
    >
      <div
        className="modal-container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h3>Thanks, {allValues.name}!</h3>
        <h4>Your trip has been recorded.</h4>
        <div className="icons">
          <SlPlane />
          <BiWorld />
          <BiBookHeart />
        </div>
        <nav>
          <ul>
            <li>
              <Link
                to="/log"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenModal(false);
                }}
              >
                Log Another Trip
              </Link>
            </li>
            <li>
              <Link to="/trips">See All Trips</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default LoggedModal;
