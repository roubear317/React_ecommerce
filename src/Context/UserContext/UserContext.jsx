import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();
export default function UserContextProvider(props) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    // token
    //   ? localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmQ1MDU2ZWQwZGMwMDE2YzY0ZGNmYiIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzI0MzQ3MjU4LCJleHAiOjE3MzIxMjMyNTh9.Bnub3C4RfBLRh0WTMo91sT_SjWOdlBHUyrobTQ-no90")

    //   : localStorage.removeItem("token");
    token
      ? localStorage.setItem("token", token)
      : localStorage.removeItem("token");
  }, [token]);
  return (
    <UserContext.Provider value={{ token, setToken }}>
      {props.children}
    </UserContext.Provider>
  );
}
