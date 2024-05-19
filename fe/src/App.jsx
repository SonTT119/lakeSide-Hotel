import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Admin from "./components/admin/Admin";
import Dashboard from "./components/admin/Dashboard";
import { AuthProvider } from "./components/auth/AuthProvider";
import EditProfile from "./components/auth/EditProfile";
import ForgotPass from "./components/auth/ForgotPass";
import Login from "./components/auth/Login";
import Profile from "./components/auth/Profile";
import Registration from "./components/auth/Registration";
import UpdatePassword from "./components/auth/UpdatePassword";
import BookingHistory from "./components/booking/BookingHistory";
import BookingSuccess from "./components/booking/BookingSuccess";
import Bookings from "./components/booking/Bookings";
import CheckOut from "./components/booking/CheckOut";
import FindBooking from "./components/booking/FindBooking";
import Payment from "./components/booking/Payment";
import PaymentSuccess from "./components/booking/PaymentSucess";
import Home from "./components/home/Home";
import Navbar from "./components/layout/NavBar";
import EditReview from "./components/review/EditReview";
import ExistingReview from "./components/review/ExistingReview";
import AllRoles from "./components/role/AllRoles";
import AddRoom from "./components/room/AddRoom";
import EditRoom from "./components/room/EditRoom";
import ExistingRooms from "./components/room/ExistingRooms";
import RoomDetail from "./components/room/RoomDetail";
import RoomFavorites from "./components/room/RoomFavorites";
import RoomListing from "./components/room/RoomListing";
import AddUser from "./components/user/AddUser";
import EditUser from "./components/user/EditUser";
import ExistingUsers from "./components/user/ExistingUsers";
import "/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  return (
    <AuthProvider value={{ isLoggedIn, setIsLoggedIn }}>
      <main>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/add-room" element={<AddRoom/>} />
            <Route path="/edit-room/:roomId" element={<EditRoom />} />
            <Route path="/book-room/:roomId" element={
              
								<CheckOut />
                
            } />
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
            <Route path="/edit-profile" element={<EditProfile />} />
            {/* <Route path="star" element={<StarRate />} /> */}
            <Route path="/forgot-password" element={<ForgotPass/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/roomdetail/:roomId" element={<RoomDetail />} />
            <Route path="/favorites" element={<RoomFavorites/>} />
            <Route path="/existing-roles" element={<AllRoles/>} />
            <Route path="/add-Admin" element={<AddUser/>} />
            <Route path="/existing-review" element={<ExistingReview/>} />
            <Route path="/review/edit/:reviewId" element={<EditReview/>} />
            <Route path="/payment" element={<Payment/>} />
            <Route path="/payment-success" element={<PaymentSuccess/>} />
            <Route path="/booking-history" element={<BookingHistory/>} />
            <Route path="/update-password" element={<UpdatePassword/>} />
          </Routes>
          {/* <Footer/> */}
        </Router>
        
        
      </main>
    </AuthProvider>
  )
}

export default App;