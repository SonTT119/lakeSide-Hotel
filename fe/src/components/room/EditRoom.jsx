import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import RoomTypeSelector from "../common/RoomTypeSelector"
import Sidebar from "../layout/Sidebar"
import { getRoomById, updateRoom } from "../utils/ApiFunctions"

const EditRoom = () => {
	const [room, setRoom] = useState({
		photo: "",
		roomType: "",
		roomPrice: "",
		maxAdults: "",
		maxChildren: "",
		// description: "",
	})

	const [imagePreview, setImagePreview] = useState("")
	const [successMessage, setSuccessMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const { roomId } = useParams()

	const handleImageChange = (e) => {
		const selectedImage = e.target.files[0]
		setRoom({ ...room, photo: selectedImage })
		setImagePreview(URL.createObjectURL(selectedImage))
	}

	const handleInputChange = (event) => {
		const { name, value } = event.target
		setRoom({ ...room, [name]: value })
	}

	useEffect(() => {
		const fetchRoom = async () => {
			try {
				const roomData = await getRoomById(roomId)
				setRoom(roomData)
				setImagePreview(roomData.photo)
			} catch (error) {
				console.error(error)
			}
		}
		fetchRoom()
	}, [roomId])

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const response = await updateRoom(roomId, room)
			if (response  !== undefined) {
				setSuccessMessage("Room updated successfully!")
				const updatedRoomData = await getRoomById(roomId)
				setRoom(updatedRoomData)
				setImagePreview(updatedRoomData.photo)
				setErrorMessage("")
			} else {
				setErrorMessage("Error updating room")
			}
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		}
	}

	return (
		<>
		<Sidebar>
			<div className="admin-content">
			<div className="container mt-5 mb-5">
				<h3 className="text-center mb-5 mt-5">Edit Room</h3>
				<div className="row justify-content-center">
					<div className="col-md-8 col-lg-6">
						{successMessage && (
							<div className="alert alert-success" role="alert">
								{successMessage}
							</div>
						)}
						{errorMessage && (
							<div className="alert alert-danger" role="alert">
								{errorMessage}
							</div>
						)}
						<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="roomType" className="form-label hotel-color">Room Type</label>
							{/* <select className="form-control" id="roomType" name="roomType" value={room.roomType} onChange={handleInputChange} required>
								{roomTypes.map(roomType => (
									<option key={roomType.id} value={roomType.id}>{roomType}</option>
								))}
							</select> */}
							<RoomTypeSelector handleRoomInputChange={handleInputChange} newRoom={room}/>
						</div>
							<div className="mb-3">
								<label htmlFor="roomPrice" className="form-label hotel-color">
									Room Price
								</label>
								<input
									type="number"
									className="form-control"
									id="roomPrice"
									name="roomPrice"
									value={room.roomPrice}
									onChange={handleInputChange}
								/>
							</div>
							<div className="row">
								<div className="col-md-6">
									<div className="mb-3">
										<label htmlFor="maxAdults" className="form-label">
											Max Adults
										</label>
										<input
											className="form-control"
											required
											id="maxAdults"
											type="number"
											name="maxAdults"
											min="1"
											value={room.maxAdults} // new field
											onChange={handleInputChange}
										/>
									</div>
								</div>

								<div className="col-md-6">
									<div className="mb-3">
										<label htmlFor="maxChildren" className="form-label">
											Max Children
										</label>
										<input
											className="form-control"
											required
											id="maxChildren"
											type="number"
											name="maxChildren"
											min="0"
											value={room.maxChildren} // new field
											onChange={handleInputChange}
										/>
									</div>
								</div>
							</div>

							<div className="mb-3">
								<label htmlFor="photo" className="form-label hotel-color">
									Photo
								</label>
								<input
									required
									type="file"
									className="form-control"
									id="photo"
									name="photo"
									onChange={handleImageChange}
								/>
								{imagePreview && (
									<img
										src={`data:image/jpeg;base64,${imagePreview}`}
										alt="Room preview"
										style={{ maxWidth: "400px", maxHeight: "400px" }}
										className="mt-3"
									/>
								)}
							</div>
							<div className="d-grid gap-2 d-md-flex mt-2">
								<Link to={"/existing-rooms"} className="btn btn-outline-info ml-5">
									back
								</Link>
								
								<button className="btn btn-outline-warning"
								onClick={handleSubmit}
								>
									Edit Room
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			</div>
			</Sidebar>
		</>
	)
}

export default EditRoom;