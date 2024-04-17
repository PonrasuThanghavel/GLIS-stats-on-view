import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/animations/loading.json';
import { FaTrash } from 'react-icons/fa';
import './css/landview.css';

const Landview = () => {
    const [landData, setLandData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchLandData();
    }, []);

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

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            const response = await axios.delete(`http://localhost:4000/api/agri/delete/${id}`);
            console.log(response.data);
            fetchLandData();
        } catch (error) {
            console.error("Error deleting land:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='LandView'>
            {loading ? (
                <div className="loading-animation">
                    <Lottie animationData={loadingAnimation} loop autoplay />
                </div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <div>
                    <h1 className='landview-header'>Land Information</h1>
                    {landData.map((land, index) => (
                    <div key={index} className="land-info">
                    <div className="table-container">
                        <div className="left-table">
                            <h2>Land {index + 1}</h2>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Owner's Name:</td>
                                        <td>{land.ownerName}</td>
                                    </tr>
                                    <tr>
                                        <td>Contact Person:</td>
                                        <td>{land.contact}</td>
                                    </tr>
                                    <tr>
                                        <td>Phone Number:</td>
                                        <td>{land.phoneNumber}</td>
                                    </tr>
                                    <tr>
                                        <td>Address:</td>
                                        <td>{land.address}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="right-table">
                            <h3>Land Details</h3>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Land Size:</td>
                                        <td>{land.landSize}</td>
                                    </tr>
                                    <tr>
                                        <td>Soil Type:</td>
                                        <td>{land.soilType}</td>
                                    </tr>
                                    <tr>
                                        <td>Crop Cultivated:</td>
                                        <td>{land.cropCultivated}</td>
                                    </tr>
                                    <tr>
                                        <td>Agricultural Loan:</td>
                                        <td>{land.agriculturalLoan}</td>
                                    </tr>
                                    <tr>
                                        <td>Latitude:</td>
                                        <td>{land.latitude}</td>
                                    </tr>
                                    <tr>
                                        <td>Longitude:</td>
                                        <td>{land.longitude}</td>
                                    </tr>
                                    <tr>
                                        <td>Price of Cultivated Crop:</td>
                                        <td>{land.cropPrice}</td>
                                    </tr>
                                </tbody>
                            </table>
                            
                        </div>
                    </div>
                    <div className="landview-trash-btn">
                                <button onClick={() => handleDelete(land._id)}><FaTrash/></button>
                    </div>
                </div>
                                   
                    ))}
                </div>
            )}
        </div>
    );
};

export default Landview;
