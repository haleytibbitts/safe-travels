import firebase from "./firebase";
import BadWordsFilter from "bad-words";
import TripForm from "./Components/TripForm";
import AllTrips from "./Components/AllTrips";
import { useState, useEffect } from "react";
import {
  getDatabase,
  push,
  ref,
  set,
  onChildAdded,
  onValue,
} from "firebase/database";
import "./App.css";

function App() {
  const Filter = require("bad-words");
  const langFilter = new Filter();

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
      [e.target.name]: langFilter.clean(e.target.value),
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
    setIsChecked(false);
  };

  useEffect(() => {
    // create a variable that holds our database details
    const database = getDatabase(firebase);
    // create a variable that makesa reference to that database
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

  return (
    <div>
      <header>
        <h1>Safe Travels</h1>
        <h2>An inclusive travel log for the 2SLGBTQIA+ community.</h2>
      </header>
      <TripForm
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        allValues={allValues}
      />
      <AllTrips trips={trips} />
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
