import React, { useState } from "react";
// import { AuthPageContext } from "../../context/AuthPageContext";
import Login from "./Login";
import { AuthPageContext } from "src/context/AuthPageContext";
import UserRegistration from "./UserRegistration";
// import Register from "./Register";
// import RegisterMobile from "./RegisterMobile";
// import ForgotPassword from "./ForgotPassword";
// import LoginMobile from "./LoginMobile";

function AuthPages() {
  const [page, setPage] = useState("login");

  return (
    <AuthPageContext.Provider value={[page, setPage]}>
      {page === "login" && <Login />}
      {/* {page === "login-mobile" && <LoginMobile />} */}
      {page === "registration" && <UserRegistration />}
      {/* {page === "register-mobile" && <RegisterMobile />} */}
      {/* {page === "forgot-password" && <ForgotPassword />} */}
    </AuthPageContext.Provider>
  );
}

export default AuthPages;
