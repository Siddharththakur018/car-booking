import React from 'react'
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Cars from './components/Car/Cars'
import SignUpPage from './components/SignUpPage/SignUpPage'
import Bookings from './components/Booking/Bookings'
import StatusBooking from './components/Booking/StatusBooking'
import AllBookings from './components/Booking/AllBookings'
import CarBrand from './components/Car/CarBrand'

function AllRoutes() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignUpPage />} /> 
                    <Route path='/carBrand' element={<CarBrand />} />
                    <Route path='/cars/:id' element={<Cars />} />
                    <Route path='/carBooking' element={<Bookings />} />
                    <Route path='/booking-status' element={<StatusBooking />} />
                    <Route path="/all-bookings" element={<AllBookings />} />
                </Routes>
            </BrowserRouter>
           
        </>
    )
}

export default AllRoutes