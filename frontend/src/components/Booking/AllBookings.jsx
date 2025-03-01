import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const AllBookings = () => {

    const location = useLocation();
    const [bookings, setBookings] = useState(location.state?.bookings || []);


    useEffect(() => {
        if (bookings.length === 0) {
            fetchBookings();
        }
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get("http://localhost:5000/bookings/all");
            setBookings(response.data);
        } catch (error) {
            console.error("Error fetching bookings", error);
        }
    };

    return (
        <div className="flex flex-col items-center mt-10 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">All Your Bookings</h2>

            <div className="w-3/4">
                <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Car ID</th>
                            <th className="border px-4 py-2">Car Name</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Appointment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-4">No Bookings Found</td>
                            </tr>
                        ) : (
                            bookings.map((booking) => (
                                <tr key={booking._id} className="border-t">
                                    <td className="border px-4 py-2">{booking.carId?._id || "N/A"}</td>
                                    <td className="border px-4 py-2">{booking.carId?.name || "Unknown"}</td>
                                    <td className="border px-4 py-2 text-green-600">{booking.status}</td>
                                    <td className="border px-4 py-2 text-blue-500">
                                        {new Date(booking.appointmentDate).toDateString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBookings;
