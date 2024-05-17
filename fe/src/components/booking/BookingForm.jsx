import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { bookRoom, getRoomById } from '../utils/ApiFunctions'
import BookingSummary from './BookingSummary'

const BookingForm = () => {
    const[isValidated, setIsValidated] = useState(false)
    const[isSubmitted, setIsSubmitted] = useState(false)
    const[errorMessages, setErrorMessages] = useState("")
    const[roomPrice, setRoomPrice] = useState(0)
    const[booking, setBooking] = useState({
        guestFullName: "",
        guestEmail: "",
        checkInDate: "",
        checkOutDate: "",
        numOfAdults: "",
        numOfChildren: "",
        // confirmationCode: ""
    })

    const [room, setRoom] = useState(null);

    const [isEmailValid, setIsEmailValid] = useState(true);

    // const { isAuthenticated } = useContext(AuthContext);

    const{roomId} = useParams()
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const {name, value} = e.target
        if (name === 'guestEmail') {
            const userEmail = localStorage.getItem("userId");
            setIsEmailValid(value === userEmail);
        }
        setBooking((prevBooking) => ({
            ...prevBooking,
            [name]: value,
        }));
        setErrorMessages("")
    }

    const getRoomPriceById = async (roomId) => {
        try {
            const response = await getRoomById(roomId)
            setRoomPrice(response.roomPrice)
            setRoom(response);
        } catch (error) {
            throw new Error(error)
        }
    }

    useEffect(() => {
        getRoomPriceById(roomId)
    }, [roomId])

    const calculatePayment = () => {
		const checkInDate = moment(booking.checkInDate)
		const checkOutDate = moment(booking.checkOutDate)
		const diffInDays = checkOutDate.diff(checkInDate, "days")
		const paymentPerDay = roomPrice ? roomPrice : 0
		return diffInDays * paymentPerDay
	}

    const isGuestCountValid = () => {
        const adultCount = parseInt(booking.numOfAdults)
        const childrenCount = parseInt(booking.numOfChildren)
        const totalGuests = adultCount + childrenCount
        return totalGuests > 0 && adultCount > 0
    }
    
    const isCheckOutDateValid = () => {
        if(!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))){
            setErrorMessages("Check-out date must come before check-in date")
            return false
        } else {
            setErrorMessages("")
            return true
        }
    }

    const isGuestCountWithinRoomCapacity = async () => {
        try {
            const room = await getRoomById(roomId);
            const adultCount = parseInt(booking.numOfAdults);
            const childrenCount = parseInt(booking.numOfChildren);
            return adultCount <= room.maxAdults && childrenCount <= room.maxChildren;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        // Lấy email của người dùng từ localStorage
        const userEmail = localStorage.getItem("userId");

        // Kiểm tra xem email người dùng nhập vào có khớp với email đã lưu không
        if (booking.guestEmail !== userEmail) {
            setIsEmailValid(false);
            e.stopPropagation();
            return;
        }
        
        if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid() || !(await isGuestCountWithinRoomCapacity())){
            e.stopPropagation();
        }else{
            setIsSubmitted(true);
        }
        setIsValidated(true);
    }

    const handleBooking = async() => {
        try {
            const confirmationCode = await bookRoom(roomId, booking)
            // setBooking({...booking, confirmationCode: confirmationCode})
            setIsSubmitted(true)
            navigate("/payment", { state: { booking, roomPrice , message: confirmationCode} });
            // navigate("/booking-success", {state: {message: confirmationCode}})
            
        } catch (error) {
            setErrorMessages(error.message)
            navigate("/booking-success", {state: {error: errorMessages}})
        }
    }

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className='card card-body mt-5'>
                            <h1> Reserve Room</h1>
                            <hr />
                            <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label htmlFor='guestFullName' className='hotel-color'>
                                        Full Name :
                                    </Form.Label>
                                    <Form.Control
                                    required
                                    type='text'
                                    id='guestFullName'
                                    name='guestFullName'
                                    value={booking.guestFullName}
                                    placeholder='Enter your full name'
                                    onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        Please enter your full name
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor='guestEmail' className='hotel-color'>
                                        Email :
                                    </Form.Label>
                                    <Form.Control
                                        required
                                        type='email'
                                        id='guestEmail'
                                        name='guestEmail'
                                        value={booking.guestEmail}
                                        placeholder='Enter your email'
                                        onChange={handleInputChange}
                                        isInvalid={!isEmailValid} // Thêm dòng này
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {isEmailValid ? 'Please enter your email address' : 'Please enter the correct email that you registered with.'}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <fieldset style={{border: "2px"}}>
                                    {/* <hr /> */}
                                    <legend>
                                        Lodging period
                                    </legend>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <Form.Label htmlFor='checkInDate' className='hotel-color'>
                                                Check-in Date :
                                            </Form.Label>
                                            <Form.Control
                                            required
                                            type='date'
                                            id='checkInDate'
                                            name='checkInDate'
                                            value={booking.checkInDate}
                                            onChange={handleInputChange}
                                            min={moment().format("YYYY-MM-DD")}
                                            placeholder='Enter your check-in date'
                                            />
                                            <Form.Control.Feedback type='invalid'>
                                                Please enter your check-in date
                                            </Form.Control.Feedback>
                                        </div>

                                        <div className='col-6'>
                                            <Form.Label htmlFor='checkOutDate' className='hotel-color'>
                                                Check-out Date :
                                            </Form.Label>
                                            <Form.Control
                                            required
                                            type='date'
                                            id='checkOutDate'
                                            name='checkOutDate'
                                            value={booking.checkOutDate}
                                            onChange={handleInputChange}
                                            min={moment().format("YYYY-MM-DD")}
                                            placeholder='Enter your check-out date'
                                            />
                                            <Form.Control.Feedback type='invalid'>
                                                Please select a check-out date
                                            </Form.Control.Feedback>
                                        </div>
                                        {errorMessages && <p className='error-message text-danger'>{errorMessages}</p>}
                                    </div>
                                </fieldset>

                                <fieldset style={{ border: "2px" }}>
                                    {/* <hr /> */}
                                    <legend>Number of guest</legend>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <Form.Label htmlFor='numOfAdults' className="hotel-color">
                                                Adults :
                                            </Form.Label>
                                            <Form.Control
                                            required
                                            type='number'
                                            id='numOfAdults'
                                            name='numOfAdults'
                                            value={booking.numOfAdults}
                                            onChange={handleInputChange}
                                            placeholder='0'
                                            min={1}
                                            max={room ? room.maxAdults : undefined} // Set max value


                                            />
                                            <Form.Control.Feedback type='invalid'>
                                                Please select at least 1 adult.
                                            </Form.Control.Feedback>
                                        </div>
                                        <div className='col-6'>
                                            <Form.Label htmlFor='NumOfChildren' className="hotel-color">
                                                Children :
                                            </Form.Label>
                                            <Form.Control
                                            required
                                            type='number'
                                            id='numOfChildren'
                                            name='numOfChildren'
                                            value={booking.numOfChildren}
                                            onChange={handleInputChange}
                                            placeholder='0'
                                            min={0}
                                            max={room ? room.maxChildren : undefined} // Set max value

                                            />
                                            <Form.Control.Feedback type="invalid">
												Select 0 if no children
											</Form.Control.Feedback>
                                        </div>
                                    </div>
                                </fieldset>
                                <div className='form-group mt-2 mb-2'>
                                    <button type='submit' className='btn btn-hotel'>
                                        Continue
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        {isSubmitted && (
                            <BookingSummary
                            booking={booking}
                            payment={calculatePayment()}
                            onConfirm={handleBooking}
                            isFormValid={isValidated}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookingForm