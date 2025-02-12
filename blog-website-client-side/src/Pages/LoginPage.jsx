import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import googleImg from "../assets/google.png";

const LoginPage = () => {
  const {
    loginUser,
    handleGoogleLogin,
    loading,
    setLoading,
  } = useContext(AuthContext);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then((res) => {
        setError("");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError("Invalid email or password");
      });
  };

  

  

  const handleGoogleSignIn = () => {
    setLoading(true);
    handleGoogleLogin()
      .then((res) => {
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError("Failed to sign in with Google. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-4xl font-bold dark:text-gray-200">Welcome Back!</h1>
          <p className="py-6 w-8/12 mx-auto dark:text-gray-400">
            Log in to your account to access your dashboard, manage your posts,
            and interact with the community.
          </p>
        </div>
        <div className=" w-full max-w-sm shrink-0 shadow-2xl ">
          <form onSubmit={handleLogin} className="card-body  w-full">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text dark:text-white">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="input input-bordered dark:bg-gray-800 dark:border-gray-600 w-full dark:text-gray-300"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-white">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="input input-bordered dark:bg-gray-800 dark:border-gray-600 w-full dark:text-gray-300"
                required
              />
              <label className="label">
                <a
                  href="#"
                  className="label-text-alt dark:text-white link link-hover"
                >
                  Forgot password?
                </a>
              </label>
              {error && (
                <p className="text-red-500 text-center mb-2">{error}</p>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-primary text-white border-none">Login</button>
            </div>
          </form>
          <div className="divider mx-10"></div>
          <div className="text-center my-2 flex justify-center">
            
            <button
              onClick={handleGoogleSignIn}
              className="flex justify-center items-center gap-2 bg-base-200 px-4 py-2 rounded mb-6 mt-2"
              disabled={loading}
            >
              <img className="w-8 h-8" src={googleImg} alt="Google" />
              {loading ? "Signing in..." : "Google"}
            </button>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
