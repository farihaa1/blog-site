import React from "react";
import { motion } from "framer-motion";
import bannerData from "../../assets/Lottie/bannerData.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <motion.div
      animate={{ y: [150, 30, 0] }}
      transition={{  duration: 3 }}
      className="container mx-auto w-full mt-6 py-6 md:py-12 flex md:items-start justify-start md:justify-center  md:h-[370px] lg:h-[430px] flex-col-reverse md:flex-row-reverse lg:px-6"
    >
      <div className="w-2/3 mx-auto md:w-7/12 lg:w-5/12">
        <motion.div
          animate={{ y: [-20, 25, -20], x: [10, 20, 10] }}
          transition={{ duration: 7, repeat: Infinity }}
          className=""
        >
          <Lottie className="w-full" animationData={bannerData} />
        </motion.div>
      </div>

      <div>
        <div>
          <div className="flex flex-col items-center md:items-start md:justify-center max-w-lg mx-auto px-2 md:pl-10">
            <h1 className="heading1">
              Welcome to <br />
              Our Blog!
            </h1>
            <p className="para">
              Explore insightful articles, expert tips, in-depth guides, and the
              latest trends in technology, lifestyle, and more.
            </p>
            <a  href='#newsletter-section' className="bg-gradient-to-r from-primary to-btn1 w-3/6 justify-center cursor-pointer my-2 text-white flex flex-row items-center gap-2 text-lg px-4 py-2 rounded">
              Subscribe Now!
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Banner;
