import React, { useEffect, useState } from 'react';
import DateSlider from '../common/DateSlider';

const BookingTable = ({ bookingInfo, handleBookingCancellation }) => {
    const [filteredBookings, setFilteredBookings] = useState(bookingInfo);

    const filterBookingsByDate = (startDate, endDate) => {
        if (!startDate || !endDate) {
            setFilteredBookings(bookingInfo);
            return;
        }

        const filtered = bookingInfo.filter((booking) => {
            const bookingStartDate = new Date(booking.checkInDate);
            const bookingEndDate = new Date(booking.checkOutDate);
            return bookingStartDate <= endDate && bookingEndDate >= startDate;
        });

        setFilteredBookings(filtered);
    };

    useEffect(() => {
        setFilteredBookings(bookingInfo);
    }, [bookingInfo]);

    const formatDateBookings = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }

    const calculateTotalPrice = (checkInDate, checkOutDate, roomPrice) => {
        const days = moment(checkOutDate).diff(moment(checkInDate), 'days');
        return days * roomPrice;
    }

    return (
        <section className='p-4'>
            <DateSlider onDateChange={filterBookingsByDate} onFilterChange={filterBookingsByDate} />
            
            <table className="table table-bordered table-hover shadow">
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Booking ID</th>
                        <th>Room ID</th>
                        <th>Room Type</th>
                        <th>Check-in Date</th>
                        <th>Check-out Date</th>
                        <th>Guest Name</th>
                        <th>Guest Email</th>
                        <th>Adults</th>
                        <th>Children</th>
                        <th>Total Guest</th>
                        <th>Total Price</th>
                        <th>Confirmation Code</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {filteredBookings.map((booking, index) => (
                        <tr key={booking.id}>
                            <td>{index + 1}</td>
                            <td>{booking.id}</td>
                            <td>{booking.room.id}</td>
                            <td>{booking.room.roomType}</td>
                            <td>{formatDateBookings(booking.checkInDate)}</td>
                            <td>{formatDateBookings(booking.checkOutDate)}</td>
                            <td>{booking.guestFullName}</td>
                            <td>{booking.guestEmail}</td>
                            <td>{booking.numOfAdults}</td>
                            <td>{booking.numOfChildren}</td>
                            <td>{booking.totalNumOfGuests}</td>
                            <td>${calculateTotalPrice(booking.checkInDate, booking.checkOutDate, booking.room.roomPrice)}</td>
                            <td>{booking.bookingConfirmationCode}</td>
                            <td>
                                <button className='btn btn-danger btn-sm' onClick={() => handleBookingCancellation(booking.id)}>Cancel</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filteredBookings.length === 0 && <p className='text-center'>No booking found for the selected date range</p>}
        </section>
    );
};

export default BookingTable;
