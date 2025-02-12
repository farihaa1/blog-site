import React from "react";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <div className=" bg-base-content">
      <motion.div
        animate={{ y: [170, 25, 10] }}
        transition={{ delay: 2, duration: 4 }}
        className=" container mx-auto px-6 py-8 lg:py-16 my-16 flex flex-col gap-6 lg:px-24 text-base-300 "
      >
        <div className="flex flex-col justify-center items-center my-2 pb-4">
          <h4 className="heading3 text-center mb-6">
            Create, Share, and Engage with <br />{" "}
            <span className="text-btn1">Blog Website</span>
          </h4>
          <p className="mb-4 max-w-2xl text-center text-gray-400">
            BlogWeb is more than just a blog platform. it's a community where
            creators, writers, and readers come together to share ideas,
            stories, and knowledge.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-12 py-4 ">
          <figure className="md:w-2/5 md:px-4 md:mr-6">
            <img
              src="https://i.ibb.co.com/pwgBBWQ/pngtree-blogging-concept-picture-writer-laptop-png-image-5722986.png"
              alt="Powerful Blogs"
              className="w-full h-auto rounded shadow-lg"
            />
          </figure>
          <div className="flex-1 lg:ml-12">
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              <span className="text-primary">Powerful </span>Blogs
            </h3>
            <ul className="list-disc pl-5 space-y-1 max-w-xl lg:text-lg">
              <li>
                BlogWeb’s easy-to-use editor empowers you to create rich,
                interactive blog posts with media, links, and more.
              </li>
              <li>
                Enhance your content with embedded videos, images, and code
                snippets, making it easy to share your thoughts clearly and
                creatively.
              </li>
            </ul>
            <div className="mt-4 flex-wrap pr-12">
              <div className="mt-4 flex flex-wrap gap-2">
                <p className="text-white text-sm bg-btn1 px-2 py-1 rounded">
                  Technology
                </p>
                <p className="text-white text-sm bg-btn1 px-2 py-1 rounded">
                  Lifestyle
                </p>
                <p className="text-white text-sm bg-btn1 px-2 py-1 rounded">
                  Education
                </p>
                <p className="text-white text-sm bg-btn1 px-2 py-1 rounded">
                  Health
                </p>
                <p className="text-white text-sm bg-btn1 px-2 py-1 rounded">
                  Travel
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse justify-between gap-8 mb-12 w-full ">
          <figure className=" md:w-2/5 md:px-4 md:mr-6">
            <img
              src="https://i.ibb.co.com/tYDYQqR/images-q-tbn-ANd9-Gc-RYLdw7-K5a-Jv1y5-LY4v83m-R0-Xeg-Str-UIkbp-XQ-s.png"
              alt="Real-Time Collaboration"
              className="w-full h-auto rounded shadow-lg"
            />
          </figure>
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              Keep <span className="text-primary">Everyone</span> On the Same
              Page
            </h3>
            <ul className="list-disc pl-5 space-y-1 max-w-xl lg:text-lg">
              <li>
                Collaborate seamlessly with fellow bloggers, readers, and
                contributors in real-time through comments and live editing.
              </li>
              <li>
                Stay connected and keep your audience engaged with real-time
                notifications and updates on your blog posts.
              </li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <p className="text-white text-sm bg-btn1 px-2 py-1 rounded">
                Real-Time Collaboration
              </p>
              <p className="text-white text-sm bg-btn1 px-2 py-1 rounded">
                Comments & Engagement
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-8 mb-12 py-4">
          <figure className=" md:w-2/5 md:px-4 md:mr-6">
            <img
              src="https://i.ibb.co.com/KFXm3ps/5-Great-Ways-1024x657.jpg"
              alt="Organized Workspaces"
              className="w-full h-auto rounded shadow-lg"
            />
          </figure>
          <div className="flex-1 lg:ml-12">
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              <span className="text-primary">Organize</span> Your Content with
              Ease
            </h3>
            <ul className="list-disc pl-5 space-y-1 max-w-xl lg:text-lg">
              <li>
                Organize your blogs into categories, tags, and collections to
                make it easy for readers to find what they love.
              </li>
              <li>
                BlogWeb allows for seamless scalability, ensuring you can grow
                your content and audience while keeping things neatly organized.
              </li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <p className="text-white text-sm bg-btn1 px-2 py-1 rounded">
                Category Management
              </p>
              <p className="text-white text-sm bg-btn1 px-2 py-1 rounded">
                Content Organization
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 flex flex-col gap-2">
          <p className="text-xl lg:text-3xl font-semibold mb-4">
            Ready to share your story? <br /> Join the BlogWeb community today!
          </p>
          <a
            href="/sign-in"
            className="bg-primary w-52 mx-auto text-white px-6 py-3 rounded"
          >
            Start Writing Now
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
