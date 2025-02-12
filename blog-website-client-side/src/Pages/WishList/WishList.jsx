import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true); // To track loading state
  const { user } = useContext(AuthContext);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://blog-website-server-side.vercel.app/wishlist/${params.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setWishlist(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the wishlist!");
        setLoading(false);
      });
  }, [params.id]);

  const handleRemoveFromWishlist = async (blogId) => {
    try {
      await axios.delete("https://blog-website-server-side.vercel.app/wishlist", {
        data: {
          userEmail: user?.email,
          blogId,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Removed from Wishlist",
        text: "The blog has been removed from your wishlist successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      setWishlist(wishlist.filter((blog) => blog._id !== blogId));
    } catch (error) {
      console.error("Error removing from wishlist");
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "There was an error removing the blog from your wishlist.",
      });
    }
  };

  const handleViewDetails = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  return (
    <div className="container mx-auto px-6 min-h-screen pt-8 pb-12">
      <h1 className="text-3xl font-semibold text-center my-6 pb-8">My Wishlist</h1>

      {loading ? (
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 justify-center items-center">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="border shadow-lg rounded p-8">
                <Skeleton height={200} />
                <Skeleton width="80%" className="mt-4" />
                <Skeleton width="60%" className="mt-2" />
                <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
                  <Skeleton width={120} height={40} />
                  <Skeleton width={120} height={40} />
                </div>
              </div>
            ))}
        </div>
      ) : wishlist.length === 0 ? (
      
        <p className="text-center text-lg">No blogs in your wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 justify-center items-center">
          {wishlist.map((blog) => (
            <div key={blog._id} className="border shadow-lg rounded p-8 dark:border-gray-700 dark:bg-gray-900/30">
              <h3 className="text-xl font-semibold dark:text-gray-300">{blog.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Category: {blog.category}</p>
              <p className="text-gray-600 dark:text-gray-400">Author: {blog.authorName}</p>
              <div className="flex justify-between items-center mt-4 flex-wrap gap-2 ">
                <button
                  className="bg-primary text-white px-3 py-2 rounded"
                  onClick={() => handleViewDetails(blog._id)}
                >
                  View Details
                </button>
                <button
                  className="bg-red-400 text-white px-4 py-2 rounded"
                  onClick={() => handleRemoveFromWishlist(blog._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
