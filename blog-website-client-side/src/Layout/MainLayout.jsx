import { Outlet } from "react-router-dom";
import Navbar from "../Common/Navbar";
import Footer from "../Components/Footer";

const MainLayout = () => {
  return (
    <div className="font-poppins bg-bg dark:bg-base-content">
      <nav className="h-20 dark:bg-base-content">
        <Navbar></Navbar>
      </nav>

      <main className="dark:bg-base-content">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayout;
