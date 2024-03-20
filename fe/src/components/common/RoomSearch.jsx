import moment from 'moment'
import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { getAvailableRooms } from '../utils/ApiFunctions'
import RoomSearchResult from './RoomSearchResult'
import RoomTypeSelector from './RoomTypeSelector'


const RoomSearch = () => {
    const[searchQuery, setSearchQuery] = useState({
        checkInDate:"",
        checkOutDate:"",
        roomType:""
    })
    const[errorMessages, setErrorMessages] = useState("")
    const[availableRooms, setAvailableRooms] = useState([])
    const[isLoading, setIsLoading] = useState(false)

    const handleSearch = (event) =>{
        event.preventDefault()
        const checkInDate = moment(searchQuery.checkInDate)
        const checkOutDate = moment(searchQuery.checkOutDate)

        if(!checkInDate.isValid() || !checkOutDate.isValid()){
            setErrorMessages("Please fill in all the fields")
            setIsLoading(false)
            return
        }
        if(!checkOutDate.isSameOrAfter(checkInDate)){
            setErrorMessages("Check-out date must be after check-in date")
            setIsLoading(false)
            return
        }

        setIsLoading(true)
        getAvailableRooms(searchQuery.checkInDate, searchQuery.checkOutDate, searchQuery.roomType).then((response) =>{
            setAvailableRooms(response.data)
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }).catch((error) =>{
            console.log(error)
        }).finally(() =>{
            setIsLoading(false)
        })
    }


    const handleInputChange = (event) => {
        const { name, value } = event.target
        setSearchQuery({...searchQuery, [name]: value})
        const checkInDate = moment(searchQuery.checkInDate)
        const checkOutDate = moment(searchQuery.checkOutDate)

        if(checkInDate.isValid() && checkOutDate.isValid()){
            setErrorMessages("")
        }
    }

    const clearSearch = ()=>{
        setSearchQuery({
            checkInDate:"",
            checkOutDate:"",
            roomType:""
        })
        setAvailableRooms([])
    }
    return (
        <>
            <Container className='mt-5 mb-5 py-5 shadow'>
                <Form className='search-room' onSubmit={handleSearch}>
                    <Row className='justify-content-center'>
                        <Col xs={12} md={3}>
                            <Form.Group controlId='checkInDate'>
                                <Form.Label>
                                    Check In Date
                                </Form.Label>
                                <Form.Control type='date' name='checkInDate'
                                value={searchQuery.checkInDate}
                                onChange={handleInputChange}
                                min={moment().format("YYYY-MM-DD")}/>
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={3}>
                            <Form.Group controlId='checkOutDate'>
                                <Form.Label>
                                    Check Out Date
                                </Form.Label>
                                <Form.Control type='date' name='checkOutDate'
                                value={searchQuery.checkOutDate}
                                onChange={handleInputChange}
                                min={moment().format("YYYY-MM-DD")}/>
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={3}>
                            <Form.Group controlId='roomType'>
                                <Form.Label>
                                    Room Type
                                </Form.Label>
                                <div className='d-flex'>
                                    <RoomTypeSelector
                                    handleRoomInputChange={handleInputChange}
                                    newRoom={searchQuery}
                                    />
                                    
                                    <Button variant='secondary' type='submit' className='btn btn-hotel ml-2'>
                                        Search
                                    </Button>
                                </div>
                                
                            </Form.Group>
                            
                        </Col>
                    </Row>
                </Form>

                {isLoading ?(
                    <p>Finding available room.....</p>
                ): availableRooms ? (
                    <RoomSearchResult result={availableRooms} onClearSearch={clearSearch}/>

                ):(
                    <p className='text-danger'>No rooms available for the  selected dates and type</p>
                )}

                {errorMessages && <p className='text-danger'>{errorMessages}</p>}
            </Container>
        </>
    )
}

export default RoomSearch