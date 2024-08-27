import { Formik, useFormik, validateYupSchema } from "formik";
import style from "./CheckOut.module.css";

import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import UserContextProvider, {
  UserContext,
} from "../../Context/UserContext/UserContext";
import { CartContext } from "../../Context/CartContext/CartContext";
export default function CheckOut() {



const{checkOutSession}=useContext(CartContext)




const{cartId}=useParams();




  const { setToken } = useContext(UserContext);
  const schema = Yup.object().shape({

      details:Yup.string()
      .required("details is required"),
        phone:Yup.string()
        .required("phone is required")
        .matches(/^01[0125][0-9]{8}$/, "the phone must be Egyptian number"),
        city: Yup.string()
        .required("city is required")
  });
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {}, []);
  const x = useFormik({
    initialValues: {
      details: "",
        phone: "",
        city: ""
    },
    onSubmit: handleSubmit,
    validationSchema: schema,
  });
  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      const response = await checkOutSession(cartId,values);
      if (response.data.status == "success") {
        console.log(response.data.session.url);
        window.location.href=response.data.session.url
        
      }
      console.log(res);
    } catch (error) {
      setErrMsg(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="">
      <h2>CheckOut</h2>
     

      <form className="mx-auto mt-5" onSubmit={x.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={x.values.details}
            onChange={x.handleChange}
            onBlur={x.handleBlur}
            type="text"
            name="details"
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            details
          </label>
          {x.errors.details && x.touched.details ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {x.errors.details}
            </div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            value={x.values.phone}
            onChange={x.handleChange}
            onBlur={x.handleBlur}
            type="tel"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
           User phone
          </label>
          {x.errors.phone && x.touched.phone ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {x.errors.phone}
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={x.values.city}
            onChange={x.handleChange}
            onBlur={x.handleBlur}
            type="text"
            name="city"
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
           User city
          </label>
          {x.errors.city && x.touched.city ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {x.errors.city}
            </div>
          ) : null}
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="text-white disabled:bg-green-200 disabled:text-gray-500 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLoading ? <FaSpinner className="animate-spin" /> : "Pay Now"}
        </button>
      </form>
    </div>
  );
}
