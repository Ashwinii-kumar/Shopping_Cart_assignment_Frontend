import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import Products from "../components/Products";

const Home = () => {
  const [menu, setMenu] = useState(window.innerWidth < 768);
  const toggleMobileMenu = () => {
    setMenu(!menu);
  };
  const closeMobileMenu = () => {
    setMenu(false);
  };
  useEffect(() => {
    const handleResize = () => {
      setMenu(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="flex sm:flex-col md:flex-row  w-[100vw]   min-h-[150vh]    sm:items-center  sm:justify-center   p-2  md:items-start md:space-x-6">
        <div className="sm:w-[90%]  md:w-1/4  sm:text-right ">
          {window.innerWidth < 768 && (
            <button
              type="button"
              className="bg-black text-white px-2 py-2 text-sm sm:mt-2 sm:mb-2 "
              onClick={toggleMobileMenu}
            >
              {!menu ? "Menu" : "X"}
            </button>
          )}

          {(menu || window.innerWidth >= 768) && <Menu />}
        </div>

        <div className='sm:w-[90%] md:w-[95vw] pr-6 '>
          <Products />
        </div>
      </div>
    </>
  );
};

export default Home;
