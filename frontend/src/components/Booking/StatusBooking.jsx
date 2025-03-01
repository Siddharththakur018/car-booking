import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const StatusBooking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const booking = location.state?.booking;

    if (!booking) {
        return <h2 className="text-center text-red-500 mt-10">No Booking Found</h2>;
    }

    return (
        <div className="flex flex-col items-center mt-10 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Booking Confirmation</h2>
            
            <div className="w-96 flex flex-col space-y-3 p-4 bg-white shadow-md rounded-lg text-center">
                <p className="text-lg font-medium">Status: <span className="text-green-600">{booking.status}</span></p>
                <p className="text-lg">Appointment Date: <span className="text-blue-500">{new Date(booking.appointmentDate).toDateString()}</span></p>
                
                {/* ✅ Button now redirects to All Bookings */}
                <button onClick={() => navigate("/carBrand")} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                    Back to HomePage
                </button>
            </div>
        </div>
    );
};

export default StatusBooking;
