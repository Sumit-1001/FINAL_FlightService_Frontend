import {  Routes, Route } from "react-router-dom";
import Home from "./pages/user/Home";
import RegisterUser from "./pages/user/RegisterUser";
import ViewFlights from "./pages/user/ViewFlights";
import FlightDetails from "./pages/user/FlightDetails";
import SearchFlights from "./pages/user/SearchFlights";
import ViewSchedule from "./pages/user/ViewSchedule";
import BookFlight from "./pages/user/BookFlight";
import MyBookings from "./pages/user/MyBookings";
import BookingDetails from "./pages/user/BookingDetails";
import PrivateRoute from "./components/PrivateRoute";
import UserLogin from "./pages/user/UserLogin";





//ADMIN
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import ManageFlights from "./pages/admin/ManageFlights";


//ADMIN
import ManageSchedules from "./pages/admin/ManageSchedules";
import ManageSeats from "./pages/admin/ManageSeats";

import NotFound from "./pages/NotFound";
import UserPrivateRoute from "./components/UserPrivateRoute";



function RoutesConfig() {
  return (
    
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
  path="/register"
  element={<RegisterUser />}
      />
    
    <Route
  path="/flights"
  
  element={
  <UserPrivateRoute>
    <ViewFlights />
    </UserPrivateRoute>
  }
     />

     <Route
  path="/flights/:id"
  element={
  <UserPrivateRoute>
    <FlightDetails />
  </UserPrivateRoute>}
     />

    <Route
  path="/search"
  element={<SearchFlights />}
     />

     <Route
  path="/schedule/:id"
  element={<ViewSchedule />}
     />

     <Route
  path="/book"
  element={<UserPrivateRoute>
  <BookFlight />
  </UserPrivateRoute>}
     />

     <Route
  path="/mybookings"
  element={<UserPrivateRoute>
  <MyBookings />
</UserPrivateRoute>}
      />

      <Route
  path="/booking"
  element={<  UserPrivateRoute>
  <BookingDetails />
</UserPrivateRoute>}
     />
     

     <Route
  path="/user/login"
  element={<UserLogin />}
      />


     {/* ADMIN */}

      <Route
  path="/admin/login"
  element={<AdminLogin />}
/>

<Route
  path="/admin/dashboard"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>}
 />  

 <Route
  path="/admin/flights"
  element={
    <PrivateRoute>
      <ManageFlights />
    </PrivateRoute>}
 />

{/* admin2 */}


 <Route
  path="/admin/schedules"
  element={
    <PrivateRoute>
      <ManageSchedules />
    </PrivateRoute>}
 />

 <Route
  path="/book/:scheduleId"
  element={<BookFlight />}
/>

 <Route
  path="/admin/seats"
  element={
    <PrivateRoute>
      <ManageSeats />
    </PrivateRoute>}
 />





<Route
  path="*"
  element={<NotFound />}
/>

    </Routes>
    
  );
}

export default RoutesConfig;