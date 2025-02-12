import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";

const AddBlog = () => {
  const [blog, setBlog] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("https://blog-website-server-side.vercel.app/blogs")
      .then((res) => res.json())
      .then((data) => setBlog(data));
  }, []);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const imageUrl = form.imageUrl.value;
    const category = form.category.value;
    const shortDescription = form.shortDescription.value;
    const longDescription = form.longDescription.value;
    const tags = form.tags.value.split(",").map((tag) => tag.trim());
    const createDate = new Date().toISOString().split("T")[0];
    const createdTime = new Date().toLocaleTimeString("en-US", {
      hour12: false,
    }); 

    const authorName = user.displayName || "Anonymous";
    const authorEmail = user.email;

    const blogData = {
      title,
      imageUrl,
      category,
      shortDescription,
      longDescription,
      tags,
      createDate,
      createdTime,
      authorEmail,
      authorName,
    };

    try {
      const res = await axios.post(
        "https://blog-website-server-side.vercel.app/blogs",
        blogData,
        {
          withCredentials: true,
        }
      );
      const newBlog = res.data;

      setBlog([...blog, newBlog]);

      Swal.fire({
        icon: "success",
        title: "Blog Added",
        text: "Your blog has been added successfully!",
      });

      navigate("/all-blogs");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 py-6 lg:py-12 px-6 mb-12 dark:text-gray-300 ">
      <h1 className="text-2xl font-bold mb-10 my-6 text-center text-primary ">
        Add a New Blog
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            className="w-full input input-bordered rounded border-gray-300 dark:text-gray-600 p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            className="w-full input input-bordered rounded dark:text-gray-600 border-gray-300 p-2"
            required
          />
        </div>
        <div className="">
          <label className="block font-medium ">Category</label>
          <select
            name="category"
            className="w-full input input-bordered  border-gray-300 dark:text-gray-600 p-2 rounded"
          >
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Education">Education</option>
            <option value="Travel">Travel</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Short Description</label>
          <textarea
            name="shortDescription"
            rows="3"
            className="w-full input input-bordered dark:text-gray-600 border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Long Description</label>
          <textarea
            name="longDescription"
            rows="6"
            className="w-full input input-bordered textarea dark:text-gray-600 border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            className="w-full border dark:text-gray-600 border-gray-300 p-2 rounded"
            placeholder="e.g. React, JavaScript, Web Development"
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
