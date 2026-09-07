import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import FlightService from "../../services/FlightService";
import ScheduleService from "../../services/ScheduleService";

import { toast } from "react-toastify";

function FlightDetails() {

  const { id } = useParams();

  const [flight, setFlight] = useState(null);

  const [schedules, setSchedules] =
    useState([]);

  useEffect(() => {

    loadFlight();
    loadSchedules();

  }, []);

  const loadFlight = async () => {

    try {

      const response =
        await FlightService.getFlightById(
          id
        );

      setFlight(
        response.data
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Unable to load flight"
      );

    }

  };

  const loadSchedules = async () => {

    try {

      const response =
        await ScheduleService
          .getSchedulesByFlightId(id);

      console.log(
        "Schedules:",
        response.data
      );

      setSchedules(
        response.data
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Unable to load schedules"
      );

    }

  };

  if (!flight) {

    return (
      <>
        <Navbar />

        <div className="container mt-4">

          <div className="alert alert-info">

            Loading Flight Details...

          </div>

        </div>

      </>
    );

  }

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        {/* Flight Details */}

        <div className="card shadow">

          <div className="card-body">

            <h2 className="mb-4">
              Flight Details
            </h2>

            <p>
              <strong>Flight ID:</strong>{" "}
              {flight.flightId}
            </p>

            <p>
              <strong>Flight Number:</strong>{" "}
              {flight.flightNumber}
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

        {/* Schedules */}

        <div className="card shadow mt-4">

          <div className="card-body">

            <h3 className="mb-3">
              Available Schedules
            </h3>

            {schedules.length === 0 ? (

              <div className="alert alert-warning">

                No schedules available
                for this flight.

              </div>

            ) : (

              schedules.map((schedule) => (

                <div
                  key={schedule.scheduleId}
                  className="card mb-3"
                >

                  <div className="card-body">

                    <p>
                      <strong>
                        Schedule ID:
                      </strong>{" "}
                      {schedule.scheduleId}
                    </p>

                    <p>
                      <strong>
                        Date:
                      </strong>{" "}
                      {schedule.departureDate}
                    </p>

                    <p>
                      <strong>
                        Departure:
                      </strong>{" "}
                      {schedule.departureTime}
                    </p>

                    <p>
                      <strong>
                        Arrival:
                      </strong>{" "}
                      {schedule.arrivalTime}
                    </p>

                    <p>
                      <strong>
                        Available Seats:
                      </strong>{" "}
                      {schedule.availableSeats}
                    </p>

                    <p>
                      <strong>
                        Price:
                      </strong>{" "}
                      ₹{schedule.price}
                    </p>

                    <Link
                      to={`/book/${schedule.scheduleId}`}
                      className="btn btn-success"
                    >
                      Book Now
                    </Link>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </div>
    </>
  );
}

export default FlightDetails;