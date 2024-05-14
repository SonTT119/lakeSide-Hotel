import React, { useContext, useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../auth/AuthProvider'
import Sidebar from '../layout/Sidebar'
import { deleteRoleById, getAllRoles } from '../utils/ApiFunctions'


const AllRoles = () => {
  const [roles, setRoles] = useState([{ id: "", name: ""}])
  const[currentPage, setCurrentPage] = useState(1)
  const[isLoading, setIsLoading] = useState(false)
  const[errorMessage, setErrorMessage] = useState("")
  const[successMessage, setSuccessMessage] = useState("")
  const[filteredRoles, setFilteredRoles] = useState([{ id: "", name: ""}])
  const[selectedRole, setSelectedRole] = useState("")


  useEffect(() => {
    fetchRoles()
  } ,[])

  const fetchRoles = async () => {
    setIsLoading(true)
    try {
        const result = await getAllRoles()
        console.log(result)
        setRoles(result)
    } catch (error) {
        setErrorMessage(error.message)

    }
    setIsLoading(false)
  }

  useEffect(() => {
      if (selectedRole === ""){
          setFilteredRoles(roles)
      }else{
          const filteredRoles = roles.filter((role) => role.name === selectedRole)
          setFilteredRoles(filteredRoles)
      }
      setCurrentPage(1)
  }, [roles, selectedRole])


  const handleDeleteRole = async (roleId) => {
      const confirmed = window.confirm("Are you sure you want to delete this role?")
      if (confirmed) {
          try {
              const response = await deleteRoleById(roleId)
              if (response) {
                  setSuccessMessage("Role deleted successfully!")
                  setTimeout(() => {
                      setSuccessMessage("")
                  }, 5000)
                  fetchRoles()
              }
          } catch (error) {
              setErrorMessage(error.message)
          }
      }
  }

  // const 


  const{user} = useContext(AuthContext)

  const isLoggedIn = user !== null

  const userRole = localStorage.getItem("userRole")
  
  return (
    // <div className="container">
    //   <div className="row">
    //     <div className="col-md-3">
    //       <Sidebar />
    //     </div>
    //     <div className="col-md-9">
    //       <h2>All Roles</h2>
    //       <div className="d-flex justify-content-between">
    //         <div>
    //           <button className="btn btn-primary">Add Role</button>
    //         </div>
    //         <div>
    //           <input type="text" placeholder="Search Role" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} />
    //         </div>
    //       </div>
    //       <table className="table">
    //         <thead>
    //           <tr>
    //             <th>Role ID</th>
    //             <th>Role Name</th>
    //             <th>Actions</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {
    //             filteredRoles.map((role, index) => (
    //               <tr key={index}>
    //                 <td>{role.id}</td>
    //                 <td>{role.name}</td>
    //                 <td>
    //                   <button className="btn btn-danger" onClick={() => handleDeleteRole(role.id)}>Delete</button>
    //                 </td>
    //               </tr>
    //             ))
    //           }
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>

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
                  <p>Loading existing roles</p>
                ) : (
                  <>
                    <section className='mt-5 mb-5 container'>
                      <div className='d-flex justify-content-between mb-3 mt-5'>
                        <h2>All Roles</h2>
                      </div>

                      {/* <div className="d-flex justify-content-between">
                        <div>
                          <button className="btn btn-primary">Add Role</button>
                        </div>
                        <div>
                          <input type="text" placeholder="Search Role" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} />
                        </div>
                      </div> */}

                      <Row>
                        {/* <div className="col-md-6">
                          <div className="input-group">
                            <input type="text" placeholder="Search Role" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} />
                          </div>
                        </div> */}
                        {/* <Col md={6} className="d-flex justify-content-end">
                          <Link to={"/add-Role"} className="btn btn-addRoom">
                              ADD ROLE
                          </Link>
                        </Col> */}
                      </Row>

                      <table className="table mb-3">
                        <thead>
                          <tr>
                            <th>Role ID</th>
                            <th>Role Name</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            filteredRoles.map((role, index) => (
                              <tr key={index}>
                                <td>{role.id}</td>
                                <td>{role.name}</td>
                                <td>
                                  <button className="btn btn-danger" onClick={() => handleDeleteRole(role.id)}>Delete</button>
                                </td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </section>
                  </>
                )}
              </div>
            ) : (
              <div className="container mt-5">
              <div className="row justify-content-center">
                <div className='col-md-8 col-lg-6'>
                  <h2 className='mt-5 mb-2'>You are not authorized to view this page</h2>
                  <Link to={"/"} className="btn btn-outline-info">Back to Home</Link>
                </div>
              </div>
            </div>
            )}
          </section>
        </div>
      </Sidebar>
    </>
  )
}

export default AllRoles