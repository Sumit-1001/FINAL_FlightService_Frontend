import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import ScheduleService from "../../services/ScheduleService";

import { toast } from "react-toastify";

function ViewSchedule() {

  const { id } = useParams();

  const navigate =
    useNavigate();

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
        await ScheduleService
          .getScheduleById(id);

      setSchedule(
        response.data
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  const totalFare =
    schedule
      ? schedule.price *
        numberOfSeats
      : 0;

  const proceedToBooking = () => {

    if (
      numberOfSeats <= 0
    ) {

      toast.error(
        "Please select valid seats"
      );

      return;

    }

    if (
      numberOfSeats >
      schedule.availableSeats
    ) {

      toast.error(
        "Not enough seats available"
      );

      return;

    }

    navigate(
      `/book/${schedule.scheduleId}`,
      {
        state: {
          numberOfSeats
        }
      }
    );

  };

  if (!schedule) {

    return (
      <>
        <Navbar />

        <div className="container mt-4">

          <div className="alert alert-info">

            Loading Schedule Details...

          </div>

        </div>

      </>
    );

  }

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <div className="card shadow">

          <div className="card-body">

            <h2 className="mb-4">
              Schedule Details
            </h2>

            <p>
              <strong>Schedule ID:</strong>{" "}
              {schedule.scheduleId}
            </p>

            <p>
              <strong>Flight ID:</strong>{" "}
              {schedule.flightId}
            </p>

            <p>
              <strong>Source:</strong>{" "}
              {schedule.source}
            </p>

            <p>
              <strong>Destination:</strong>{" "}
              {schedule.destination}
            </p>

            <p>
              <strong>Departure Date:</strong>{" "}
              {schedule.departureDate}
            </p>

            <p>
              <strong>Departure Time:</strong>{" "}
              {schedule.departureTime}
            </p>

            <p>
              <strong>Arrival Time:</strong>{" "}
              {schedule.arrivalTime}
            </p>

            <p>
              <strong>Available Seats:</strong>{" "}
              {schedule.availableSeats}
            </p>

            <p>
              <strong>Price Per Seat:</strong>{" "}
              ₹{schedule.price}
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
                value={
                  numberOfSeats
                }
                onChange={(e) =>
                  setNumberOfSeats(
                    Number(
                      e.target.value
                    )
                  )
                }
              />

            </div>

            <h4 className="text-success mb-3">

              Total Fare :
              ₹{totalFare}

            </h4>

            <button
              className="btn btn-primary"
              onClick={
                proceedToBooking
              }
            >

              Proceed To Booking

            </button>

          </div>

        </div>

      </div>

    </>
  );
}

export default ViewSchedule;