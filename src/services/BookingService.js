import api from "./api";

const createBooking = (booking) => {
  return api.post(
    "/api/public/bookings",
    booking
  );
};

const getBookingsByUser = (userId) => {
return api.get(
`/api/public/bookings/user/${userId}`
);
};

const getBookingById = (bookingId) => {
  return api.get(`/bookings/${bookingId}`);
};
const cancelBooking = (bookingId) => {
  return api.delete(`/bookings/${bookingId}`);
};

export default {
  createBooking,
  getBookingsByUser,
  getBookingById,
  cancelBooking
};
