import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const BlogDetails = () => {
  const blogDetails = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const res = await axios.get(
      `https://blog-website-server-side.vercel.app/comments/${blogDetails._id}`
    );
    setComments(res.data);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentData = {
      blogId: blogDetails._id,
      userName: user.displayName,
      userProfilePicture: user.photoURL,
      content: newComment.trim(),
      createdAt: new Date().toLocaleDateString(),
    };

    try {
      await axios.post("https://blog-website-server-side.vercel.app/comments", commentData);
      setNewComment("");
      fetchComments();
      Swal.fire("Success", "Comment added successfully", "success");
    } catch (error) {
      console.error("Error adding comment:", error);
      Swal.fire("Error", "Failed to add comment", "error");
    }
  };

  const handleUpdateNavigate = () => {
    navigate(`/blogs/update/${blogDetails._id}`);
  };

  if (!blogDetails) return <div>Loading...</div>;

  const isBlogOwner = blogDetails.authorEmail === user.email;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div>
        <img className="py-10" src={blogDetails.imageUrl} alt="" />
      </div>
      <div className="flex flex-row gap-2 md:gap-4 mt-2 mb-4 flex-wrap">
        {blogDetails.tags.map((tag, idx) => (
          <p
            key={idx}
            className="bg-red-400 text-xs md:text-sm text-base-200 px-4 py-1 rounded text-center"
          >
            {" "}
            {tag}
          </p>
        ))}
      </div>
      <h1 className="text-3xl font-bold mb-4">{blogDetails.title}</h1>
      <p className="pb-3"> Author: {blogDetails.authorName}</p>

      <div className=" flex gap-3 justify-between">
        <p className="text-gray-600">Category: {blogDetails.category}</p>
        {blogDetails.createdDate && (
          <p className="text-gray-600">{blogDetails.createdDate}</p>
        )}
      </div>

      <p className="mt-4">{blogDetails.shortDescription}</p>
      <p className="mt-4">{blogDetails.longDescription}</p>
      {isBlogOwner && (
        <button
          onClick={handleUpdateNavigate}
          className="bg-primary text-white px-4 py-2 rounded mt-4"
        >
          Update Blog
        </button>
      )}

      <div className="my-12">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {!isBlogOwner ? (
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              className="border p-2 w-full rounded mb-2"
              rows="4"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            ></textarea>

            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded"
            >
              Submit Comment
            </button>
          </form>
        ) : (
          <p className="text-gray-500">Cannot comment on your own blog.</p>
        )}

        <div className="mt-4">
          {comments && comments.length > 0
            ? comments.map((comment) => (
                <div key={comment._id} className="mb-4 border-b pb-4">
                  <div className="flex items-center mb-2">
                    {comment.userProfilePicture? <img
                      src={comment.userProfilePicture}
                      alt={comment.userName}
                      className="w-8 h-8 rounded-full mr-2"
                    />:<div className="w-8 h-8 rounded-full mr-2 bg-primary/60 flex justify-center items-center text-white"><p>{comment.userName.slice(0,1)}</p> </div>}
                    <span className="font-medium">{comment.userName}</span>
                  </div>
                  <p>{comment.content}</p>
                </div>
              ))
            : !isBlogOwner && (
                <p className="text-gray-500">
                  No comments yet. Be the first to comment!
                </p>
              )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
