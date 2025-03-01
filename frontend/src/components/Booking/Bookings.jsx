import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Bookings = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { carId, car } = location.state || {};  // Destructure car from location.state

    const [bookings, setBookings] = useState([]);
    const [services, setServices] = useState([]); // Services state
    const [newBooking, setNewBooking] = useState({ carId: carId || "", serviceId: "" });

    useEffect(() => {
        if (carId) {
            setNewBooking({ carId });
            fetchBookings();
            fetchServices(); // Fetch available services
        }
    }, [carId]);

    const fetchBookings = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/bookings/car/${carId}`);
            setBookings(response.data);
        } catch (error) {
            console.error("Error fetching bookings", error);
        }
    };

    const fetchServices = async () => {
        try {
            const response = await axios.get("http://localhost:5001/service"); // Fetch services
            setServices(response.data);
        } catch (error) {
            console.error("Error fetching services", error);
        }
    };

    const addBooking = async () => {
        if (!newBooking.carId || !newBooking.serviceId) {
            alert("Car ID and Service selection are required.");
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/bookings/add", newBooking);
            alert("Booking added successfully!");
            navigate("/booking-status", { 
                state: { 
                    booking: response.data.booking, 
                    carId: carId, 
                    carName: car?.name || "" // Pass car name directly here
                } 
            });
        } catch (error) {
            console.error("Error adding booking", error);
        }
    };

    return (
        <div className="flex flex-col items-center mt-10 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Bookings</h2>

            <h3 className="text-xl font-semibold text-gray-700">Book a New Service</h3>
            <div className="w-96 flex flex-col space-y-3 p-4 bg-white shadow-md rounded-lg">
                <input type="text" className="p-2 border rounded-md" placeholder="Car ID" value={newBooking.carId} disabled />
                <input type="text" className="p-2 border rounded-md" placeholder="Car Name" value={car?.name || ""} disabled />
                
                {/* Service Dropdown */}
                <select 
                    className="p-2 border rounded-md" 
                    value={newBooking.serviceId}
                    onChange={(e) => setNewBooking({ ...newBooking, serviceId: e.target.value })}
                >
                    <option value="">Select a Service</option>
                    {services.map(service => (
                        <option key={service._id} value={service._id}>
                            {service.name} - ₹{service.price}
                        </option>
                    ))}
                </select>

                <button onClick={addBooking} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Book Appointment
                </button>
            </div>
        </div>
    );
};

export default Bookings;
