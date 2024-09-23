import React, {useState, useContext} from "react";
import Lottie from "react-lottie";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import LoginAnimation from "../assets/loading.json";
import { baseUrl } from "../baseUrl";
import logo from "../assets/logo.svg"
import coffeebg from "../assets/coffee-bg.png"
import {FiEye, FiEyeOff} from "react-icons/fi"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Enter your email"),
    password: Yup.string().required("Enter your password"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
    
      if (!response.ok) {
        console.log(response);
        throw new Error(response.message);
      }

      setSubmitting(false);
      const result = await response.json();
      const token = result.token;
      login(token);
      // localStorage.setItem("token", token);
      setLoading(false);
      setError(null);
      toast.success("Login successful", {
        onClose: () => {
          navigate("/");
        },
      });
      
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(err.message);
      toast.error("Login failed: " + err.message);
    }
  };

 

  return (
    <div className=" flex flex-col md:flex-row h-screen justify-center items-center">
      <div className="w-full h-full flex justify-between flex-col  bg-coffee">
        <img src={logo} alt="logo" className="w-1/4 px-4" />
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: LoginAnimation,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          // height={500}
          width={700}
          margin="0px"
        />
      </div>
      <div className="relative flex flex-col justify-center items-center gap-4 w-full h-full"
          style={{
           background: `url(${coffeebg}) no-repeat center center/cover`, 
          }}
      >
      <div className="flex flex-col justify-center items-center gap-1 w-full h-full bg-coffee-light bg-opacity-90 backdrop:blur ">

      <div className="flex flex-col justify-center items-center gap-1 my-2"
        
      >
        <h1 className="text-4xl font-bold">Welcome to Mug & Mingle</h1>
        <p className="text-lg">
          Please login to continue
        </p>
      </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          className=""
        >
          <Form className="flex flex-col px-5 space-y-4 w-3/5 ">
            <div>
              <label htmlFor="email">Email:</label>
              <Field
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
                type="email"
                id="email"
                name="email"
              />
              <ErrorMessage name="email" component="p" className="text-sm text-red-600" />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <div className="relative">
                <Field
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                />
                <span
                  className="absolute right-2 top-4 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
                
              <ErrorMessage name="password" component="p" className="text-sm text-red-600" />
            </div>
            {/*  display error message */}
            {error && <p className="text-red-600">{error}</p>}
            <button
              className="bg-coffee hover:bg-coffee-dark text-white font-bold py-3 px-4 text-[18px] rounded-md"
              type="submit"
            >
              {loading ? "Getting User..." : "Login"}
            </button>
          </Form>
        </Formik>
      </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
