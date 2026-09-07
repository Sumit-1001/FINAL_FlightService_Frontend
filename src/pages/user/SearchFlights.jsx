import { useState } from "react";
import Navbar from "../../components/Navbar";
import FlightService from "../../services/FlightService";
import { handleError } from "../../utils/HandleError";
import { toast } from "react-toastify";

function SearchFlights() {

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [flights, setFlights] = useState([]);

  const locations = [
    "DELHI",
    "MUMBAI",
    "BANGALORE",
    "CHENNAI",
    "DUBAI",
    "QATAR",
    "USA",
    "RUSSIA",
    "CHINA",
    "SINGAPORE",
    "MALDIVES",
    "ANDAMAN_AND_NICOBAR_ISLAND"
  ];

  const searchFlights = async () => {

    try {

      const response =
        await FlightService.searchFlights(
          source,
          destination
        );

      setFlights(response.data);

    } catch(error){

  toast.error(
    error.response?.data?.message
    || "Something went wrong"
  );

}

  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <div className="card shadow mb-4">

          <div className="card-body">

            <h2 className="mb-4">
              Search Flights
            </h2>

            <div className="mb-3">

              <label className="form-label">
                Source
              </label>

              <select
                id="source"
                name="source"
                className="form-select"
                value={source}
                onChange={(e) =>
                  setSource(e.target.value)
                }
              >
                <option value="">
                  Select Source
                </option>

                {locations.map((location) => (

                  <option
                    key={location}
                    value={location}
                  >
                    {location}
                  </option>

                ))}

              </select>

            </div>

            <div className="mb-3">

              <label className="form-label">
                Destination
              </label>

              <select
                id="destination"
                name="destination"
                className="form-select"
                value={destination}
                onChange={(e) =>
                  setDestination(
                    e.target.value
                  )
                }
              >
                <option value="">
                  Select Destination
                </option>

                {locations.map((location) => (

                  <option
                    key={location}
                    value={location}
                  >
                    {location}
                  </option>

                ))}

              </select>

            </div>

            <button
              className="btn btn-success"
              onClick={searchFlights}
            >
              Search Flights
            </button>

          </div>

        </div>

        {flights.length > 0 && (

          <>
            <h3 className="mb-3">
              Available Flights
            </h3>

            {flights.map((flight) => (

              <div
                key={flight.flightId}
                className="card shadow-sm mb-3"
              >

                <div className="card-body">

                  <h5 className="card-title">
                    {flight.flightNumber}
                  </h5>

                  <p>
                    <strong>Flight ID:</strong>{" "}
                    {flight.flightId}
                  </p>

                  <p>
                    <strong>Airline:</strong>{" "}
                    {flight.airline}
                  </p>

                  <p>
                    <strong>Source:</strong>{" "}
                    {flight.source}
                  </p>

                  <p>
                    <strong>Destination:</strong>{" "}
                    {flight.destination}
                  </p>

                  <p>
                    <strong>Total Seats:</strong>{" "}
                    {flight.totalSeats}
                  </p>

                </div>

              </div>

            ))}
          </>

        )}

      </div>

    </>
  );
}

export default SearchFlights;