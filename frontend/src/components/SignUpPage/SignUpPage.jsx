import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';


function SignUpPage() {
    const [number, setNumber] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '']);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleOtpChange = (e, index) => {
        const newOtp = [...otp];
        newOtp[index] = e.target.value;
        setOtp(newOtp);
    };

    const handleVerifyClick = async () => {
        try {
            console.log("Sending number:", number);
            const response = await axios.post('http://localhost:3000/auth/signup', { number });
            console.log("Response:", response.data);
            if (response.status === 200) {
                setIsVerified(true); 
            }
        } catch (err) {
            console.error("Error:", err.response || err.message);
            setError('Failed to send OTP');
        }
    };

    const verifyOtp = async () => {
        try {
            setError("");
            const response = await axios.post("http://localhost:3000/auth/verify", {
                number,
                otp: otp.join("")
            });
    
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.userId);
                
                // ✅ userId ko Cars page me pass karna
                navigate("/carBrand", { state: { userId: response.data.userId } });
            }
        } catch (error) {
            setError("Invalid Otp Please Check Again!!");
        }
    };
    

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/carBrand");
        }
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-semibold text-center mb-6">Welcome to Car Booking System</h1>
                {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                
                {!isVerified ? (
                    <>
                        <h3 className="text-lg font-medium mb-4">Enter Your Number</h3>
                        <input 
                            type="text"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md mb-4"
                            placeholder="Phone Number"
                        />
                        <button
                            onClick={handleVerifyClick}
                            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
                        >
                            Verify
                        </button>
                    </>
                ) : (
                    <>
                        <h3 className="text-lg font-medium mb-4">Enter OTP</h3>
                        <div className="flex justify-between mb-4">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(e, index)}
                                    className="w-12 h-12 text-center border border-gray-300 rounded-md"
                                />
                            ))}
                        </div>
                        <button
                            onClick={verifyOtp}
                            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
                        >
                            Submit OTP
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default SignUpPage;
