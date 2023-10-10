import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FaWindowClose } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { BiSolidUser } from "react-icons/bi";
import { login } from "../redux/reducers/AuthSlice";

const validatePassword = (password) => {
  const regexLowercase = /[a-z]/;
  const regexUppercase = /[A-Z]/;
  const regexSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  } else if (!regexLowercase.test(password)) {
    return "Password must contain at least 1 lowercase letter";
  } else if (!regexUppercase.test(password)) {
    return "Password must contain at least 1 uppercase letter";
  } else if (!regexSpecialChar.test(password)) {
    return "Password must contain at least 1 special character";
  }

  return "";
};

 const Signup = ({ isOpen, closeModal }) => {
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

//   useEffect(() => {
//     Modal.setAppElement("#root");
//   }, []);

  useEffect(() => {
    let timer;

    if (error !== "") {
      // Display the error for 4 seconds
      timer = setTimeout(() => {
        setError("");
      }, 4000);
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

  const onSignupHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.cpassword
    ) {
      setLoading(false);
      setError("All fields must be set");
      //    {
      //     autoClose: 1000,
      //     className: "custom-toast-container",
      //     bodyClassName: "custom-toast-message",
      //   });
      return;
    }

    let a = validatePassword(formData.password);
    if (a !== "") {
      setLoading(false);
      setError(a);
      return;
    }

    if (formData.password !== formData.cpassword) {
      setLoading(false);
      setError("Passwords do not match");
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
        email: formData.email,
        password: formData.password,
        cpassword: formData.cpassword,
      }),
    };

    try {
      let response = await fetch(`${apiUrl}/user/signup`, options);
      let data = await response.json();

      if (response.ok) {
        let userAdded = {
          username: `${data.user.username}`,
          avatar: `${data.user.avatar}`,
        };
        localStorage.setItem("user", JSON.stringify(userAdded));
        dispatch(login({ ...userAdded }));
        setLoading(false);
        closeModal();

        toast.success("Sign Up Successful", {
          autoClose: 1000,
          className: "custom-toast-container",
          bodyClassName: "custom-toast-message",
        });
        return;
      } else {
        setLoading(false);
        setError(data.message || "Unknown error occurred");
        return;
        // , {
        //   autoClose: 1000,
        //   className: "custom-toast-container",
        //   bodyClassName: "custom-toast-message",
        // });
      }
    } catch (error) {
      setLoading(false);
      setError(data.message || "Unknown error occurred");
      return;
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "black",
      padding: "2rem 2rem",
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
        <div className="flex justify-between mb-8 items-center pl-1">
          <h1 className="text-center text-blue-500 font-bold text-xl">
            Sign Up
          </h1>

          <button onClick={closeModal}>
            <FaWindowClose
              style={{ height: "25px", width: "20px" }}
              className="text-red-500"
            />
          </button>
        </div>
        <div className="flex flex-col ">
          {error && <p className="font-bolder text-red-500">{error}</p>}
          <form onSubmit={onSignupHandler}>
            <div className="mb-6 relative">
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="w-full pl-12 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                onChange={onChangeHandler}
                name="username"
                value={formData.username}
                required
              />
              <BiSolidUser
                className="absolute icon2 "
                style={{ color: "black", fontSize: "18px" }}
              />
            </div>
            <div className="mb-6 relative">
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full pl-12 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                onChange={onChangeHandler}
                name="email"
                value={formData.email}
                required
              />
              <MdEmail
                className="absolute icon2 "
                style={{ color: "black", fontSize: "18px" }}
              />
            </div>
            <div className="mb-6 relative">
              <input
                type="password"
                id="password"
                required
                placeholder="Password"
                className="w-full pl-12 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                onChange={onChangeHandler}
                name="password"
                value={formData.password}
              />
              <RiLockPasswordFill
                className="absolute icon2 "
                style={{ color: "black", fontSize: "18px" }}
              />
            </div>
            <div className="mb-10 relative">
              <input
                required
                type="password"
                id="cpassword"
                placeholder="Confirm Password"
                className="w-full pl-12 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                onChange={onChangeHandler}
                name="cpassword"
                value={formData.cpassword}
              />
              <RiLockPasswordFill
                className="absolute icon2 "
                style={{ color: "black", fontSize: "18px" }}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-[100%] flex justify-center mb-4"
              disabled={loading}
            >
              {loading ? (
                <>
                  <ThreeDots
                    height="30"
                    width="60"
                    radius="9"
                    color="lightGreen"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={loading}
                  />
                </>
              ) : (
                <>
                  <p>SignUp</p>
                </>
              )}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Signup;