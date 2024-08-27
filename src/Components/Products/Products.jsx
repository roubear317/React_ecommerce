import style from './Products.module.css'
import ProductItem from '../ProductItem/ProductItem'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Loading from '../Loading/Loading'
import axios from 'axios'
import useProduct from '../../Hooks/useProduct'
export default function Products() {
  const { data: products, error, isLoading, isError } = useProduct();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = products ? products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

 
  const displayedProducts = searchTerm ? filteredData : products || [];

  if (isLoading) {
    return <Loading />;
  } else if (isError) {
    return <h2>{JSON.stringify(error)}</h2>;
  } else {
    return (
      <>
     
        <div className="flex justify-center mb-6 mt-4">
          <input
            type="text"
            placeholder="Search by product name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        
        <div className="grid gap-4 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {displayedProducts.length === 0 ? (
            <p>No products found</p>
          ) : (
            displayedProducts.map((p) => (
              <ProductItem key={p._id} product={p} />
            ))
          )}
        </div>
      </>
    );
  }
}