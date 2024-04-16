import React, { useState, useEffect } from "react";
import axios from "axios";
import './css/landview.css';

const Landview = () => {
    const [landData, setLandData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLandData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/agri/fetch");
            setLandData(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLandData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/agri/delete/${id}`);
            console.log(response.data); // Log response from the server
            // Optionally, you can update the state or show a message to indicate successful deletion
            fetchLandData(); // Fetch data again to refresh the component
        } catch (error) {
            console.error("Error deleting land:", error);
            // Optionally, you can handle error response here
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!landData || landData.length === 0) {
        return <div>No land data available</div>;
    }

    return (
        <div>
            <h1>Land Information</h1>
            {landData.map((land, index) => (
                <div key={index} className="land-info">
                    <h2>Land {index + 1}</h2>
                    <div className="owner-info">
                        <div className="owner-details">
                            <p><strong>Owner's Name:</strong> {land.ownerName}</p>
                            <p><strong>Contact Person:</strong> {land.contact}</p>
                            <p><strong>Phone Number:</strong> {land.phoneNumber}</p>
                            <p><strong>Address:</strong> {land.address}</p>
                        </div>
                    </div>
                    <h3>Land Details</h3>
                    <ul>
                        <li><strong>Land Size:</strong> {land.landSize}</li>
                        <li><strong>Soil Type:</strong> {land.soilType}</li>
                        <li><strong>Crop Cultivated:</strong> {land.cropCultivated}</li>
                        <li><strong>Agricultural Loan:</strong> {land.agriculturalLoan}</li>
                        <li><strong>Latitude:</strong> {land.latitude}</li>
                        <li><strong>Longitude:</strong> {land.longitude}</li>
                        <li><strong>Price of Cultivated Crop:</strong> {land.cropPrice}</li>
                    </ul>
                    <div className="action-buttons">
                        <button onClick={() => handleDelete(land._id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Landview;
