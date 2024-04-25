import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:9192'
});

export const getHeader = () => {
	const token = localStorage.getItem("token")
    if(!token){
        return {}
    }
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
}

/* this function add a new rooms to the database */
export async function addRoom(photo, roomType, roomPrice){
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('roomType', roomType);
    formData.append('roomPrice', roomPrice);
    const response = await api.post('/rooms/add/new-room', formData)
    
    if (response.status = 201){
        return true
    }else{
        return false
    }
}

/* this function gets all room types from the database */
export async function getRoomTypes(){
    try {
        const response = await api.get("/rooms/room/types")
        return response.data
    } catch (error) {
        throw new Error("Error fetching room type")
    }
}
/* this function gets all rooms from the database */
export async function getAllRooms(){
    try {
        const result = await api.get("/rooms/all-rooms")
        return result.data
    } catch (error) {
        throw new Error("Error fetching rooms")
    }
}

/* this function deletes a room from the database */
export async function deleteRoom(roomId){
    try {
        const response = await api.delete(`/rooms/delete-room/${roomId}`,
        {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        throw new Error(`Error deleting room ${roomId}: ${error.message}`)
    }
}

/* this function updates a room in the database */
export async function updateRoom(roomId, roomData){
    const formData = new FormData();
    formData.append('roomType', roomData.roomType);
    formData.append('roomPrice', roomData.roomPrice);
    formData.append('photo', roomData.photo);
    const response = await api.put(`/rooms/update-room/${roomId}`, formData)
    return response
}

/* this function gets a room by id from the database */
export async function getRoomById(roomId){
    try {
        const result = await api.get(`rooms/get-room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Error fetching room ${roomId}: ${error.message}`)
    }
}

/* this function save a  new booking room to the database */
export async function bookRoom(roomId, booking){
    try{
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
        return response.data
    }
    catch(error){
        if (error.response && error.response.data.message){
            throw new Error(error.response.data.message)
        } else {
            throw new Error(`Error booking room ${roomId}: ${error.message}`)
        }
    }
}

/* this function gets all bookings from the database */
export async function getAllBookings(){
    try {
        const result = await api.get("/bookings/all-bookings")
        return result.data
    } catch (error) {
        throw new Error(`Error fetching bookings:  ${error.message}`)
    }
}

/* this function gets a booking by the confirmation Code  */
export async function getBookingByConfirmationCode(confirmationCode) {
	try {
		const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
		return result.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error find booking : ${error.message}`)
		}
	}
}

/* this function cancel bookings  */
export async function cancelBooking(bookingId){
    try {
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
        return result.data
    } catch (error) {
        throw new Error(`Error cancelling booking ${bookingId}: ${error.message}`)
    }
}

/*this function gets available rooms */
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
	const result = await api.get(
		`rooms/available-rooms?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&roomType=${roomType}`
	)
	return result
}

export async function registration(registration) {
    try {
        const result = await api.post("/auth/register", registration)
        return result.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Error registering user: ${error.message}`)
        }
    }
}

export async function login(login) {
    try {
		const response = await api.post("/auth/login", login)
		if (response.status >= 200 && response.status < 300) {
			return response.data
		} else {
			return null
		}
	} catch (error) {
        if (error.response && error.response.data) {
            throw new Error(`Error logging in: ${error.message}`)
        }
    }

}

export async function getUserProfile(userId, token) {
    try {
        const result = await api.get(`/auth/profile/${userId}`,{
            headers: getHeader()
        })
        return result.data
    } catch (error) {
        throw new Error(`Error fetching user profile: ${error.message}`)
    }
}

/* This isthe function to delete a user */
export async function deleteUser(email) {
	try {
		const response = await api.delete(`/users/delete/${email}`,
        { headers: getHeader() }
        )
		return response.data
	} catch (error) {
		return error.message
	}
}

/* This is the function to get a single user */
export async function getUser(userId, token) {
	try {
		const response = await api.get(`/users/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

export async function getBookingsByUserId(userId, token) {
	try {
		const response = await api.get(`/bookings/user/${userId}/bookings`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		console.error("Error fetching bookings:", error.message)
		throw new Error("Failed to fetch bookings")
	}
}

export async function getAllUsers() {
    try {
        const response = await api.get("/users/all-users",
        {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        throw new Error("Error fetching users")
    }
}

// export async function updateUser(userId, userData) {
//     try {
//         const response = await api.put(`/users/update/${userId}`, userData)
//         return response.data
//     } catch (error) {
//         throw new Error(`Error updating user ${userId}: ${error.message}`)
//     }
// }

export async function updateUser(userId, userData){
    const formData = new FormData();
    formData.append('firstName', userData.firstName);
    formData.append('lastName', userData.lastName);
    formData.append('email', userData.email);
    const response = await api.put(`/users/update/${userId}`, formData)
    return response
}

export async function getUserById(userId) {
    try {
        const response = await api.get(`/users/user/${userId}`,
        {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error(`User with ID ${userId} not found`)
        } else {
            throw new Error(`Error fetching user ${userId}: cannot delete user ${userId}`)
        }
    }
}

export async function deleteUserById(userId) {
    try {
        const response = await api.delete(`/users/delete-user/${userId}`,
        {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        throw new Error(`Error deleting user ${userId}: ${error.message}`)
    }
}

export async function getAllReview() {
    try {
        const response = await api.get("/review/get-all-reviews")
        return response.data
    } catch (error) {
        throw new Error("Error fetching reviews")
    }
}

// export async function addReview(review) {
//     try {
//         const response = await api.post("/review/save-review", review,{
//             headers: getHeader()
//         })
//         return response.data
//     } catch (error) {
//         throw new Error(`Error adding review: ${error.message}`)
//     }
// }

export async function getAllReviewsByRoomId(roomId) {
    try {
        const response = await api.get(`review/get_reviews_by_room_id/${roomId}`)
        return response.data
    } catch (error) {
        throw new Error(`Error fetching reviews for room ${roomId}: ${error.message}`)
    }
}

export async function addReviews(roomId, comment, rating) {
    try {
        const response = await api.post(`/review/add_review/room/${roomId}`, {comment, rating},{
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        throw new Error(`Error adding review: ${error.message}`)
    }
}

// forgot password
export async function forgotPassword(forgotPassData) {
    try {
        const response = await api.post(`/forgotPassword/verifyEmail/${forgotPassData.email}`,{
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        throw new Error(`Error sending email: ${error.message}`)
    }
}
// verify OTP
export async function verifyOTP(data) {
    try {
        const response = await api.post(`/forgotPassword/verifyOtp/${data.otp}/${data.email}`)
        return response.data
    } catch (error) {
        throw new Error(`Error verifying OTP: ${error.message}`)
    }
}

//get count users
export async function getCountUsers() {
    try {
        const response = await api.get("/users/count")
        return response.data
    } catch (error) {
        throw new Error("Error fetching users")
    }
}

//get count rooms
export async function getCountRooms() {
    try {
        const count = await api.get("/rooms/count")
        return count.data
    } catch (error) {
        throw new Error("Error fetching rooms")
    }
}

//get count bookings
export async function getCountBookings() {
    try {
        const count = await api.get("/bookings/count")
        return count.data
    } catch (error) {
        throw new Error("Error fetching bookings")
    }
}

//get rating average by room id
export async function getRatingById(roomId) {
    try {
        const response = await api.get(`/review/get_rating_average_by_room_id/${roomId}`)
        return response.data
    } catch (error) {
        throw new Error(`Error fetching rating for room ${roomId}`)
    }
}

//get count reviews by room id
export async function getCountById(roomId) {
    try {
        const response = await api.get(`/review/get_review_count_by_room_id/${roomId}`)
        return response.data
    } catch (error) {
        throw new Error(`Error fetching count for room ${roomId}`)
    }
}