
import { useContext, useState } from "react"
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthPageContext } from "src/context/AuthPageContext";
import { useAuthProvider } from "src/context/AuthContext";
import NoCloseModal from "../modal/NoCloseModal";
import AlertModal from "../AlertModal";
import AlertModal2 from "../AlertModal2";
import AlertTest from "../Alert";
import { AlertContext } from "src/context/AlertContext";


export default function UserRegistration({ }) {
  const { showAlert } = useContext(AlertContext);



  const handleConfirmation = () => {
    showAlert('confirmation', 'Are you sure you want to proceed?');
  };

  const handleSuccess = () => {
    showAlert('success', 'Operation completed successfully!');
  };

  const handleError = () => {
    showAlert('error', 'An error occurred.');
  };




  const auth = useAuthProvider();
  const [page, setPage] = useContext(AuthPageContext);

  const [loginLoading, setLoginLoading] = useState(false)

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const schema = yup.object().shape({
    // email: yup.string().email().required("Email is a required field"),
    username: yup.string().required("Username is a required field"),
    phone: yup.string()
      .required("required")
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(11, "too short")
      .max(11, "too long"),
    password: yup.string().min(5).required("Password is a required field"),
    confirm_password: yup
      .string()
      .min(5)
      .required("Confirm Password is a required field")
      .oneOf([yup.ref("password")], "Password does not match"),
  });


  const defaultValues = {
    email: 'mahesh@gmail.com',
    password: 'mahesh',
    username: 'mahesh',
    confirm_password: 'mahesh',
    phone: '15735598680'
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




  const handleSignup = (data) => {
    // console.log('Hi submit is clicked')
    // alert('asdf')
    setLoginLoading(true)
    const { email, username, phone, password } = data;
    const formData=JSON.stringify( {
      email,
      username,
      phone,
      password
    })
    // let id = email;
    auth.handleRegistration( formData, (data) => {
      setLoginLoading(false)
      console.log('returned data:', data)
      if (data.message === "success") {
        onAlerSuccessHandle('Congratulation, your account is created.')
        // setEmail(id);
        // setStep(2);
      } else {
        console.log(data)
        if (data.message === "failed") {
          onAlertErrorHandle(data.error.message);
        } else {
          console.log(data.error)
          onAlertErrorHandle(data.error);
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
  // console.log(errors)



  const [showError, setShowError] = useState(true)


  const onAlertErrorHandle = (message) => {
    showAlert(
      'error',
      message,
      () => {
        console.log('Ok button Clicked');
      }
    )
  }
  const onAlerSuccessHandle = (message) => {
    showAlert(
      'success',
      message,
      () => {
      },
      () => {
      },
      () => {
        setPage("login")
      }
    )
  }
  // const onAlerConfirmationHandle = (type, error) => {
  //   showAlert(
  //     'confirmation',
  //     error,
  //     () => {
  //       console.log('button confirm');
  //     },
  //     () => {
  //       console.log('button cancel');
  //     }
  //   )
  // }









  return (
    <>
      <div style={{ background: "unset" }} className="login hide-scrollbar-component">
        <div style={{ display: "block", position: "unset", transform: "unset", width: "unset", borderRadius: "12px" }} className="container">
          <h1>Registration</h1>
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
                  // label="Email ID"
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
            <label>UserName</label>
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <input
                  disabled={loginLoading}
                  value={value}
                  onChange={onChange}
                  id="username"
                  type="text"
                // error={Boolean(errors.password)}
                />
              )}
            />
            {errors.username && (
              <p style={errorStyle} className="text-sm text-red-500">
                {errors.username.message}
              </p>
            )}
            <label>Contact Number</label>
            <Controller
              name="phone"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (


                <input
                  disabled={loginLoading}
                  value={value}
                  onChange={onChange}
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="49 123 456789321"
                // pattern="[0-9]{2} [0-9]{3} [0-9]{8}"
                // label="Email ID"

                // error={Boolean(errors.password)}
                />
              )}
            />
            {errors.phone && (
              <p style={errorStyle} className="text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
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
            <label>Confirm Password</label>
            <Controller
              name="confirm_password"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <input
                  disabled={loginLoading}
                  value={value}
                  onBlur={onBlur}
                  // label="Password"
                  onChange={onChange}
                  id="confirm_password"
                  // error={Boolean(errors.password)}
                  type="password"
                />
              )}
            />
            {errors.confirm_password && (
              <p style={errorStyle} className="text-sm text-red-500">
                {errors.confirm_password.message}
              </p>
            )}
            <button
              disabled={loginLoading}
              onClick={handleSubmit(handleSignup)}>
              Submit
            </button>
            <div className="forgetpwd"><a href="#" >Forgot Password?</a></div>
            <div className="link">
              Already a member? <a href="#" onClick={() => setPage("login")}>Sigin here</a>
            </div>
            <closeform />

          </form>

        </div>
      </div>
    </>
  )
}