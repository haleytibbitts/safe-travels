import { useEffect, useState } from "react";
import { onValue, ref, getDatabase } from "firebase/database";
import AnimatedPage from "./AnimatedPage";
import firebase from "../firebase";

const AllTrips = ({
  trips,
  setTrips,
  countryData,
  searchValue,
  setSearchValue,
}) => {
  const [filteredTrips, setFilteredTrips] = useState([]);

  const handleSearchChange = (e) => {
    if (
      searchValue.citySearch &&
      searchValue.countrySearch &&
      e.target.id === "countrySearch"
    ) {
      setSearchValue({
        citySearch: "",
        countrySearch: e.target.value,
      });
    } else {
      setSearchValue({
        ...searchValue,
        [e.target.id]: e.target.value,
      });
    }
  };

  useEffect(() => {
    if (searchValue.citySearch && searchValue.countrySearch) {
      const cityData = trips.filter((trip) => {
        return trip.tripInfo.city.includes(searchValue.citySearch);
      });

      const newData = cityData.filter((trip) => {
        return trip.tripInfo.country.includes(searchValue.countrySearch);
      });

      setFilteredTrips(newData);
    } else if (searchValue.citySearch && !searchValue.countrySearch) {
      const newData = trips.filter((trip) => {
        return trip.tripInfo.city.includes(searchValue.citySearch);
      });

      setFilteredTrips(newData);
    } else if (!searchValue.citySearch && searchValue.countrySearch) {
      const newData = trips.filter((trip) => {
        return trip.tripInfo.country.includes(searchValue.countrySearch);
      });

      setFilteredTrips(newData);
    } else {
      setFilteredTrips([]);
    }
  }, [searchValue, trips]);

  return (
    <AnimatedPage>
      <section className="all-trips">
        <form>
          <div className="input-container">
            <label htmlFor="countrySearch">Country:</label>
            <select id="countrySearch" onChange={handleSearchChange}>
              <option value="">Select:</option>
              {countryData.length
                ? countryData.map((container, indexNumber) => {
                    return (
                      <option
                        key={indexNumber + container.country}
                        value={container.country}
                      >
                        {container.country}
                      </option>
                    );
                  })
                : undefined}
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="citySearch">City:</label>
            <select id="citySearch" onChange={handleSearchChange}>
              <option value="">Select:</option>
              {countryData.length
                ? countryData.map((container) => {
                    if (container.country === searchValue.countrySearch) {
                      return container.cities.map((city) => {
                        return (
                          <option
                            key={city + searchValue.countrySearch}
                            value={city}
                          >
                            {city}
                          </option>
                        );
                      });
                    }
                  })
                : undefined}
            </select>
          </div>
        </form>
        <div className="trips">
          {(filteredTrips.length ? filteredTrips : trips)
            .slice(0)
            .reverse()
            .map((trip) => {
              return (
                <>
                  <div key={trip.key} className="trip-container">
                    <h3>
                      {trip.tripInfo.city}, {trip.tripInfo.country}
                    </h3>
                    <h4>
                      Logged by {trip.tripInfo.name} ({trip.tripInfo.pronouns})
                    </h4>
                    <h5>
                      {trip.tripInfo.age} | {trip.tripInfo.gender} |{" "}
                      {trip.tripInfo.sexuality} | {trip.tripInfo.ethnicity} |{" "}
                      {trip.tripInfo.partnered ? "Partnered" : "Non-Partnered"}
                    </h5>
                    <h6>
                      {trip.tripInfo.arrivalDate} to {trip.tripInfo.returnDate}
                    </h6>
                    <div className="safetyRating">
                      <p>Safety Rating: </p>
                      <p
                        className={
                          trip.tripInfo.safetyRating === "1"
                            ? "one"
                            : trip.tripInfo.safetyRating === "2"
                            ? "two"
                            : trip.tripInfo.safetyRating === "3"
                            ? "three"
                            : trip.tripInfo.safetyRating === "4"
                            ? "four"
                            : trip.tripInfo.safetyRating === "5"
                            ? "five"
                            : "zero"
                        }
                      >
                        {trip.tripInfo.safetyRating
                          ? trip.tripInfo.safetyRating
                          : "0"}
                      </p>
                    </div>
                    <p>Highlights: {trip.tripInfo.faves}</p>
                    <p>Advice: {trip.tripInfo.advice}</p>
                  </div>
                </>
              );
            })}
        </div>
      </section>
    </AnimatedPage>
  );
};

export default AllTrips;
