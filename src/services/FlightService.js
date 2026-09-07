import api from "./api";

const getAllFlights = () => {
  return api.get("/flights/allFlights");
};

const getFlightById = (id) => {
  return api.get(`/flights/${id}`);
};

const searchFlights = (source, destination) => {
  return api.get(
    `/flights/search/${source}/${destination}`
  );
};

const addFlight = (flight) => {
  return api.post(
    "/flights/addFlight",
    flight
  );
};

const deleteFlight = (id) => {
  return api.delete(
    `/flights/deleteFlight/${id}`
  );
};

const updateFlight = (flightId, flight) => {
  return api.put(
    `/flights/update/${flightId}`,
    flight
  );
};



export default {
  getAllFlights,
  getFlightById,
  searchFlights,
  addFlight,
  deleteFlight,
  updateFlight
};