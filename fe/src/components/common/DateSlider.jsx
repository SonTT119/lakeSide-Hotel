import React, { useState } from 'react';
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const DateSlider = ({onDateChange, onFilterChange}) => {
    const[dateRange, setDateRange] = useState({
        // selection: {
        //     startDate: new Date(),
        //     endDate: null,
        //     key: "selection"
        // }
        startDate: undefined,
        endDate: undefined,
        key: "selection"
    });
    
    const handleSelect = (range) => {
        setDateRange(range.selection)
        onDateChange(range.selection.startDate, range.selection.endDate)
        onFilterChange(range.selection.startDate, range.selection.endDate)
    }

    const handleClearFilter = () => {
        setDateRange({
            startDate: undefined,
            endDate: undefined,
            key: "selection"
        })
        onDateChange(null, null)
        onFilterChange(null, null)
    }

    return (
        <>
            <h5>Filter Booking By Date</h5>
            <DateRangePicker
                ranges={[dateRange]}
                onChange={handleSelect}
                className='mb-4'
            />
            <button className="btn btn-secondary" onClick={handleClearFilter}>Clear Filter</button>
        </>
    )
}

export default DateSlider