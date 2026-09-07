import api from "./api";

const checkSeats = (id) => {
  return api.get(
    `/admin2/schedules/seats/${id}`
  );
};

const addSeats = (id, count) => {
  return api.put(
    `/admin2/schedules/seats/add/${id}/${count}`
  );
};

const reduceSeats = (id, count) => {
  return api.put(
    `/admin2/schedules/seats/reduce/${id}/${count}`
  );
};

export default {
  checkSeats,
  addSeats,
  reduceSeats
};