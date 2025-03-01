import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 

function Cars() {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [selectedTransmission, setSelectedTransmission] = useState(localStorage.getItem("selectedTransmission") || ""); 
    const [selectedFuelType, setSelectedFuelType] = useState(localStorage.getItem("selectedFuelType") || ""); 
    const [selectedModelType, setSelectedModelType] = useState(localStorage.getItem("selectedModelType") || ""); 
    const navigate = useNavigate();  

    const handleModelType = (e) => {
        setSelectedModelType(e.target.value);
        localStorage.setItem("selectedModelType", e.target.value);
    };

    const handleFuelType = (e) => {
        setSelectedFuelType(e.target.value);
        localStorage.setItem("selectedFuelType", e.target.value); 
    };

    const handleTransmissionChange = (event) => {
        setSelectedTransmission(event.target.value);
        localStorage.setItem("selectedTransmission", event.target.value);
    };

    const handleBookingClick = () => {
        navigate("/carBooking", {
            state: { carId: id, car }
        });
    };
    

    useEffect(() => {
        fetch(`https://backend-f1q64bvwa-siddharths-projects-a1e22d04.vercel.app/cars/${id}`)
            .then((res) => res.json())
            .then((data) => setCar(data))
            .catch((error) => console.error("Error fetching car:", error));
    }, [id]);
    

    if (!car) {
        return <h2 className="text-center text-gray-600">Loading...</h2>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 space-y-6">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
                <h1 className="text-4xl font-semibold text-gray-800 mb-4">{car.name}</h1>
                <p className="text-lg text-gray-700"><strong>Brand:</strong> {car.brand}</p>
            </div>

            {/* Fuel Type Section */}
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
                <strong className="text-xl text-gray-700">Fuel Type:</strong>
                <div className="flex flex-col space-y-4 mt-2">
                    {car.fuelType.map((fuel, index) => (
                        <label key={index} className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded-md cursor-pointer">
                            <input
                                type="radio"
                                name="fuelType"
                                value={fuel}
                                checked={selectedFuelType === fuel}
                                onChange={handleFuelType}
                                className="form-radio text-blue-500"
                            />
                            <span className="text-lg text-gray-700">{fuel}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Transmission Type Section */}
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
                <strong className="text-xl text-gray-700">Transmission Type:</strong>
                <div className="flex flex-col space-y-4 mt-2">
                    {car.transmissionType.map((transmission, index) => (
                        <label key={index} className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded-md cursor-pointer">
                            <input
                                type="radio"
                                name="transmission"
                                value={transmission}
                                checked={selectedTransmission === transmission}
                                onChange={handleTransmissionChange}
                                className="form-radio text-blue-500"
                            />
                            <span className="text-lg text-gray-700">{transmission}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Model Type Section */}
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
                <strong className="text-xl text-gray-700">Model Type:</strong>
                <div className="flex flex-col space-y-4 mt-2">
                    {car.models.map((model, index) => (
                        <label key={index} className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded-md cursor-pointer">
                            <input
                                type="radio"
                                name="model"
                                value={model}
                                checked={selectedModelType === model}
                                onChange={handleModelType}
                                className="form-radio text-blue-500"
                            />
                            <span className="text-lg text-gray-700">{model}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Booking Button */}
            <button
                onClick={handleBookingClick}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 transition-all"
            >
                Book Now
            </button>
        </div>
    );
}

export default Cars;
