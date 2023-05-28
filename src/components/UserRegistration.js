import { useState } from "react"

export default function UserRegistration({ showLogin, setShowLogin, setFormStep }) {

  // const [showLogin, setShowLogin] = useState();
  const onClick = () => {
    setFormStep(1)
    setShowLogin(false)
  }


  return (
    <>
      {showLogin ? (
        <>
          <div className="login">
            <div style={{ display: "block" }} className="container">
              <label
                onClick={onClick}
                className="close-btn LoginCloseBtn" title="close">
                ×
              </label>
              {/* <div onClick={onClick}>x</div> */}
              {/* <button onClick={onClick} >Close</button> */}
              <h1>Registration</h1>
              <form action="#">
                <label>Full Name</label>
                <input type="text" />
                <label>Email</label>
                <input type="email"/>
                <label>Contact Number</label>
                <input type="tel" id="phone" name="phone" placeholder="49 123 456789321" pattern="[0-9]{2} [0-9]{3} [0-9]{8}"></input>
                <label>Date of Birth</label> 
                <input type="date"/>
                <label>UserName</label>
                <input type="text" />
                <label>Password</label>
                <input type="password" />
                <button>Submit</button>
                <div className="forgetpwd"><a href="#" >Forgot Password?</a></div>
                <div className="link">
                  Already a member? <a href="#" onClick={() => setFormStep(1)}>Sigin here</a>
                </div>
                <closeform />
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
        </>
      )
      }

    </>
  )
}