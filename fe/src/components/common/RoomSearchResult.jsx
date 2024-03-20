import React, { useState } from 'react'
import { Button, Row } from 'react-bootstrap'
import RoomCard from '../room/RoomCard'
import RoomPaginator from './RoomPaginator'

const RoomSearchResult = ({result, onClearSearch}) => {
    const[currentPage, setCurrentPage] = useState(1)
    const resultPerPage = 3
    const totalResults = result.length
    const totalPages = Math.ceil(totalResults / resultPerPage)


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const startIndex = (currentPage - 1) * resultPerPage
    const endIndex = startIndex + resultPerPage
    const paginatedResult = result.slice(startIndex, endIndex)

    return (
        <>
            {result.length > 0 ? (
                <>
                    <h5 className='text-center mt-5'>Search Result</h5>
                    <Row>
                        {paginatedResult.map((room)=>(
                            <RoomCard key={room.id} room={room}/>
                        ))}
                    </Row>
                    <Row>
                        {totalResults > resultPerPage && (
                            <RoomPaginator
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                        <Button
                            variant='secondary' onClick={onClearSearch}>
                                Clear Search
                        </Button>
                    </Row>
                </>
            ):(
                <p></p>
            )}
        </>
    )
}

export default RoomSearchResult