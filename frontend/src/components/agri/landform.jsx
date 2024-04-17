// LandForm.js
import React, { useState } from "react";
import axios from "axios";
import "./css/landform.css";

const LandForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        ownerName: "",
        phoneNumber: "",
        contact: "",
        address: "",
        landSize: "",
        soilType: "",
        cropCultivated: "",
        agriculturalLoan: "",
        latitude: "",
        longitude: "",
        cropPrice: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                // Make POST request to your backend API endpoint
                const response = await axios.post("http://localhost:4000/api/agri/add", formData);
                console.log(response.data); // Log response from the server
                setFormData({
                    ownerName: "",
                    phoneNumber: "",
                    contact: "",
                    address: "",
                    landSize: "",
                    soilType: "",
                    cropCultivated: "",
                    agriculturalLoan: "",
                    latitude: "",
                    longitude: "",
                    cropPrice: ""
                });
            } catch (error) {
                console.error("Error submitting form:", error);
                // Optionally, you can handle error response here
            }
       
    };

    return (
        <form className="LandForm" >
            <h3 className="landform-header">Land Form Registration</h3>
            <div className="landform-group">
                <label className="landform-label" htmlFor="ownerName">Owner's Name:</label>
                <input 
                    className='landform-control' 
                    type="text"
                    id="ownerName" 
                    name="ownerName" 
                    value={formData.ownerName} 
                    onChange={handleChange} 
                />
            </div>
         
            <div className="landform-group">
                <label className="landform-label" htmlFor="phoneNumber">Phone Number:</label>
                <input 
                    className='landform-control' 
                    type="text"
                    id="phoneNumber" 
                    name="phoneNumber" 
                    value={formData.phoneNumber} 
                    onChange={handleChange} 
                />
            </div>
            <div className="landform-group">
                <label className="landform-label" htmlFor="contact">Contact Person:</label>
                <input 
                    className='landform-control' 
                    type="text"
                    id="contact" 
                    name="contact" 
                    value={formData.contact} 
                    onChange={handleChange} 
                />
            </div>
            <div className="landform-group">
                <label className="landform-label" htmlFor="address">Address:</label>
                <input 
                    className='landform-control' 
                    type="text"
                    id="address" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange} 
                />
            </div>
            <div className="landform-group">
                <label className="landform-label" htmlFor="landSize">Land Size:</label>
                <input 
                    className='landform-control' 
                    type="text"
                    id="landSize" 
                    name="landSize" 
                    value={formData.landSize} 
                    onChange={handleChange} 
                />
            </div>
            <div className="landform-group">
                <label className="landform-label" htmlFor="soilType">Soil Type:</label>
                <input 
                    className='landform-control' 
                    type="text"
                    id="soilType" 
                    name="soilType" 
                    value={formData.soilType} 
                    onChange={handleChange} 
                />
            </div>
            <div className="landform-group">
                <label className="landform-label" htmlFor="cropCultivated">Crop Cultivated:</label>
                <input 
                    className='landform-control' 
                    type="text"
                    id="cropCultivated" 
                    name="cropCultivated" 
                    value={formData.cropCultivated} 
                    onChange={handleChange} 
                />
            </div>
            <div className="landform-group">
                <label className="landform-label" htmlFor="agriculturalLoan">Agricultural Loan:</label>
                <input 
                    className='landform-control' 
                    type="text"
                    id="agriculturalLoan" 
                    name="agriculturalLoan" 
                    value={formData.agriculturalLoan} 
                    onChange={handleChange} 
                />
            </div>
            <div className="landform-group">
                <label className="landform-label" htmlFor="latitude">Latitude:</label>
                <input 
                    className='landform-control' 
                    type="text"
                    id="latitude" 
                    name="latitude" 
                    value={formData.latitude} 
                    onChange={handleChange} 
                />
            </div>
            <div className="landform-group">
                <label className="landform-label" htmlFor="longitude">Longitude:</label>
                <input 
                    className='landform-control' 
                    type="text"
                    id="longitude" 
                    name="longitude" 
                    value={formData.longitude} 
                    onChange={handleChange} 
                />
            </div>
            <div className="landform-group">
                <label className="landform-label" htmlFor="cropPrice">Price of Cultivated Crop:</label>
                <input 
                    className='landform-control' 
                    type="text"
                    id="cropPrice" 
                    name="cropPrice" 
                    value={formData.cropPrice} 
                    onChange={handleChange} 
                />
            </div>
            <div className="landform-submit-container">
                <button className="landform-submit-btn" type="submit" onClick={handleSubmit}>Submit</button>
            </div>
        </form>
    );
};

export default LandForm;
