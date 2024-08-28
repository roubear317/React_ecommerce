import React, { useContext, useEffect, useState } from "react";
import style from "./WishList.module.css";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";
//import WishListContext from "../../Context/WishListContext/WishListContext";
import WishListItem from "../WishListItem/WishListItem";
import { wishListContext } from "../../Context/WishListContext/WishListContext";
export default function WishList() {
  const { getLoggedUserWish, deleteLoggedUserWish } =
    useContext(wishListContext);
  const [wishList, setWishList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getWishList() {
    try {
      const response = await getLoggedUserWish();
      if (response && response.data && response.data.status === "success") {
        setWishList(response.data);
      } else {
        console.error("Error: status is not success");
      }
    } catch (error) {
      console.error("Error fetching wish list details:", error);
      setError(error.message);
    }
  }

  async function deleteWishList(id) {
    try {
      const response = await deleteLoggedUserWish(id);
      console.log("Full response:", response);

      if (response && response.data) {
        console.log("response.data:", response.data);

        if (response.data.status === "success") {
          setWishList(response.data);
          getWishList()
          toast.success("Item Removed.");
        } else {
          console.error("Error: status is not success");
        }
      } else {
        console.error("Error: response.data is undefined");
      }
    } catch (error) {
      console.error("Error fetching cart details:", error);
    }
  }

  useEffect(() => {
    setLoading(true);
    try {
      getWishList();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading)
    return (
      <div className="text-center">
        <Loading />
      </div>
    );
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <h2 className="text-green-600 my-3">Wish List</h2>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-md">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
  {wishList && wishList.data && wishList.data.length > 0 ? (
    wishList.data.map((p) => (
      <WishListItem
        key={p._id}
        count={p.count}
        price={p.price}
        product={p} 
        deleteWishList={() => deleteWishList(p._id)}
      />
    ))
  ) : (
    <tr>
      <td colSpan="4" className="text-center">
        No items in the wishlist.
      </td>
    </tr>
  )}
</tbody>
</table>
    </div>
  );
}
