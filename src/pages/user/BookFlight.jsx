import { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import BookingService from "../../services/BookingService";
import ScheduleService from "../../services/ScheduleService";

import { toast } from "react-toastify";

function BookFlight() {

  const navigate = useNavigate();


  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const { scheduleId } = useParams();

  const [schedule, setSchedule] =
    useState(null);

  const [numberOfSeats,
    setNumberOfSeats] =
    useState(1);

  useEffect(() => {

    loadSchedule();

  }, []);

  const loadSchedule = async () => {

    try {

      const response =
        await ScheduleService.getScheduleById(
          scheduleId
        );

      setSchedule(
        response.data
      );

    } catch (error) {

      toast.error(
        "Unable to load schedule"
      );

    }

  };

  const saveBooking = async () => {

    if (!numberOfSeats) {

      toast.error(
        "Please select number of seats"
      );

      return;

    }

    if (Number(numberOfSeats) <= 0) {

      toast.error(
        "Number of seats must be greater than 0"
      );

      return;

    }

    if (
      schedule &&
      Number(numberOfSeats) >
        schedule.availableSeats
    ) {

      toast.error(
        "Not enough seats available"
      );

      return;

    }

    try {

      const booking = {

        userId:
          user.userId,

        scheduleId:
          Number(scheduleId),

        numberOfSeats:
          Number(numberOfSeats)

      };

      await BookingService.createBooking(
        booking
      );

      toast.success(
        "Booking Confirmed Successfully"
      );

      setTimeout(() => {
navigate("/flights");
}, 1500);

      setNumberOfSeats(1);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  if (!schedule) {

    return (
      <>
        <Navbar />

        <div className="container mt-4">

          <div className="alert alert-info">
            Loading Schedule...
          </div>

        </div>
      </>
    );

  }

  const totalFare =
    schedule.price *
    Number(numberOfSeats);

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <div className="row justify-content-center">

          <div className="col-md-6">

            <div className="card shadow">

              <div className="card-body">

                <h2 className="text-center mb-4">
                  Confirm Booking
                </h2>

                <hr />

                <p>
                  <strong>Passenger:</strong>{" "}
                  {user.userName}
                </p>

                <p>
                  <strong>Schedule ID:</strong>{" "}
                  {schedule.scheduleId}
                </p>

                <p>
                  <strong>Route:</strong>{" "}
                  {schedule.source}
                  {" → "}
                  {schedule.destination}
                </p>

                <p>
                  <strong>Departure Date:</strong>{" "}
                  {schedule.departureDate}
                </p>

                <p>
                  <strong>Price Per Seat:</strong>{" "}
                  ₹{schedule.price}
                </p>

                <p>
                  <strong>Available Seats:</strong>{" "}
                  {schedule.availableSeats}
                </p>

                <hr />

                <div className="mb-3">

                  <label className="form-label">
                    Number Of Seats
                  </label>

                  <input
                    type="number"
                    min="1"
                    max={
                      schedule.availableSeats
                    }
                    className="form-control"
                    value={numberOfSeats}
                    onChange={(e) =>
                      setNumberOfSeats(
                        Number(
                          e.target.value
                        )
                      )
                    }
                  />

                </div>

                <div className="alert alert-success">

                  <h5 className="mb-0">

                    Total Fare :
                    ₹{totalFare}

                  </h5>

                </div>

                <button
                  className="btn btn-success w-100"
                  onClick={saveBooking}
                >
                  Confirm Booking
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </>
  );
}

export default BookFlight;