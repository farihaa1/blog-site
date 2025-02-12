import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = useContext(AuthContext);
const [error, setError] = useState('')

  const [loading, setLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    const fullPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (!fullPasswordRegex.test(password)) {
      setError("Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 6 characters long.")
      setLoading(false);
      return;
    }

    createUser(email, password)
      .then(() => {
        updateUserProfile(name, photo)
          .then(() => {
            const newUser = { name, email, photo };

            axios
              .post(
                "https://blog-website-server-side.vercel.app/users",
                newUser
              )
              .then((res) => {
                if (res.data.insertedId) {
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Registration successful!",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  form.reset();
                  navigate("/");
                } else {
                  throw new Error("Failed to save user to database");
                }
              })
              .catch((err) => {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Could not save user data. Please try again later.",
                });
              })
              .finally(() => setLoading(false));
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Could not update profile. Please try again.",
            });
            setLoading(false);
          });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Could not create user. Please check your credentials.",
        });
        setLoading(false);
      });
  };

  return (
    <div className="hero min-h-screen pt-12 pb-12">
      <div className="hero-content flex-col">
        <div className="text-center pb-2">
          <h1 className="text-3xl font-bold dark:text-gray-300">Join Our Blogging Community!</h1>
          <p className="py-5 w-8/12 mx-auto text-text dark:text-gray-400">
            Create an account to share your stories, interact with other
            bloggers, and grow your online presence.
          </p>
        </div>
        <div className=" w-full max-w-sm shrink-0 shadow-2xl dark:text-gray-400">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="dark:text-gray-300">Name</span>
              </label>
              <input
                type="text"
                placeholder="Jhon Doe"
                name="name"
                className="input input-bordered dark:bg-gray-800 dark:border-gray-600 w-full dark:text-gray-300"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="dark:text-gray-300">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="jhon12@gmail.com"
                className="input input-bordered dark:bg-gray-800 dark:border-gray-600 w-full dark:text-gray-300"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="dark:text-gray-300">Photo URL</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="http://www.example.com"
                className="input input-bordered dark:bg-gray-800 dark:border-gray-600 w-full dark:text-gray-300"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="dark:text-gray-300">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered dark:bg-gray-800 dark:border-gray-600 w-full dark:text-gray-300"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn bg-primary text-white border-none ${
                  loading ? "loading" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
            <label className="label">
              <p className="text-center text-gray-600 dark:text-gray-300">
                Already have an account?{" "}
                <Link className="text-blue-500 primary" to="/login">
                  Login
                </Link>
              </p>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
