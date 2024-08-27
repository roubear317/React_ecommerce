import style from './Brands.module.css'

// Brands.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading'
const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    
    axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      .then(response => {
        setBrands(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the brands!", error);
        setLoading(false);
      });
  }, []);
  
  if (loading) {
    return <Loading />;
  }
  
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Brands</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {brands.map(brand => (
          <div key={brand._id} className="bg-white border rounded-md shadow-md p-4">
            <img 
              src={brand.image} 
              alt={brand.name} 
              className="w-full h-32 object-contain mb-2" 
            />
            <h3 className="text-lg font-semibold text-green-600 text-center">{brand.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Brands;
