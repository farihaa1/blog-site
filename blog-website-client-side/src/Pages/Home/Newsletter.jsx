import React, { useState } from "react";
import Swal from "sweetalert2";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Please enter a valid email address.",
      });
      return;
    }

 

    Swal.fire({
      icon: "success",
      title: "Subscribed!",
      text: `You have successfully subscribed to the Chill Gamer newsletter with the email: ${email}`,
    });

    setEmail("");
  };

  return (
    <div id="newsletter-section" className="max-w-lg  lg:max-w-2xl mx-auto pb-8 mb-8 md:mb-12 px-6 ">
      <h2 className="text-3xl font-bold text-center mb-6 dark:text-gray-200">Subscribe to Our Newsletter</h2>
      <p className="para text-gray-600 text-center mb-6 md:mb-16">
      Get the latest updates, news, and exclusive content straight to your inbox. 
      Don’t miss out on important announcements and exciting new blogs.</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full max-w-md px-4 py-2 border rounded text-gray-700 dark:text-gray-300 dark:bg-gray-800 border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-primary to-btn1 text-white px-6 py-3 rounded w-full max-w-md font-semibold"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
