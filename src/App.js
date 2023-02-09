// Modules
import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { getDatabase, push, ref, set, onValue } from "firebase/database";
import { BiWorld, BiHeart } from "react-icons/bi";

//Components
import TripForm from "./Components/TripForm";
import AllTrips from "./Components/AllTrips";
import ErrorPage from "./Components/ErrorPage";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import AnimatedPage from "./Components/AnimatedPage";

// Assets
import firebase from "./firebase";
import "./sass/App.scss";

function App() {
  // Title change on mount
  useEffect(() => {
    document.title = "Safe Travels";
  }, []);

  // List of logged trips saved in state
  const [trips, setTrips] = useState([]);

  // Feedback from listener to see if our checkbox is checked or unchecked
  const [isChecked, setIsChecked] = useState(false);

  // Feedback from listener to capture input values as they change
  const [allValues, setAllValues] = useState({
    name: "",
    pronouns: "",
    age: "",
    gender: "",
    sexuality: "",
    ethnicity: "",
    city: "",
    country: "",
    arrivalDate: "",
    returnDate: "",
    arrivalDate: "",
    partnered: "",
    safetyRating: 0,
    faves: "",
    advice: "",
  });

  // List of countries fetched from API and saved in state
  const [countryData, setCountryData] = useState([]);

  // Feedback from listener to see what country the user chooses so we can dynamically change the background
  const [bgQuery, setBgQuery] = useState("beautiful");

  // Background image from Unsplash API saved in state
  const [background, setBackground] = useState("");

  // Handler to listen for changes in input values
  const handleInputChange = (e) => {
    setAllValues({
      ...allValues,
      [e.target.name]: e.target.value,
    });

    if (e.target.type === "checkbox") {
      setIsChecked(!isChecked);
      setAllValues({
        ...allValues,
        [e.target.name]: !isChecked,
      });
    }
  };

  // Handler to submit trip information to firebase database
  const handleSubmit = () => {
    const database = getDatabase(firebase);
    const postListRef = ref(database, "posts");
    const newPostRef = push(postListRef);
    set(newPostRef, allValues);
    setAllValues({
      name: allValues.name,
      pronouns: allValues.pronouns,
      age: allValues.age,
      gender: allValues.gender,
      sexuality: allValues.sexuality,
      ethnicity: allValues.ethnicity,
      city: "",
      country: "",
      arrivalDate: "",
      returnDate: "",
      partnered: "",
      safetyRating: 0,
      faves: "",
      advice: "",
    });
    setIsChecked(false);
  };

  // Store changes in value when the user searches for a trip
  const [searchValue, setSearchValue] = useState({
    citySearch: "",
    countrySearch: "",
  });

  // Collects trip data from firebase database on component mount and change in database
  useEffect(() => {
    const database = getDatabase(firebase);
    const postListRef = ref(database, "posts");
    onValue(postListRef, (response) => {
      const data = response.val();
      const newState = [];
      for (let key in data) {
        newState.push({ key: key, tripInfo: data[key] });
      }
      setTrips(newState);
    });
  }, []);

  // Fetch country and city information from API on component mount
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCountryData(data.data);
      });
  }, []);

  // Fetch a new background image when a user selects a new country (bgQuery)
  useEffect(() => {
    const fetchData = async () => {
      const url = new URL("https://api.unsplash.com/search/photos");
      url.search = new URLSearchParams({
        client_id: "Gja01wZ3k0nuZjpWdToRUKRqgClg_m-jRxFHQ2hAEYY",
        query: `${bgQuery} landscape`,
      });

      try {
        const data = await fetch(url);
        const response = await data.json();

        // Reduce array to find the best picture (the most likes)
        const bestPic = response.results.reduce((prev, cur) => {
          return prev.likes > cur.likes ? prev : cur;
        });

        setBackground(bestPic.urls.full);
      } catch (error) {
        alert(error);
      }
    };

    fetchData();
  }, [bgQuery]);

  // Change the background image when country search values are updated
  useEffect(() => {
    if (searchValue.countrySearch) {
      setBgQuery(searchValue.countrySearch);
    } else if (allValues.country) {
      setBgQuery(allValues.country);
    }
  }, [allValues.country, searchValue.countrySearch]);

  // Path name variable for conditional rendering
  const pathName = useLocation().pathname;

  // Object storing conditionals and variables to be passed as inline styling
  // Special background for error component, specified height on home and error components
  const bodyStyles = {
    backgroundImage:
      "url(" +
      `${
        pathName === "/"
          ? background
          : pathName === "/log"
          ? background
          : pathName === "/trips"
          ? background
          : "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2113&q=80"
      }` +
      ")",
    height:
      pathName === "/trips"
        ? undefined
        : pathName === "/log"
        ? undefined
        : "100vh",
  };

  return (
    <>
      <div className="body" style={bodyStyles}>
        <header id="header">
          {pathName === "/" ? undefined : (
            <>
              <h1>
                Safe Travels
                <BiWorld className="icon" />
              </h1>
              <NavBar />
            </>
          )}
        </header>

        <AnimatedPage>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/log"
              element={
                <TripForm
                  handleSubmit={handleSubmit}
                  handleInputChange={handleInputChange}
                  allValues={allValues}
                  countryData={countryData}
                />
              }
            />
            <Route
              path="/trips"
              element={
                <AllTrips
                  trips={trips}
                  setTrips={setTrips}
                  countryData={countryData}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              }
            />
            <Route path="*" element={<ErrorPage homePage={<Home />} />} />
          </Routes>
        </AnimatedPage>
      </div>
      <footer>
        <p>
          Made with <BiHeart className="icon" /> in 2023 by{" "}
          <a href="https://www.haleytibbitts.com/">Haley Tibbitts</a>
        </p>
      </footer>
    </>
  );
}

export default App;
