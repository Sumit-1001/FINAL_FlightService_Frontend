import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import Navbar from "../../components/Navbar";
import FlightService from "../../services/FlightService";
import BookingService from "../../services/BookingService";

function ViewFlights() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [activeTab, setActiveTab] =
    useState("flights");

  const [bookings, setBookings] =
    useState([]);

  const [flights, setFlights] =
    useState([]);

  const [source, setSource] =
    useState("");

  const [destination, setDestination] =
    useState("");

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

  useEffect(() => {

    loadFlights();
    loadBookings();

  }, []);

  const loadBookings = async () => {

    try {

      const response =
        await BookingService.getBookingsByUser(
          user.userId
        );

      setBookings(
        response.data
      );

    } catch (error) {

      toast.error(
error.response?.data?.message ||
"Something went wrong"
);

    }

  };

  const cancelBooking = async (
    bookingId
  ) => {

    if (
      !window.confirm(
        "Cancel Booking?"
      )
    ) {
      return;
    }

    try {

      await BookingService.cancelBooking(
        bookingId
      );

      toast.success(
        "Booking Cancelled Successfully"
      );

      loadBookings();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Unable to cancel booking"
      );

    }

  };

  const loadFlights = async () => {

    try {

      const response =
        await FlightService.getAllFlights();

      setFlights(
        response.data
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  const searchFlights = async () => {

    if (!source || !destination) {

      toast.error(
        "Select Source and Destination"
      );

      return;
    }

    try {

      const response =
        await FlightService.searchFlights(
          source,
          destination
        );

      setFlights(
        response.data
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  const downloadTicket = (booking) => {

  const doc = new jsPDF();

  doc.setFontSize(18);

  doc.text(
    "FLIGHT BOOKING TICKET",
    20,
    20
  );

  doc.setFontSize(12);

  doc.text(
    `Booking ID: ${booking.bookingId}`,
    20,
    40
  );

  doc.text(
    `Passenger: ${booking.userName}`,
    20,
    50
  );

  doc.text(
    `Schedule ID: ${booking.scheduleId}`,
    20,
    60
  );

  doc.text(
    `Seats Booked: ${booking.seatsBooked}`,
    20,
    70
  );

  doc.text(
    `Status: ${booking.bookingStatus}`,
    20,
    80
  );

  doc.text(
    `Booking Date: ${booking.bookingDate}`,
    20,
    90
  );

  doc.text(
    `Total Fare: Rs ${booking.totalFare}`,
    20,
    100
  );

  doc.save(
    `Ticket_${booking.bookingId}.pdf`
  );

};

  const resetFlights = () => {

    setSource("");
    setDestination("");

    loadFlights();

  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <div className="mb-4">

          <h2>
            Welcome, {user?.userName}
          </h2>

          <p className="text-muted">
            Search flights, book tickets and
            manage your bookings.
          </p>

          <div className="mt-3">

            <button
              className={`btn me-2 ${
                activeTab === "flights"
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() =>
                setActiveTab("flights")
              }
            >
              Flights
            </button>

            <button
              className={`btn ${
                activeTab === "bookings"
                  ? "btn-success"
                  : "btn-outline-success"
              }`}
              onClick={() =>
                setActiveTab("bookings")
              }
            >
              My Bookings ({bookings.length})
            </button>

          </div>

        </div>

        {activeTab === "flights" && (
          <>

            <div className="card shadow mb-4">

              <div className="card-body">

                <div className="row">

                  <div className="col-md-5">

                    <select
                      className="form-select"
                      value={source}
                      onChange={(e) =>
                        setSource(
                          e.target.value
                        )
                      }
                    >

                      <option value="">
                        Select Source
                      </option>

                      {locations.map((loc) => (

                        <option
                          key={loc}
                          value={loc}
                        >
                          {loc}
                        </option>

                      ))}

                    </select>

                  </div>

                  <div className="col-md-5">

                    <select
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

                      {locations.map((loc) => (

                        <option
                          key={loc}
                          value={loc}
                        >
                          {loc}
                        </option>

                      ))}

                    </select>

                  </div>

                  <div className="col-md-2">

                    <button
                      className="btn btn-primary w-100"
                      onClick={searchFlights}
                    >
                      Search
                    </button>

                  </div>

                </div>

                <button
                  className="btn btn-secondary mt-3"
                  onClick={resetFlights}
                >
                  Show All Flights
                </button>

              </div>

            </div>

            <h4 className="mb-3">
              Available Flights
            </h4>

            <div className="row">

              {flights.map((flight) => (

                <div
                  key={flight.flightId}
                  className="col-md-6 mb-4"
                >

                  <div className="card shadow h-100">

                    <div className="card-body">

                      <h5 className="card-title">
                        {flight.flightNumber}
                      </h5>

                      <p>
                        <strong>Airline:</strong>{" "}
                        {flight.airline}
                      </p>

                      <p>
                        <strong>Route:</strong>{" "}
                        {flight.source}
                        {" → "}
                        {flight.destination}
                      </p>

                      <p>
                        <strong>Total Seats:</strong>{" "}
                        {flight.totalSeats}
                      </p>

                      <Link
                        to={`/flights/${flight.flightId}`}
                        className="btn btn-primary"
                      >
                        More Info
                      </Link>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </>
        )}

        {activeTab === "bookings" && (

          <div>

            <h3 className="mb-4">
              My Bookings
            </h3>

            {bookings.length === 0 ? (

              <div className="alert alert-info">
                No Bookings Found
              </div>

            ) : (

              <div className="row">

                {bookings.map((booking) => (

                  <div
                    key={booking.bookingId}
                    className="col-md-6 mb-4"
                  >

                    <div className="card shadow-sm">

                      <div className="card-body">

                        <h5>
                          Booking #{booking.bookingId}
                        </h5>

                        <p>
                          <strong>User:</strong>{" "}
                          {booking.userName}
                        </p>

                        <p>
                          <strong>Schedule ID:</strong>{" "}
                          {booking.scheduleId}
                        </p>

                        <p>
                          <strong>Seats Booked:</strong>{" "}
                          {booking.seatsBooked}
                        </p>

                        <p>
                          <strong>Status:</strong>{" "}
                          <span className="badge bg-success">
                            {booking.bookingStatus}
                          </span>
                        </p>

                        <p>
                          <strong>Booking Date:</strong>{" "}
                          {booking.bookingDate}
                        </p>

                        <p>
  <strong>Total Fare:</strong>{" "}
  ₹{booking.totalFare}
</p>

<div className="mt-3">

  <button
    className="btn btn-primary btn-sm me-2"
    onClick={() =>
      downloadTicket(booking)
    }
  >
    Download Ticket
  </button>

  <button
    className="btn btn-danger btn-sm"
    onClick={() =>
      cancelBooking(
        booking.bookingId
      )
    }
  >
    Cancel Booking
  </button>

</div>



                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        )}

      </div>
    </>
  );
}

export default ViewFlights;