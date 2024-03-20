import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Admin from "./components/admin/Admin";
import { AuthProvider } from "./components/auth/AuthProvider";
import Login from "./components/auth/Login";
import Profile from "./components/auth/Profile";
import Registration from "./components/auth/Registration";
import RequireAuth from "./components/auth/RequireAuth";
import BookingSuccess from "./components/booking/BookingSuccess";
import Bookings from "./components/booking/Bookings";
import CheckOut from "./components/booking/CheckOut";
import FindBooking from "./components/booking/FindBooking";
import Home from "./components/home/Home";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/NavBar";
import AddRoom from "./components/room/AddRoom";
import EditRoom from "./components/room/EditRoom";
import ExistingRooms from "./components/room/ExistingRooms";
import RoomListing from "./components/room/RoomListing";
import EditUser from "./components/user/EditUser";
import ExistingUsers from "./components/user/ExistingUsers";
import "/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";


function App() {
  return (
    <AuthProvider>
      <main>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/add-room" element={<AddRoom/>} />
            <Route path="/edit-room/:roomId" element={<EditRoom />} />
            <Route path="/book-room/:roomId" element={
              <RequireAuth>
								<CheckOut />
							</RequireAuth>} />
            <Route path="/existing-rooms" element={<ExistingRooms />} />
            <Route path="/browse-all-rooms" element={<RoomListing/>} />
            <Route path="/admin" element={<Admin/>} />
            <Route path="/booking-success" element={<BookingSuccess/>} />
            <Route path="/existing-bookings" element={<Bookings/>} />
            <Route path="/find-bookings" element={<FindBooking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/existing-users" element={<ExistingUsers/>} />
            <Route path="/user/edit/:userId" element={<EditUser />} />
          </Routes>
          <Footer/>
        </Router>
        
        
      </main>
    </AuthProvider>
  )
}

export default App;