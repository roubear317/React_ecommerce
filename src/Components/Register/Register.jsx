import { Formik, useFormik, validateYupSchema } from "formik";
import style from "./Register.module.css";

import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserContextProvider, { UserContext } from "../../Context/UserContext/UserContext";
export default function Register() {
  
  const {setToken}=useContext(UserContext)
  const schema = Yup.object().shape({
    name: Yup.string()
      .required("the Name is required ")
      .min(3, "the length must be greater than 3")
      .max(10, "the length must not exceed 10"),
    email: Yup.string()
      .required("the email is required ")
      .email("email is not valid"),
    password: Yup.string()
      .required("Passward is required")
      .matches(/^[A-Z].{5,}/, "must Start with uppercase and not less than 5"),
    rePassword: Yup.string()
      .required("rePassward is required")
      .oneOf([Yup.ref("password")], "repassward must matches the passward"),
    Phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "the phone must be Egyptian number"),
  });
 const navigate = useNavigate();
  const [errMsg,setErrMsg] = useState('')
  const [isLoading,setIsLoading] = useState(false)
  useEffect(() => {}, []);
  const x = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      Phone: "",
    },
    onSubmit: handleSubmit,
    validationSchema: schema,
  });
  async function handleSubmit(values) {
    setIsLoading(true)
    try {
      const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
      if(data.message=='success'){
        navigate('/')
        setToken(data.token)
      }
      console.log(res);
    } catch (error) {
     
      
      setErrMsg(error.response.data.message)
      console.log(error.response.data.message);
    }finally{
      setIsLoading(false)
    }
    
  }
  return (
    <div className="">
      <h2>Register</h2>
      {errMsg ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {errMsg}
            </div>
          ) : null}




      <form className="mx-auto mt-5" onSubmit={x.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={x.values.name}
            onChange={x.handleChange}
            onBlur={x.handleBlur}
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />

          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            UserName:{" "}
          </label>
          {x.errors.name && x.touched.name ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {x.errors.name}
            </div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            value={x.values.email}
            onChange={x.handleChange}
            onBlur={x.handleBlur}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {x.errors.email && x.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {x.errors.email}
            </div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            value={x.values.password}
            onChange={x.handleChange}
            onBlur={x.handleBlur}
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {x.errors.password && x.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {x.errors.password}
            </div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            value={x.values.rePassword}
            onChange={x.handleChange}
            onBlur={x.handleBlur}
            type="password"
            name="rePassword"
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            rePassword
          </label>
          {x.errors.rePassword && x.touched.rePassword ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {x.errors.rePassword}
            </div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            value={x.values.Phone}
            onChange={x.handleChange}
            onBlur={x.handleBlur}
            type="tel"
            name="Phone"
            id="Phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="Phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone
          </label>
          {x.errors.Phone && x.touched.Phone ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {x.errors.Phone}
            </div>
          ) : null}
        </div>

        <button
        disabled={isLoading}
          type="submit"
          className="text-white disabled:bg-green-200 disabled:text-gray-500 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
         {isLoading ? <FaSpinner className="animate-spin"/> : "submit"}
        </button>
      </form>
    </div>
  );
}
