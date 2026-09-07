import { useState } from "react";
import Navbar from "../../components/Navbar";

import BookingService from "../../services/BookingService";
import { handleError } from "../../utils/HandleError";
import { toast } from "react-toastify";
import jsPDF from "jspdf";

function MyBookings() {

  const [userId, setUserId] = useState("");
  const [bookings, setBookings] = useState([]);

  const searchBookings = async () => {

  if (!userId) {
    toast.error("Please enter User ID");
    return;
  }

  if (userId <= 0) {
    toast.error("User ID must be greater than 0");
    return;
  }

  try {

    const response =
      await BookingService.getBookingsByUser(userId);

    setBookings(response.data);

    if (response.data.length === 0) {
      toast.info("No bookings found");
    }

  } catch (error) {

    setBookings([]);

    toast.error(
      error.response?.data?.message ||
      "Something went wrong"
    );
  }
};


// pdf

const downloadTicket = (booking) => {

  const doc = new jsPDF();

  doc.setFontSize(18);

  doc.text(
    "FLIGHT BOOKING TICKET",
    20,
    20
  );

  doc.line(
    20,
    25,
    180,
    25
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

  doc.line(
    20,
    115,
    180,
    115
  );

  doc.text(
    "Thank you for choosing our airline.",
    20,
    130
  );

  doc.text(
    "Please carry a valid ID proof.",
    20,
    140
  );

  doc.save(
    `Ticket_${booking.bookingId}.pdf`
  );

};


  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <div className="card shadow mb-4">

          <div className="card-body">

            <h2 className="mb-4">
              My Bookings
            </h2>

            <div className="row">

              <div className="col-md-8">

                <input
                  id="userId"
                  name="userId"
                  type="number"
                  min="1"
                  className="form-control"
                  placeholder="Enter User ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />

              </div>

              <div className="col-md-4">

                <button
                  className="btn btn-success w-100"
                  onClick={searchBookings}
                >
                  Search
                </button>

              </div>

            </div>

          </div>

        </div>

        <h3 className="mb-3">
          Booking List
        </h3>

        {bookings.length === 0 ? (

          <div className="alert alert-info">
            No bookings found
          </div>

        ) : (

          bookings.map((booking) => (

            <div
              key={booking.bookingId}
              className="card shadow-sm mb-3"
            >

              <div className="card-body">

                <h5 className="card-title">
                  Booking #{booking.bookingId}
                </h5>

                <p>
                  <strong>
                    User Name:
                  </strong>{" "}
                  {booking.userName}
                </p>

                <p>
                  <strong>
                    Schedule ID:
                  </strong>{" "}
                  {booking.scheduleId}
                </p>

                <p>
                  <strong>
                    Seats:
                  </strong>{" "}
                  {booking.seatsBooked}
                </p>

                <p>
                  <strong>
                    Status:
                  </strong>{" "}
                  {booking.bookingStatus}
                </p>

                <p>
                  <strong>
                    Booking Date:
                  </strong>{" "}
                  {booking.bookingDate}
                </p>

                <p>
                  <strong>
                    Total Fare:
                  </strong>{" "}
                  ₹{booking.totalFare}
                </p>

                 {/* comments:- download ticket invoice button */}



              </div>

            </div>

          ))

        )}

      </div>
    </>
  );
}

export default MyBookings;
