import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook

function CarBrand() {
    const [carBrands, setCarBrands] = useState([]); // List of all cars
    const [uniqueBrands, setUniqueBrands] = useState([]); // List of unique car brands
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [filteredCars, setFilteredCars] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate(); // React Router Hook

    useEffect(() => {
        fetch("https://backend-f1q64bvwa-siddharths-projects-a1e22d04.vercel.app/cars") // ✅ Cars API
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched Cars:", data);  // Debugging
    
                // Set all cars
                setCarBrands(data);
    
                // Get unique brands
                const uniqueBrandList = [...new Set(data.map(car => car.brand))];
                setUniqueBrands(uniqueBrandList); // Set unique brands
            })
            .catch((error) => console.error("Error fetching cars:", error));
    }, []);
    

    // Brand click handler
    const handleBrandClick = (brand) => {
        console.log("Brand Clicked:", brand); // Debugging

        // Filter cars by selected brand
        const carsByBrand = carBrands.filter((car) => car.brand === brand);
        console.log("Filtered Cars:", carsByBrand); // Debugging

        setSelectedBrand(brand);
        setFilteredCars(carsByBrand);
        setIsModalOpen(true); // Open modal
    };

    // Car click handler (Navigate to new page)
    const handleCarClick = (car) => {
        if (!car || !car._id) {
            console.error("Car ID is missing! Car object:", car);
            return;
        }
        navigate(`/cars/${car._id}`); // ✅ Ye same rahega
    };
    

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Car Brands</h1>

            {/* Car Brands Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {uniqueBrands.map((brand, index) => (
                    <button
                        key={index} // Use index for unique key
                        className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform duration-300 hover:scale-105 cursor-pointer"
                        onClick={() => handleBrandClick(brand)} // Corrected to show modal
                    >
                        <h2 className="text-xl font-semibold text-gray-700">{brand}</h2>
                    </button>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
                        {/* Close Button */}
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setIsModalOpen(false)}
                        >
                            ✖
                        </button>

                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Cars for {selectedBrand}</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {filteredCars.length > 0 ? (
                                filteredCars.map((car, index) => (
                                    <div
                                        key={car._id || index} // Ensure a unique key
                                        className="bg-gray-100 shadow-md rounded-lg p-4 text-center cursor-pointer hover:bg-gray-200 transition"
                                        onClick={() => handleCarClick(car)} // Navigate on click
                                    >
                                        <h3 className="text-lg font-semibold text-gray-600">
                                            {car.name} {/* Display car name */}
                                        </h3>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No cars found for {selectedBrand}.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CarBrand;
