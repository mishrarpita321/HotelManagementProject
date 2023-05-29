import { useContext, useState } from "react"
import { AuthPageContext } from "src/context/AuthPageContext";

export default function Login({  }) {
  const [page, setPage] = useContext(AuthPageContext);

  return (
    <>
      <div style={{ background: "unset" }} className="login">
        <div style={{ display: "block", position: "unset", transform: "unset", width: "unset", borderRadius:"12px" }} className="container">
          {/* <label
            onClick={onClick}
            className="close-btn LoginCloseBtn" title="close">
            ×
          </label> */}
          {/* <div onClick={onClick}>x</div> */}
          {/* <button onClick={onClick} >Close</button> */}
          <h1>Welcome</h1>
          <form action="#">
            <label>Email or Phone</label>
            <input type="text" />
            <label>Password</label>
            <input type="password" />
            <button>Submit</button>
            <div className="forgetpwd"><a href="#">Forgot Password?</a></div>
            <div className="link">
              Not a member? <a href="#" onClick={() => setPage("registration")} >Sigup here</a>
            </div>
            <closeform />
          </form>
        </div>
      </div>

    </>
  )
}