import api from "./api";

const getScheduleById = (id) => {
  return api.get(
    `/api/public/schedules/${id}`
  );
};

const getAllSchedules = () => {
  return api.get(
    "/admin2/schedules"
  );
};

const addSchedule = (schedule) => {
  return api.post(
    "/admin2/schedules/addschedules",
    schedule
  );
};

const updateSchedule = (id, schedule) => {
  return api.put(
    `/admin2/schedules/${id}`,
    schedule
  );
};

const deleteSchedule = (id) => {
  return api.delete(
    `/admin2/schedules/${id}`
  );
};


const getSchedulesByFlightId = (
flightId
) => {
return api.get(
`/admin2/schedules/flight/${flightId}`
);
};

export default {
  getScheduleById,
  getAllSchedules,
  addSchedule,
  updateSchedule,
  getSchedulesByFlightId,
  deleteSchedule
};