// Modules
import { BiWorld } from "react-icons/bi";

// Components
import NavBar from "./NavBar";
import AnimatedPage from "./AnimatedPage";

const Home = () => {
  return (
    <AnimatedPage>
      <section className="home wrapper">
        <div className="text-container">
          <h2>Welcome to Safe Travels</h2>
          <h3>
            An inclusive travel log for Black, Indigenous, Queer and
            Gender-Non-Conforming folks. <BiWorld className="icon" />
          </h3>
          <h4>What would you like to do today?</h4>
          <NavBar />
        </div>
      </section>
    </AnimatedPage>
  );
};

export default Home;
