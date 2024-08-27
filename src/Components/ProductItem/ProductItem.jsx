import { FaHeart, FaStar } from "react-icons/fa";
import style from "./ProductItem.module.css";

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext/CartContext";
import toast from "react-hot-toast";
import { wishListContext } from "../../Context/WishListContext/WishListContext";

export default function ProductItem({ product }) {
  const { addLoggedUserWish, deleteLoggedUserWish } =
    useContext(wishListContext);
  const { addItemToCart, setCartItem } = useContext(CartContext);
  const [isWishListed, setIsWishListed] = useState(false);
  async function addItem(id) {
    const response = await addItemToCart(id);
    console.log(response.data);
    if (response.data.status == "success") {
      setCartItem(response.data.numOfCartItems);
      toast.success("Item Added To Your Cart.");
    } else {
      toast.error("Failed to add item to your cart.");
    }
  }

  // async function addWishList(id) {
  //   try {
  //     const response = await addLoggedUserWish(id);
  //     console.log("Full response:", response);

  //     if (response && response.data) {
  //       console.log("response.data:", response.data);

  //       if (response.data.status === "success") {
  //         setIsWishListed(!isWishListed);
  //         toast.success("Item added to Wish List.");
  //       } else {
  //         console.error("Error: status is not success");
  //       }
  //     } else {
  //       console.error("Error: response.data is undefined");
  //     }
  //   } catch (error) {
  //     console.error("Error adding to wishlist:", error);
  //   }
  // }

  async function toggleWishList(id) {
    if (isWishListed) {
      const response = await deleteLoggedUserWish(id);
      if (response.data.status === "success") {
        setIsWishListed(false);
        toast.success("Item removed from Wish List.");
      } else {
        toast.error("Failed to remove item from Wish List.");
      }
    } else {
      const response = await addLoggedUserWish(id);
      if (response.data.status === "success") {
        setIsWishListed(true);
        toast.success("Item added to Wish List.");
      } else {
        toast.error("Failed to add item to Wish List.");
      }
    }
  }

  return (
    <div>
      <div className="group">
        <Link to={`/ProductDetails/${product._id}`}>
          <img
            src={product.imageCover}
            alt="Cover"
            className=" w-full object-cover"
          />
          <p className="text-sm text-green-600 my-2">{product.category.name}</p>
          <h3 className="text-green-600 my-3 h4">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </h3>

          <div className="flex justify-between">
            <p className="text-green-600">{product.price} EGY</p>
            <p className="text-green-600">
              {product.ratingsAverage}{" "}
              <FaStar className="text-yellow-400 inline-block" />
            </p>
          </div>
        </Link>
        <button
          onClick={() => toggleWishList(product._id)}
          className={`w-full ${
            isWishListed ? "text-red-600" : "text-gray-600"
          } `}
        >
          <FaHeart />
        </button>
        <button
          onClick={() => addItem(product._id)}
          className="w-full  translate-y-full  group-hover:translate-y-0 group-hover:opacity-100 opacity-0 rounded-md bg-green-500  text-white py-2 duration-500 transition-all "
        >
          add Cart
        </button>
      </div>
    </div>
  );
}
