import style from './VerifyCode.module.css'
import React from 'react'
import { Formik, useFormik, validateYupSchema } from "formik";
import {  useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function VerifyCode() {
 
  
    const schema = Yup.object().shape({
      resetCode: Yup.string()
        .required("the email is required ")
      
    });
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {}, []);
    const x = useFormik({
      initialValues: {
        resetCode: "",
      },
      onSubmit: handleVerifyCode,
      validationSchema: schema,
    });
  
    async function handleVerifyCode(values) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
           values 
        );
        if (response.data.statusMsg == "success") {
          navigate("VerifyCode");
        }
        console.log(response);
      } catch (error) {
        setErrMsg(error.response.data.message);
        console.log(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    }
  
    return (
      <div className="">
        <h2>reset your account password</h2>
  
        <form className="mx-auto mt-5" onSubmit={x.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={x.values.resetCode}
              onChange={x.handleChange}
              onBlur={x.handleBlur}
              type="text"
              name="resetCode"
              id="resetCode"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="resetCode"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              resetCode 
            </label>
            {x.errors.resetCode && x.touched.resetCode ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {x.errors.resetCode}
              </div>
            ) : null}
          </div>
  
          <button
            disabled={isLoading}
            type="submit"
            className="text-white disabled:bg-green-200 disabled:text-gray-500 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : "Verify"}
          </button>
        </form>
      </div>
    );
  }
  

