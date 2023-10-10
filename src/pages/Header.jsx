import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { FaWindowClose } from "react-icons/fa";
import Modal from "react-modal";
import  Signup  from "../components/Signup";
import Login from "../components/Login";
import { logout } from "../redux/reducers/AuthSlice";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CgShoppingBag } from "react-icons/cg";

const Header = () => {
  const cartValue = useSelector((state) => state.cart.items).length;
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [modalIsOpenL, setIsOpenL] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    Modal.setAppElement("#root"); // Set the app element to the root element of your React application
  }, []);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "cyan",
    },
  };

  function openModalL() {
    setIsOpenL(true);
  }

  function closeModalL() {
    setIsOpenL(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const logoutHandler = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      credentials: "include",
    };
    try {
      let response = await fetch(`${apiUrl}/user/logout`, options);
      let data = await response.json();
      if (response.ok) {
        dispatch(logout());
        localStorage.removeItem("user");
        setLoading(false);
        toast.success("You logged out successfully", {
          autoClose: 2000,
          className: "custom-toast-container",
          bodyClassName: "custom-toast-message",
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Someting Went Wrong...", {
        autoClose: 2000,
        className: "custom-toast-container",
        bodyClassName: "custom-toast-message",
      });
      return;
    }
  };

  return (
    <>
      <div className="bg-gray-900 flex justify-between items-start w-full sm:w-screen px-4 sm:px-8 md:px-16 py-4 sm:py-6">
        <Link to="/" className="text-teal-500 font-bold text-xl sm:text-xl">
          <div className="font-bold header flex  ">
            MernMart{" "}
            <i>
              <CgShoppingBag className="pl-2 pb-1 text-cyan-400" />
            </i>
          </div>
        </Link>

        <div className="flex md:space-x-10 items-center  sm:space-x-6 sm:py-.5 ">
          {user === null ? (
            <button
              className="bg-blue-500 px-6 py-1  rounded-full font-bolder text-sm sm:text-base text-white hover:rounded-none"
              onClick={setIsOpenL}
            >
              Login
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <img
                src={user?.avatar}
                alt="User Avatar"
                className="w-8 h-8 rounded-full sm:w-6 sm:h-6"
              />
              <p className="text-xs sm:text-xs text-white">
                {`Welcome, ${user?.username}`}
              </p>
            </div>
          )}

          {user !== null ? (
            <button
              className="bg-red-900 px-6 py-1 rounded-full font-bolder hover:rounded-none text-sm sm:text-sm text-white"
              disabled={loading}
              onClick={logoutHandler}
            >
              {loading ? (
                <ThreeDots
                  height="10"
                  width="20"
                  radius="6"
                  color="white"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={loading}
                />
              ) : (
                <p>Logout</p>
              )}
            </button>
          ) : (
            <button
              className="bg-blue-700 px-6 py-1 rounded-full font-bolder hover:rounded-none text-sm text-white sm:text-base"
              onClick={setIsOpen}
            >
              Signup
            </button>
          )}

          <div>
            <NavLink
              to="/cart"
              className={(nav) =>
                !nav.isActive
                  ? "flex items-center bg-yellow-500 text-gray-500 py-1 border-2 border-yellow-600 hover:text-black"
                  : "flex items-center bg-green-500 text-gray-500 py-1 border-2 border-green-600 hover:text-black"
              }
            >
              <span className="flex items-center justify-between px-2 sm:px-0">
                <FaShoppingCart
                  className="w-8 h-4"
                  style={{ color: "green" }}
                />
                <p className="text-xs sm:text-sm font-bold text-black rounded-full px-1">
                  {cartValue}
                </p>
              </span>
            </NavLink>
          </div>
        </div>
      </div>

      {modalIsOpenL && <Login isOpen={modalIsOpenL} closeModal={closeModalL} />}
      {modalIsOpen && <Signup isOpen={modalIsOpen} closeModal={closeModal} />}
    </>
  );
};

export default Header;
