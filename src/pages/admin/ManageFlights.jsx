import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import FlightService from "../../services/FlightService";
import { handleError } from "../../utils/HandleError";
import { toast } from "react-toastify";


function ManageFlights() {

  const [flights, setFlights] = useState([]);

  const [flightId, setFlightId] = useState(null);

  const [flightNumber, setFlightNumber] =
    useState("");

  const [airline, setAirline] =
    useState("QATAR_AIRWAYS");

  const [source, setSource] =
    useState("DELHI");

  const [destination, setDestination] =
    useState("USA");

  const [totalSeats, setTotalSeats] =
    useState("");

  const [isEdit, setIsEdit] =
    useState(false);

  const [loading, setLoading] =
  useState(false);

  const [searchTerm, setSearchTerm] =
  useState("");

  

  const airlines = [
    "QATAR_AIRWAYS",
    "AIR_INDIA",
    "SINGAPORE_AIRLINES",
    "SPICEJET",
    "INDIGO"
  ];

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
  }, []);

  const loadFlights = async () => {

  try {

    setLoading(true);

    const response =
      await FlightService.getAllFlights();

    setFlights(response.data);

  } catch (error) {

    handleError(error);

  } finally {

    setLoading(false);

  }
};


  const validateFlight = () => {

  if (!flightNumber.trim()) {
    toast.error("Flight Number is required");
    return false;
  }

  if (flightNumber.trim().length < 3) {
    toast.error("Flight Number must contain at least 3 characters");
    return false;
  }

  if (!totalSeats) {
    toast.error("Total Seats is required");
    return false;
  }

  if (totalSeats <= 0) {
    toast.error("Total Seats must be greater than 0");
    return false;
  }

  if (source === destination) {
    toast.error("Source and Destination cannot be same");
    return false;
  }

  return true;
};

  const clearForm = () => {

    setIsEdit(false);

    setFlightId(null);

    setFlightNumber("");

    setAirline("QATAR_AIRWAYS");

    setSource("DELHI");

    setDestination("USA");

    setTotalSeats("");
  };
  
const saveFlight = async () => {

  if (!validateFlight()) {
    return;
  }

  try {

    const flight = {
      flightId: 0,
      flightNumber,
      airline,
      source,
      destination,
      totalSeats: Number(totalSeats)
    };

    const response= await FlightService.addFlight(flight);

    setFlights((prev)=>[
      ...prev,response.data
    ])

    toast.success("Flight Added Successfully");

    // loadFlights();
    clearForm();

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Something went wrong"
    );
  }
};
 const updateFlight = async () => {

  if (!validateFlight()) {
    return;
  }

  try {

    const updatedFlight = {
      flightId,
      flightNumber,
      airline,
      source,
      destination,
      totalSeats: Number(totalSeats)
    };

    const response= await FlightService.updateFlight(
      flightId,
      updatedFlight
    );

    setFlights((prev) =>
  prev.map((item) =>
    item.flightId === flightId
      ? response.data
      : item
  )
);
    toast.success("Flight Updated Successfully");

    // loadFlights();
    clearForm();

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Something went wrong"
    );
  }
};


  const deleteFlight = async (id) => {

    const result = window.confirm(
      "Delete Flight?"
    );

   

    if (!result) {
      return;
    }

    try {

      await FlightService.deleteFlight(id);

      toast.success(
        "Flight Deleted Successfully"
      );

      setFlights((prev)=>
      prev.filter((flight)=> flight.flightId!==id)
    );

      // loadFlights();

    } catch(error){

  toast.error(
    error.response?.data?.message
    || "Something went wrong"
  );



}
  };



  if (loading) {

  return (

    <>
      <Navbar />

      <div className="container mt-5 text-center">

        <div
          className="spinner-border text-primary"
          role="status"
        >
        </div>

        <p className="mt-3">
          Loading Flights...
        </p>

      </div>
    </>

  );
}

const filteredFlights =
  flights.filter((flight) =>

    flight.flightNumber
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    ||

    flight.airline
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    ||

    flight.source
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    ||

    flight.destination
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="mb-4">
          Manage Flights
        </h2>

        <div className="card shadow mb-4">

          <div className="card-body">
            



            <h4 className="mb-3">

              {isEdit
                ? "Update Flight"
                : "Add Flight"}

            </h4>
            <input
              className="form-control mb-3"
              placeholder="Flight Number"
              maxLength="20"
              value={flightNumber}
              onChange={(e) =>
                setFlightNumber(e.target.value)
              }
            />

            <select
              className="form-select mb-3"
              value={airline}
              onChange={(e) =>
                setAirline(
                  e.target.value
                )
              }
            >
              {airlines.map((air) => (

                <option
                  key={air}
                  value={air}
                >
                  {air}
                </option>

              ))}
            </select>

            <select
              className="form-select mb-3"
              value={source}
              onChange={(e) =>
                setSource(
                  e.target.value
                )
              }
            >
              {locations.map((loc) => (

                <option
                  key={loc}
                  value={loc}
                >
                  {loc}
                </option>

              ))}
            </select>

            <select
              className="form-select mb-3"
              value={destination}
              onChange={(e) =>
                setDestination(
                  e.target.value
                )
              }
            >
              {locations.map((loc) => (

                <option
                  key={loc}
                  value={loc}
                >
                  {loc}
                </option>

              ))}
            </select>

            <input
              type="number"
              min="1"
              className="form-control mb-3"
              placeholder="Total Seats"
              value={totalSeats}
              onChange={(e) =>
                setTotalSeats(e.target.value)
              }
            />

            {isEdit ? (
              <>
                <button
                  className="btn btn-warning"
                  onClick={updateFlight}
                >
                  Update Flight
                </button>

                <button
                  className="btn btn-secondary ms-2"
                  onClick={clearForm}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary"
                onClick={saveFlight}
              >
                Add Flight
              </button>
            )}

          </div>

        </div>

            <input
  type="text"
  className="form-control mb-3"
 placeholder="Search by Flight Number, Airline, Source or Destination"
  value={searchTerm}
  onChange={(e) =>
    setSearchTerm(
      e.target.value
    )
  }
/>

<p className="text-muted">
  Total Flights: {filteredFlights.length}
</p>

        <h4 className="mb-3">
          All Flights
        </h4>

<p className="text-muted">
  Total Flights : {filteredFlights.length}
</p>

<h4 className="mb-3">
  All Flights
</h4>

{filteredFlights.length === 0 ? (

  <div className="alert alert-warning">
    No Flights Found
  </div>

) : (

  filteredFlights.map((flight) => (

    <div
      key={flight.flightId}
      className="card shadow-sm mb-3"
    >

      <div className="card-body">

        <h5 className="card-title">
          {flight.flightNumber}
        </h5>

        <p>
          <strong>ID:</strong>{" "}
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

        <button
          className="btn btn-warning me-2"
          onClick={() => {

            setIsEdit(true);

            setFlightId(
              flight.flightId
            );

            setFlightNumber(
              flight.flightNumber
            );

            setAirline(
              flight.airline
            );

            setSource(
              flight.source
            );

            setDestination(
              flight.destination
            );

            setTotalSeats(
              flight.totalSeats
            );

          }}
        >
          Update
        </button>

        <button
          className="btn btn-danger"
          onClick={() =>
            deleteFlight(
              flight.flightId
            )
          }
        >
          Delete
        </button>

      </div>

    </div>

  ))

)}
       </div>
    </>
  );
  

}
export default ManageFlights;