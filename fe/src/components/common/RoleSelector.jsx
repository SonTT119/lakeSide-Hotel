import React, { useEffect, useState } from 'react'
import { getAllRoles } from '../utils/ApiFunctions'

const RoleSelector = (handleUserInputChange, newUser) => {
    const [roles, setRoles] = useState([""])
    const [showNewRoleInput, setShowNewRoleInput] = useState(false)
    const [newRole, setNewRole] = useState("")

    useEffect(() => {
        getAllRoles().then((data) => {
            setRoles(data)
        })
    } ,[])

    const handleNewRoleInputChange = (e) => {
        setNewRole(e.target.value)
    }

    const handleAddNewRole = () => {
        if (newRole !== "") {
            setRoles([...roles, newRole])
            setNewRole("")
            setShowNewRoleInput(false)
        }
    }


return (
    <>
        {roles.length > 0 && (
        <div>
            <select
            required
            className="form-select"
            name="role"
            onChange={(e) => {
                if (e.target.value === "Add New") {
                    setShowNewRoleInput(true)
                } else {
                    handleUserInputChange(e)
                }
            }}
            value={newUser.role}>
            <option value="">Select a role</option>
            <option value={"Add New"}>Add New</option>
            {roles.map((role, index) => (
                <option key={index} value={role}>
                    {role}
                </option>
            ))}
            </select>
            {showNewRoleInput && (
                <div className="mt-2">
                    <div className="input-group">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Enter New Role"
                        value={newRole}
                        onChange={handleNewRoleInputChange}
                        />
                        <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={handleAddNewRole}
                        >
                            Add
                        </button>
                    </div>
                </div>
            )}
        </div>
        )}
    </>
    )
}

export default RoleSelector