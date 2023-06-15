import { useContext, useState } from "react"
import { AuthPageContext } from "src/context/AuthPageContext";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthProvider } from "src/context/AuthContext";
import { Spinner } from "react-bootstrap";

export default function Login({ }) {
  const [page, setPage] = useContext(AuthPageContext);
  const [loginLoading, setLoginLoading] = useState(false)

  const auth = useAuthProvider();
  console.log('tracking the value of loading', loginLoading)

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is a required field"),
    password: yup.string().min(4).required("Password is a required field"),
  });

  const defaultValues = {
    email: '',
    password: '',
  }

  const {
    watch,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });


  const changeLoginStaate = (value) => {
    console.log(value)
    setLoginLoading(value)
  }




  const handleLogin = (data) => {
    setLoginLoading(true)
    const { email, password } = data;
    auth.handleLogin({ email, password }, (data) => {
      setLoginLoading(false)
      if (data.message === "success") {
        setLoginLoading(false)
      } else {
        setLoginLoading(false)
        if (data.message === "failed") {
          if (data.type === 1) {
            setError("password", {
              // type: 'manual',
              message: data.error.message,
            });
          } else {
            setError("email", {
              // type: 'manual',
              message: data.error.message,
            });
          }
        } else {
          setError("different", {
            // type: 'manual',
            message: data.error,
          });
        }
      }
    });
  };

  const errorStyle = {
    color: 'red',
    // fontWeight: 'bold',
    fontSize: '15px',
    margin: '0px 9px',
  };
  console.log(errors)


  return (
    <>
      <div style={{ background: "unset" }} className="login">
        <div style={{ display: "block", position: "unset", transform: "unset", width: "unset", borderRadius: "12px" }} className="container">
          {/* <label
            onClick={onClick}
            className="close-btn LoginCloseBtn" title="close">
            ×
          </label> */}
          {/* <div onClick={onClick}>x</div> */}
          {/* <button onClick={onClick} >Close</button> */}
          <h1 onClick={() => setLoginLoading(true)}>Welcome</h1>
          <form action="#">
            <label>Email</label>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <input
                  disabled={loginLoading}
                  value={value}
                  onChange={onChange}
                  label="Email ID"
                  id="email"
                  type="text"
                // error={Boolean(errors.password)}
                />
              )}
            />
            {errors.email && (
              <p style={errorStyle} className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}

            {/* <input type="text" /> */}
            <label>Password</label>
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <input
                  disabled={loginLoading}
                  value={value}
                  onBlur={onBlur}
                  label="Password"
                  onChange={onChange}
                  id="password"
                  // error={Boolean(errors.password)}
                  type="password"
                />
              )}
            />
            {errors.password && (
              <p style={errorStyle} className="text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
            {/* <input type="password" /> */}
            <button
              disabled={loginLoading}
              onClick={handleSubmit(handleLogin)}>
              {
                loginLoading ? (<Spinner size='sm' />) : ('Submit')
              }
            </button>
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