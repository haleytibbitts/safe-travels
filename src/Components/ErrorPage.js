import { BiPlanet } from "react-icons/bi";

const ErrorPage = ({ homePage }) => {
  return (
    <section className="error wrapper">
      <div className="text-container">
        <h2>
          Error 404: <span>Undiscovered Worlds!</span>
        </h2>
        <BiPlanet className="icon" />
        <h3>
          Look at you, exploring the unknown! Enjoy your time in the final
          frontier. When you're ready, our handy dandy navigation will take you
          back to planet earth.
        </h3>
      </div>
    </section>
  );
};

export default ErrorPage;
