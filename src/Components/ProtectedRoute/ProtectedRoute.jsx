// import style from './ProtectedRoute.module.css'
// import UserContextProvider, { UserContext } from "../../Context/UserContext/UserContext";
// import React, { useContext, useEffect } from 'react'
// import { Navigate, useNavigate } from 'react-router-dom';

// export default function ProtectedRoute(props) {
//   const {token }=useContext(UserContext)
//   //const navigate = useNavigate();
//   if(token){
//     {props.children}

//   }else{
//    <Navigate to={'/Login'}></Navigate>
//   }
//   useEffect(() => {
    
//     }, [])
    
//   return (
//     <div>
      
//     </div>
//   )
// }
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from "../../Context/UserContext/UserContext";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(UserContext);

  if (!token) {
    // إذا لم يكن هناك توكن، نعيد التوجيه إلى صفحة تسجيل الدخول
    return <Navigate to="/Login" />;
  }

  // إذا كان هناك توكن، نعرض الـ children
  return <>{children}</>;
}

