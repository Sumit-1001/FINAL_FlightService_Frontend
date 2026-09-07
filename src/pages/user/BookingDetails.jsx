import { useState } from "react";
import Navbar from "../../components/Navbar";
import BookingService from "../../services/BookingService";
import { handleError } from "../../utils/HandleError";
import { toast } from "react-toastify";

function BookingDetails() {

  const [bookingId, setBookingId] = useState("");
  const [booking, setBooking] = useState(null);

const findBooking = async () => {

  if (!bookingId) {
    toast.error("Please enter Booking ID");
    return;
  }

  try {

    const response =
      await BookingService.getBookingById(
        bookingId
      );

    setBooking(response.data);

  } catch (error) {

    setBooking(null);

    toast.error(
      error.response?.data?.message ||
      "Something went wrong"
    );

  }
};

  const cancelBooking = async () => {

    const result = window.confirm(
      "Cancel Booking?"
    );

    if (!result) {
      return;
    }

    try {

      await BookingService.cancelBooking(
        booking.bookingId
      );

      toast.success(
        "Booking Cancelled Successfully"
      );

      setBooking(null);
      setBookingId("");

    } catch (error) {

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

            <h2 className="text-center mb-4">
              Booking Details
            </h2>

            <div className="row">

              <div className="col-md-8">

                <input
                  id="bookingId"
                  name="bookingId"
                  type="number"
                  min="1"
                  step="1"
                  className="form-control"
                  placeholder="Enter Booking ID"
                  value={bookingId}
                  onChange={(e) =>
                    setBookingId(e.target.value)
                  }
                />

              </div>

              <div className="col-md-4">

                <button
                  className="btn btn-success w-100"
                  onClick={findBooking}
                  disabled={!bookingId}
                >
                  Search
                </button>

              </div>

            </div>

          </div>

        </div>

        {booking && (

          <div className="card shadow">

            <div className="card-body">

              <h4 className="mb-3">
                Booking Information
              </h4>

              <p>
                <strong>
                  Booking ID:
                </strong>{" "}
                {booking.bookingId}
              </p>

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
                  Seats Booked:
                </strong>{" "}
                {booking.seatsBooked}
              </p>

              <p>
  <strong>Status:</strong>{" "}

  <span
    className={`badge ${
      booking.bookingStatus === "CONFIRMED"
        ? "bg-success"
        : "bg-danger"
    }`}
  >
    {booking.bookingStatus}
  </span>

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

              <button
                className="btn btn-danger mt-2"
                onClick={cancelBooking}
              >
                Cancel Booking
              </button>

            </div>

          </div>

        )}

      </div>
    </>
  );
}

export default BookingDetails;