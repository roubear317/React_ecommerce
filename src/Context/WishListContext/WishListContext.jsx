import axios from "axios";
import React, { createContext } from "react";
import { useState } from "react";

export const wishListContext = createContext();

export default function WishListContextProvider({ children }) {
  const token = localStorage.getItem("token");
  console.log("Token:", token);
  const headers = {
    token,
  };

  function getLoggedUserWish() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers })
      .then((data) => data)
      .catch((err) => {
        console.error("Error fetching wishlist:", err);
        return { data: { status: "fail", message: "An error occurred" } };
      });
  }

  function addLoggedUserWish(id) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId: id },
        { headers }
      )
      .then((data) => data)
      .catch((err) => {
        console.error("Error adding to wishlist:", err);
        return { data: { status: "fail", message: "An error occurred" } };
      });
  }

  function deleteLoggedUserWish(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers })
      .then((data) => data)
      .catch((err) => {
        console.error("Error deleting from wishlist:", err);
        return { data: { status: "fail", message: "An error occurred" } };
      });
  }

  return (
    <wishListContext.Provider
      value={{ getLoggedUserWish, addLoggedUserWish, deleteLoggedUserWish }}
    >
      {children}
    </wishListContext.Provider>
  );
}
