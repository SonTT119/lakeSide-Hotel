import React, { useEffect, useState } from 'react'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { deleteUser, getAllUsers } from '../utils/ApiFunctions'
// import UserFilter from '../common/UserFilter'
// import { Col, Row } from 'react-bootstrap'

const ExistingUsers = () => {

    const [users, setUsers] = useState([{ id: "", email: "", firstName: "", lastName: "", roles: [{ id: "", name: "" }] }])
    const[currentPage, setCurrentPage] = useState(1)
    const[usersPerPage, setUsersPerPage] = useState(8)
    const[isLoading, setIsLoading] = useState(false)
    const[filteredUsers, setFilteredUsers] = useState([{ id: "", email: "", firstName: "", lastName: "", roles: [{ id: "", name: "" }] }])
    const[selectedUserRole, setSelectedUserRole] = useState("")
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        fetchUsers()
    },[])

    const fetchUsers = async () =>{
        setIsLoading(true)
        try {
            const result = await getAllUsers()
            setUsers(result)
            setIsLoading(false)
        } catch (error) {
            setErrorMessage(error.message)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (selectedUserRole === ""){
            setFilteredUsers(users)
        }else{
            const filteredUsers = users.filter((user) => user.roles[0].name === selectedUserRole)
            setFilteredUsers(filteredUsers)
        }
        setCurrentPage(1)
    }, [users, selectedUserRole])

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleDeleteUser = async(userId) => {
        try {
            const result = await deleteUser(userId)
            if(result === ""){
                setSuccessMessage(`User No ${userId} deleted successfully`)
                fetchUsers()
            } else {
                console.error( `Error deleting user: ${result.message}`)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }

    const calculateTotalPages = (filteredUsers, usersPerPage, users) => {
        const totalUsers = filteredUsers.length > 0 ? filteredUsers.length : users.length
        return Math.ceil(totalUsers / usersPerPage)
    }

    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

    return (
        <>
            <div className='container'>
                {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {successMessage}
                </div>
                )}
                {errorMessage && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {errorMessage}
                </div>)}
                <div>
                    {isLoading ? (
                        <p>Loading existing users</p>
                    ):(
                        <>
                            <section className='mt-5 mb-5 container'>
                                <div className='d-flex justify-content-between mb-3 mt-5'>
                                    <h2>Existing Users</h2>
                                </div>
                                {/* <Row>
                                    <Col md={6} className='mb-3 mb-md-0'>
                                        <UserFilter data={users} setFilteredData = {setFilteredUsers}/>
                                    </Col>
                                </Row> */}
                                <table className='table table-bordered table-hover'>
                                    <thead>
                                        <tr className='text-center'>
                                            <th>ID</th>
                                            <th>Email</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Role</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentUsers.map((user) => (
                                            <tr key={user.id} className='text-center'>
                                                <td>{user.id}</td>
                                                <td>{user.email}</td>
                                                <td>{user.firstName}</td>
                                                <td>{user.lastName}</td>
                                                <td>{user.roles[0].name}</td>
                                                <td className='gap-2'>
                                                    <Link to={`/user/edit/${user.id}`} >
                                                        <span className="btn btn-info btn-sm">
                                                            <FaEye />
                                                        </span>
                                                        <span className="btn btn-warning btn-sm">
                                                            <FaEdit />
                                                        </span>
                                                    </Link>
                                                    <button className='btn btn-danger btn-sm' onClick={() => handleDeleteUser(user.id)}>
                                                            <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className='d-flex justify-content-center'>
                                    <nav>
                                        <ul className='pagination'>
                                            {Array.from({length: calculateTotalPages(filteredUsers, usersPerPage, users)}, (_, index) => (
                                                <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : null}`}>
                                                    <button className='page-link' onClick={() => handlePaginationClick(index + 1)}>{index + 1}</button>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </div>
                            </section>
                        </>
                    )}
                </div>
            </div>

        </>
    )
}

export default ExistingUsers