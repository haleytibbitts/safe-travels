// Modules
import { useState, useEffect } from "react";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import { getDatabase, push, ref, set, onValue } from "firebase/database";
import { BiWorld, BiBookHeart } from "react-icons/bi";
import { SlPlane } from "react-icons/sl";

//Components
import firebase from "./firebase";
// import BadWordsFilter from "bad-words";
import TripForm from "./Components/TripForm";
import AllTrips from "./Components/AllTrips";
import ErrorPage from "./Components/ErrorPage";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";

// Assets
import "./sass/App.scss";

function App() {
  useEffect(() => {
    document.title = "Safe Travels";
  }, []);

  // const Filter = require("bad-words");
  // const langFilter = new Filter();

  const [trips, setTrips] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
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

  useEffect(() => {
    // create a variable that holds our database details
    const database = getDatabase(firebase);
    // create a variable that makes a reference to that database
    const postListRef = ref(database, "posts");
    // get database info on load or on change
    onValue(postListRef, (response) => {
      // use firebase's .val() to parse our database info into the formal we need
      const data = response.val();
      // create an empty array (cannot push to state, must use setState)
      const newState = [];
      // data is an object, so we iterate through it using a for in loop to access each book name
      for (let key in data) {
        // inside loop, we push each book name into the empty array
        newState.push({ key: key, tripInfo: data[key] });
      }
      // set state to match no-longer-empty array
      setTrips(newState);
    });
  }, []);

  const [countryData, setCountryData] = useState([]);

  // hook into initial/first render of app to fetch puppy photos
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCountryData(data.data);
      });
  }, []);

  const [bgQuery, setBgQuery] = useState("beautiful");
  const [background, setBackground] = useState("");

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

        const bestPic = response.results.reduce((prev, cur) => {
          return prev.likes > cur.likes ? prev : cur;
        });

        setBackground(bestPic.urls.full);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [bgQuery]);

  const [searchValue, setSearchValue] = useState({
    citySearch: "",
    countrySearch: "",
  });

  useEffect(() => {
    if (searchValue.countrySearch) {
      setBgQuery(searchValue.countrySearch);
    }
  }, [searchValue.countrySearch]);

  const bodyStyles = {
    backgroundImage: "url(" + background + ")",
    height: useLocation().pathname === "/" ? "100vh" : undefined,
  };

  return (
    <div className="body" style={bodyStyles}>
      <header id="header">
        {useLocation().pathname === "/" ? undefined : (
          <>
            <h1>
              Safe Travels
              <BiWorld className="icon" />
            </h1>
            <NavBar />
          </>
        )}
      </header>

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
        <Route path="*" element={ErrorPage} />
      </Routes>

      <footer>
        <p>Made with 💖 by Haley Tibbitts</p>
      </footer>
    </div>
  );
}

export default App;

// ** Intro Component **
// Prompt users to fill out information about themselves to be stored as a firebase object (userInfo)
// Create state items to watch for and capture user inputs.
// On submit, page re-renders to display home page component (useEffect).
// If user has already done this step, app will bypass this component

// ** Home Page Component **
// Display user information stored in firebase object
// Create state items for two button options: log a new trip, or view trip history.
// Re-render page based on user's choice (useEffect).

// ** New Trip Component **
// Prompt users to fill out information about their trip to be stored inside of firebase object (tripsLogged).
// Create state items to watch for and capture user inputs.
// On submit, store new trip information in trip history firebase object (tripsLogged), re-render page to display trip history (useEffect).

// ** Trip History Component **
// Users will have access to their trip history by having firebase object (tripsLogged) displayed on page.

// All pages with have access to a navigation that allows you to jump back to the home page (useEffect).

// STRETCH GOALS:
// Create a component to see other people's trip logs with search functionality.
// Implement achievement system that unlocks a badge every time you log a new country.
