import axios from "axios";
import style from "./Categories.module.css";
import Loading from "../Loading/Loading";
import React, { useEffect, useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [specificCategory, setSpecificCategory] = useState(null);

  const getSpecificCategories = async (id) => {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${id}`
      );
      setSpecificCategory(response.data.data);

      const productsResponse = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setProducts(productsResponse.data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/categories"
        );
        setCategories(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading)
    return (
      <div className="text-center">
        <Loading />
      </div>
    );
  if (error) return <div className="text-center text-red-500">{error}</div>;

  const filteredProducts = specificCategory
    ? products
        .filter((product) => product.category.name === specificCategory.name)
        .reduce((uniqueProducts, product) => {
          if (!uniqueProducts.find((p) => p.title === product.title)) {
            uniqueProducts.push(product);
          }
          return uniqueProducts;
        }, [])
    : [];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {categories.map((category) => (
          <div
            key={category._id}
            onClick={() => getSpecificCategories(category._id)}
            className="bg-white shadow-lg rounded-lg overflow-hidden w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 cursor-pointer"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
            <div className="p-2">
              <h3 className="text-sm font-semibold truncate">
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {specificCategory && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow text-lg font-bold text-green-600">
          <h2>{specificCategory.name}</h2>
          <div>
            {filteredProducts.map((filteredProduct) => (
              <div key={filteredProduct._id}>
                <h3>{filteredProduct.title}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
