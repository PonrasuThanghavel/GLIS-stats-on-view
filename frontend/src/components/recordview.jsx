import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './css/recordview.css'; // Import CSS file for styling

const Recordview = () => { // Accept id as a parameter
    // const [record, setRecord] = useState(null);

    const { id } = useParams();
    const [record, setRecord] = useState(null);

    useEffect(() => {
        fetchRecord(id);
    }, [id]);
    const fetchRecord = async (id) => { // Receive id as a parameter
        try {
            const response = await axios.get(`https://glis-backend.onrender.com/api/bus-stations/${id}`); // Use id in the URL
            console.log(response.data);
            setRecord(response.data); 
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='record-container'>
            {record && (
                <div className='record-list'>
                    <h1>GENERAL INFO</h1>
                    <ul>
                        <li>
                            <table className='record-table'>
                                <tbody>
                                    <tr>
                                        <td>ID:</td>
                                        <td>{record.ID}</td>
                                    </tr>
                                    <tr>
                                        <td>Name:</td>
                                        <td>{record.Name}</td>
                                    </tr>
                                    <tr>
                                        <td>Local Body:</td>
                                        <td>{record.Local}</td>
                                    </tr>
                                    <tr>
                                        <td>Region:</td>
                                        <td>{record.Reg}</td>
                                    </tr>
                                    <tr>
                                        <td>Revenue:</td>
                                        <td>{record.Rev}</td>
                                    </tr>
                                    <tr>
                                        <td>Commercial Zone:</td>
                                        <td>{record.Zone_type}</td>
                                    </tr>
                                    <tr>
                                        <td>Year:</td>
                                        <td>{record.Year}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </li>
                    </ul>
                    <h1>RISK INFO</h1>
                    <ul>
                        <li>
                            <table className='record-table'>
                                <tbody>
                                    <tr>
                                        <td>Flood risk score:</td>
                                        <td>{record.FloodRiskScore}</td>
                                    </tr>
                                    <tr>
                                        <td>Flood zone:</td>
                                        <td>{record.FloodZone}</td>
                                    </tr>
                                    <tr>
                                        <td>Elevation:</td>
                                        <td>{record.Elevation}</td>
                                    </tr>
                                    <tr>
                                        <td>Distance To WaterBodies:</td>
                                        <td>{record.DistanceToWaterBodies}</td>
                                    </tr>
                                    <tr>
                                        <td>Historical Flood Events:</td>
                                        <td>{record.HistoricalFloodEvents}</td>
                                    </tr>
                                    <tr>
                                        <td>Flood Protection Measures:</td>
                                        <td>{record.FloodProtectionMeasures}</td>
                                    </tr>
                                    <tr>
                                        <td>Soil Type:</td>
                                        <td>{record.SoilType}</td>
                                    </tr>
                                    <tr>
                                        <td>VegetationCover:</td>
                                        <td>{record.VegetationCover}</td>
                                    </tr>
                                    <tr>
                                        <td>UrbanizationLevel:</td>
                                        <td>{record.UrbanizationLevel}</td>
                                    </tr>
                                    <tr>
                                        <td>ClimateData:</td>
                                        <td>{record.ClimateData}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Recordview;
