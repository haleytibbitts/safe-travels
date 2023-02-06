import { Link } from "react-router-dom";

const MyTrips = ({ currentUID, trips }) => {
  return (
    <section>
      <h3>My Trips</h3>
      <Link to="/newTrip">Log a Trip</Link>

      {trips.map((trip) => {
        if (trip.tripInfo.userId === currentUID) {
          return (
            <div key={trip.key}>
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
              <p>
                Safety Rating:{" "}
                {trip.tripInfo.safetyRating ? trip.tripInfo.safetyRating : "0"}
              </p>
              <p>Highlights: {trip.tripInfo.faves}</p>
              <p>Advice: {trip.tripInfo.advice}</p>
            </div>
          );
        }
      })}
    </section>
  );
};

export default MyTrips;
