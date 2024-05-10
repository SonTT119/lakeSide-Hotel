import React, { useState } from 'react'

const UserFilter = ({data, setFilteredData}) => {
    const [filter, setFilter] = useState("")
    const handleSelectChange = (e) => {
        const selectedRole = e.target.value
        setFilter(selectedRole)
        const filteredUsers = data.filter((user) => user.roles[0].name.toLowerCase().includes(selectedRole.toLowerCase()))
        setFilteredData(filteredUsers)
    }
    const clearFilter = () => {
        setFilter("")
        setFilteredData(data)
    }
    const userRoles = ["", ...new Set(data.map((user) => user.roles[0].name))]
    return (
        <div className="input-group mb-3">
            <span className="input-group-text" id="user-role-filter">
                Filter users by role
            </span>
            <select
                className="form-select"
                value={filter}
                onChange={handleSelectChange}
            >
                <option value="">select a role to filter....</option>
                {userRoles.map((role, index) => (
                    <option key={index} value={role}>
                        {role}
                    </option>
                ))}
            </select>
            <button className="btn btn-hotel" type="button" onClick={clearFilter}>
                Clear Filter
            </button>
        </div>
    )
}

export default UserFilter