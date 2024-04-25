import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import Sidebar from "../layout/Sidebar";
import { deleteRoom, getAllRooms } from "../utils/ApiFunctions";



const ExistingRooms = () => {

    const [rooms, setRooms] = useState([{ id: "", roomType: "", roomPrice: "" }])
    const[currentPage, setCurrentPage] = useState(1)
    const[roomsPerPage, setRoomsPerPage] = useState(8)
    const[isLoading, setIsLoading] = useState(false)
    const[filteredRooms, setFilteredRooms] = useState([{ id: "", roomType: "", roomPrice: "" }])
    const[selectedRoomType, setSelectedRoomType] = useState("")
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        fetchRooms()
    },[])

    const fetchRooms = async () =>{
        setIsLoading(true)
        try {
            const result = await getAllRooms()
            setRooms(result)
            setIsLoading(false)
        } catch (error) {
            setErrorMessage(error.message)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (selectedRoomType === ""){
            setFilteredRooms(rooms)
        }else{
            const filteredRooms = rooms.filter((room) => room.roomType === selectedRoomType)
            setFilteredRooms(filteredRooms)
        }
        setCurrentPage(1)
    }, [rooms, selectedRoomType])

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleDelete = async(roomId) => {
        try {
            const result = await deleteRoom(roomId)
            if(result === ""){
                setSuccessMessage(`Room No ${roomId} deleted successfully`)
                fetchRooms()
            } else {
                console.error( `Error deleting room: ${result.message}`)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }

    const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length
        return Math.ceil(totalRooms / roomsPerPage)
    }

    const indexOfLastRoom = currentPage * roomsPerPage
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)

    const{user} = useContext(AuthContext)

    const isLoggedIn = user !== null

	const userRole = localStorage.getItem("userRole")

    return (
        <>
        <Sidebar>
            <div className="admin-content">
            <section className='container' style={{backgroundColor:"whitesmoke"}}>
            {isLoggedIn && userRole === "ROLE_ADMIN" ? (
                <div className="container">
                    {successMessage && (
                        <div className="alert alert-success mt-5" role="alert">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="alert alert-danger mt-5" role="alert">
                            {errorMessage}
                        </div>
                    )}

                    {isLoading ? (
                        <p>Loading existing rooms</p>
                    ) : (
                        <>
                            <section className="container ">
                                <div className="justify-content-between ">
                                    <h2>Existing Rooms</h2>
                                </div>

                                <Row>
                                    <Col md={6} className="mb-3 mb-md-0">
                                        <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
                                    </Col>

                                    <Col md={6} className="d-flex justify-content-end">
                                        <Link to={"/add-Room"} className="btn btn-addRoom">
                                            ADD ROOM
                                        </Link>
                                    </Col>
                                </Row>

                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr className="text-center">
                                            <th>ID</th>
                                            <th>Room Type</th>
                                            <th>Room Price</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {currentRooms.map((room) => (
                                            <tr key={room.id} className="text-center">
                                                <td>{room.id}</td>
                                                <td>{room.roomType}</td>
                                                <td>{room.roomPrice}</td>
                                                <td className="gap-2">
                                                    <Link to={`/edit-room/${room.id}`}>
                                                        <span className="btn btn-info btn-sm">
                                                            <FaEye />
                                                        </span>
                                                        <span className="btn btn-warning btn-sm">
                                                            <FaEdit />
                                                        </span>
                                                    </Link>

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDelete(room.id)}
                                                    >
                                                        <FaTrashAlt />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className='d-flex justify-content-center mb-3'><RoomPaginator
                                    currentPage={currentPage}
                                    totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
                                    onPageChange={handlePaginationClick}
                                    
                                /></div>
                            </section>
                        </>
                    )}
                </div>
                ) : (
                    <div className="container mt-5">
                        <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-6">
                                <h2 className="mt-5 mb-2">You are not authorized to view this page</h2>
                                <Link to={"/"} className="btn btn-outline-info">Back to Home</Link>
                            </div>
                        </div>
                    </div>
                )
            }
            </section>
            </div>
        </Sidebar>
        </>
    )
}

export default ExistingRooms;