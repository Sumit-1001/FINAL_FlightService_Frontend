import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";

import FlightService from "../../services/FlightService";
import ScheduleService from "../../services/ScheduleService";

import { toast } from "react-toastify";

function Dashboard() {

  const [totalFlights, setTotalFlights] =
    useState(0);

  const [totalSchedules, setTotalSchedules] =
    useState(0);

  const [totalSeats, setTotalSeats] =
    useState(0);

  useEffect(() => {

    loadDashboardData();

  }, []);

  const loadDashboardData = async () => {

    try {

      const flightResponse =
        await FlightService.getAllFlights();

      setTotalFlights(
        flightResponse.data.length
      );

      const scheduleResponse =
        await ScheduleService.getAllSchedules();

      setTotalSchedules(
        scheduleResponse.data.length
      );

      let seats = 0;

      scheduleResponse.data.forEach(
        (schedule) => {

          seats +=
            schedule.availableSeats;

        }
      );

      setTotalSeats(seats);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        {/* Heading */}

        <div className="text-center mb-4">

          <h1 className="fw-bold">
            Flight Booking Admin Dashboard
          </h1>

          <p className="text-muted">
            Manage Flights, Schedules and Seats
          </p>

        </div>

        {/* Welcome */}

        <div className="alert alert-primary">

          <h5>
            Welcome Administrator
          </h5>

          <p className="mb-0">
            Monitor and manage the Flight
            Booking System from a single
            dashboard.
          </p>

        </div>

        {/* Statistics */}

        <div className="row mt-4">

          <div className="col-md-4 mb-3">

            <div className="card shadow">

              <div className="card-body text-center">

                <h5>
                  Total Flights
                </h5>

                <h1 className="text-primary">
                  {totalFlights}
                </h1>

              </div>

            </div>

          </div>

          <div className="col-md-4 mb-3">

            <div className="card shadow">

              <div className="card-body text-center">

                <h5>
                  Total Schedules
                </h5>

                <h1 className="text-success">
                  {totalSchedules}
                </h1>

              </div>

            </div>

          </div>

          <div className="col-md-4 mb-3">

            <div className="card shadow">

              <div className="card-body text-center">

                <h5>
                  Available Seats
                </h5>

                <h1 className="text-warning">
                  {totalSeats}
                </h1>

              </div>

            </div>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="card shadow mt-4">

          <div className="card-body">

            <h4 className="mb-3">
              Quick Actions
            </h4>

            <div className="row">

              <div className="col-md-4 mb-2">

                <Link
                  to="/admin/flights"
                  className="btn btn-primary w-100"
                >
                  Manage Flights
                </Link>

              </div>

              <div className="col-md-4 mb-2">

                <Link
                  to="/admin/schedules"
                  className="btn btn-success w-100"
                >
                  Manage Schedules
                </Link>

              </div>

              <div className="col-md-4 mb-2">

                <Link
                  to="/admin/seats"
                  className="btn btn-warning w-100"
                >
                  Manage Seats
                </Link>

              </div>

            </div>

          </div>

        </div>

        {/* Summary */}

        <div className="card shadow mt-4">

          <div className="card-body">

            <h4>
              System Summary
            </h4>

            <hr />

            <p>
              <strong>
                Total Flights:
              </strong>{" "}
              {totalFlights}
            </p>

            <p>
              <strong>
                Total Schedules:
              </strong>{" "}
              {totalSchedules}
            </p>

            <p>
              <strong>
                Available Seats:
              </strong>{" "}
              {totalSeats}
            </p>

            <p>
              <strong>
                Status:
              </strong>

              <span className="badge bg-success ms-2">
                Online
              </span>

            </p>

            <p>
              <strong>
                Admin:
              </strong>

              <span className="ms-2">
                System Administrator
              </span>

            </p>

          </div>

        </div>

        {/* Refresh */}

        <div className="mt-3">

          <button
            className="btn btn-secondary"
            onClick={loadDashboardData}
          >
            Refresh Dashboard
          </button>

        </div>

      </div>
    </>
  );
}

export default Dashboard;