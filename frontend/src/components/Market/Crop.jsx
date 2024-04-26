// Crop.js
import React from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import './css/Crop.css';

const Crop = ({ crop, quantity, incrementQuantity, decrementQuantity, deleteCrop }) => {
  return (
    <div className='Crop-box'>
      <h3 className='Crop-name'>{crop.Name} (₹ {crop.Price})</h3>
      <button className='Crop-trash-btn' onClick={deleteCrop}><FaTrash /></button>
      <div className='Crop-quantity-box'>
        <button className='Crop-quantity-btn' onClick={incrementQuantity}> <FaPlus/> </button>
        <h3 className='Crop-quantity'>{quantity}</h3>
        <button className='Crop-quantity-btn' onClick={decrementQuantity}> <FaMinus/> </button>
      </div>
    </div>
  );
};

export default Crop;
