import moment from 'moment';
import React from 'react';
import { useLocation } from 'react-router-dom';
import './Payment.css'; // Import the CSS file


import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9192', // replace with your server URL
});

const Payment = () => {
    const location = useLocation();
    const { state } = location;
    const { booking, roomPrice } = state || {};
    const message = location.state?.message;

    if (!booking || !roomPrice) {
        return <div>Error: Missing booking information.</div>;
    }

    const calculatePayment = () => {
        const checkInDate = moment(booking.checkInDate);
        const checkOutDate = moment(booking.checkOutDate);
        const diffInDays = checkOutDate.diff(checkInDate, "days");
        const paymentPerDay = roomPrice ? roomPrice : 0;
        return diffInDays * paymentPerDay;
    };

    const handlePayment = async () => {
        try {
            const totalAmount = calculatePayment();
            const response = await api.post(`/payment/vn-pay?amount=${totalAmount}&bankCode=NCB`)
            if (response.data.code === 'ok') {
                // Redirect to the payment URL
                window.location.href = response.data.paymentUrl;
            } else {
                // Handle error
                console.error('Failed to create payment:', response.data.message);
            }
        } catch (error) {
            console.error('Failed to create payment:', error);
        }
    };

    return (
        <div className='container mt-5 payment-container'>
            <h1 className='payment-title'>Payment Page</h1>
            <div className='payment-summary'>
                <h3>Payment Summary</h3>
                <p className="text-success">{message}</p>
            </div>
            <p className='booking-details-title'>Booking Details:</p>
            <ul className='booking-details-list'>
                <li><span className="booking-detail-label">Full Name:</span> {booking.guestFullName}</li>
                <li><span className="booking-detail-label">Email:</span> {booking.guestEmail}</li>
                <li><span className="booking-detail-label">Check-In Date:</span> {booking.checkInDate}</li>
                <li><span className="booking-detail-label">Check-Out Date:</span> {booking.checkOutDate}</li>
                <li><span className="booking-detail-label">Number of Adults:</span> {booking.numOfAdults}</li>
                <li><span className="booking-detail-label">Number of Children:</span> {booking.numOfChildren}</li>
                <li><span className="booking-detail-label">Total Amount:</span> {calculatePayment().toLocaleString()} VND</li>
            </ul>
            <button onClick={handlePayment} className='btn btn-success payment-button'>Proceed to Payment</button>
        </div>
    );
};

export default Payment;
