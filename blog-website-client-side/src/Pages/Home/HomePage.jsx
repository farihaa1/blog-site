import AboutPage from "./AboutPage/AboutPage";
import Banner from "./Banner";
import { motion } from "framer-motion";
import FeaturedBloggers from "./FeaturedBloggers";
import Newsletter from "./Newsletter";
import RecentBlogs from "./RecentBlogs";

const HomePage = () => {
  return (
    <motion.div 
    animate={{ y: [150, 30, 0] }} 
    transition={{ duration: 3 }}>
      <header>
        <Banner></Banner>
      </header>
      <main>
        <RecentBlogs></RecentBlogs>
      </main>
      <section>
        <AboutPage></AboutPage>
      </section>
      <section>
        <FeaturedBloggers></FeaturedBloggers>
      </section>
      <section>
        <Newsletter></Newsletter>
      </section>
    </motion.div>
  );
};

export default HomePage;
