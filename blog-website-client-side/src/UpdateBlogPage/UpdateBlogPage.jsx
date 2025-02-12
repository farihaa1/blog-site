import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";

const UpdateBlogPage = () => {
  const params = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: "",
    category: "",
    shortDescription: "",
    longDescription: "",
    imageUrl: "",
    tags: "",
    createDate: "",
    createTime: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await axios.get(
          `https://blog-website-server-side.vercel.app/blogs/${params.id}`,
          {
            withCredentials: true,
          }
        );
        setBlogData(res.data);
      } catch (error) {
        Swal.fire("Error", "Failed to load blog data", "error");
        navigate("/blogs"); 
      }
    };
    fetchBlogData();
  }, [params.id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      ...blogData,
      tags:
        typeof blogData.tags === "string"
          ? blogData.tags.split(",").map((tag) => tag.trim())
          : blogData.tags,
      updatedDate: new Date().toLocaleDateString(),
      updatedTime: new Date().toLocaleTimeString(),
    };
    setLoading(true);
    try {
      const res = await axios.put(
        `https://blog-website-server-side.vercel.app/blogs/${params.id}`,
        updatedData
      );
      Swal.fire("Success", "Blog updated successfully", "success");
      navigate(`/blogs/${params.id}`);
    } catch (error) {
     
      Swal.fire("Error", "Failed to update blog", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Update Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={blogData.title}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Image URL
          </label>
          <input
            type="text"
            name="imageUrl"
            value={blogData.imageUrl}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <select
            value={blogData.category}
            onChange={handleChange}
            name="category"
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Education">Education</option>
            <option value="Travel">Travel</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Short Description
          </label>
          <textarea
            name="shortDescription"
            value={blogData.shortDescription}
            onChange={handleChange}
            rows="3"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Long Description
          </label>
          <textarea
            name="longDescription"
            value={blogData.longDescription}
            onChange={handleChange}
            rows="6"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Tags (comma separated)
          </label>
          <input
            type="text"
            name="tags"
            value={blogData.tags}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            placeholder="e.g. React, JavaScript"
          />
        </div>

        <button
          type="submit"
          className="bg-primary mt-6 mb-4 text-white px-6 py-2 rounded "
        >
          Update Blog
        </button>
        <Link
          to={`/blogs/${blogData._id}`}
          className="bg-red-400 mt-6 mb-4 text-white px-6 py-2 rounded  ml-4"
        >
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default UpdateBlogPage;
