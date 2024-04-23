import React, { useState } from 'react';
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file


const DateSlider = ({onDateChange, onFilterChange}) => {
    const[dateRange, setDateRange] = useState({
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
        <div className="date-slider-container">
            <h5 className="date-slider-heading">Filter Booking By Date</h5>
            <DateRangePicker
                ranges={[dateRange]}
                onChange={handleSelect}
                className='mb-4'
            />
            <button className="date-slider-button" onClick={handleClearFilter}>Clear Filter</button>
        </div>
    )
}

export default DateSlider;
