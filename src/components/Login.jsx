import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FaWindowClose } from "react-icons/fa";
import { BiSolidUser } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { login } from "../redux/reducers/AuthSlice";

const Login = ({ isOpen, closeModal }) => {
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    let timer;

    if (error !== "") {
      // Display the error for 4 seconds
      timer = setTimeout(() => {
        setError("");
      }, 1000);
    }

    // Cleanup function to clear the timer if the component unmounts
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [error]);

  const onChangeHandler = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onLoginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.username || !formData.password) {
      setLoading(false);
      setError("All field must be set");

      //   toast.error("All fields must be set", {
      //     autoClose: 1000,
      //     className: "custom-toast-container",
      //     bodyClassName: "custom-toast-message",
      //   });
      return;
    }
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    };

    try {
      let response = await fetch(`${apiUrl}/user/login`, options);

      let data = await response.json();

      if (response.ok) {
        let userAdded = {
          username: `${data.user.username}`,
          avatar: `${data.user.avatar}`,
        };
        localStorage.setItem("user", JSON.stringify(userAdded));
        dispatch(login({ ...userAdded }));
        setFormData({
          username: "",
          password: "",
        });

        setTimeout(() => {
          toast.success("Login Successful", {
            autoClose: 2000,
            className: "custom-toast-container",
            bodyClassName: "custom-toast-message",
          });
          closeModal();
        }, 0);
        //   navigate("/");
      } else {
        setLoading(false);
          toast.error(data.message || "Unknown error occurred", {
            autoClose: 2000,
            className: "custom-toast-container",
            bodyClassName: "custom-toast-message",
          });
        return;
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

//   useEffect(() => {
//     // Set the app element to the root element of your React application
//     Modal.setAppElement("#root"); // Replace '#root' with your actual app element selector
//   }, []);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#1e1a1a",
      lineHeight: "3rem",
      // padding:"1rem 1rem",
    },
  };

  return (
    <div>
      <Modal
        isOpen={Boolean(isOpen)}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
        <div className="flex justify-between pl-4 items-center">
          <h1 className="text-center mb-2 font-bold text-blue-500 text-xl">
            Sign In
          </h1>
          <button onClick={closeModal}>
            <FaWindowClose
              style={{ height: "30px", width: "18px" }}
              className="text-red-500 mb-2"
            />
          </button>
        </div>
        <div className="flex flex-col  px-4 py-4">
          {error && <p className="font-bolder text-red-500">{error}</p>}

          <form onSubmit={onLoginHandler}>
            <div className="mb-8 relative">
              <input
                type="text"
                id="username"
                placeholder="Enter Username"
                className="w-full   border  focus:outline-none focus:ring focus:border-blue-300 pl-12"
                onChange={onChangeHandler}
                name="username"
                value={formData.username}
              />
              <BiSolidUser
                className="absolute icon "
                style={{ color: "black", fontSize: "18px" }}
              />
            </div>
            <div className="mb-10 relative">
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                className="w-full pl-12  border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                onChange={onChangeHandler}
                name="password"
                value={formData.password}
              />
              <RiLockPasswordFill
                className="absolute icon "
                style={{ color: "black", fontSize: "18px" }}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white  px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-[100%] flex justify-center mb-4"
              disabled={loading}
            >
              {loading ? (
                <>
                  <ThreeDots
                    height="20"
                    width="40"
                    radius="9"
                    color="red"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={loading}
                  />
                </>
              ) : (
                <>
                  <p>Login</p>
                </>
              )}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};
export default Login;
