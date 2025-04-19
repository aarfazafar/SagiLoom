/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../../context/myContext.jsx";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebaseConfig/firebaseConfig";
import Loader from "../Loader/Loader";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Login = () => {
  const context = useContext(MyContext);
  const { loading, setLoading } = context;

  // navigate
  const navigate = useNavigate();

  // User Login State
  const [userLogin, setUserLogin] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const userLoginFunction = async () => {
    // validation
    if (
      (userLogin.email === "" && userLogin.phone === "") ||
      userLogin.password === ""
    ) {
      toast.error("Email/Phone and Password are required");
      return;
    }

    setLoading(true);
    try {
      const users = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );

      try {
        const q = query(
          collection(fireDB, "user"),
          where("uid", "==", users?.user?.uid)
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
          let user;
          QuerySnapshot.forEach((doc) => (user = doc.data()));
          localStorage.setItem("users", JSON.stringify(user));
          setUserLogin({
            email: "",
            phone: "",
            password: "",
          });
          toast.success("Login Successfully", {
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
            },
            iconTheme: {
              primary: "#713200",
              secondary: "#FFFAEE",
            },
          });
          setLoading(false);
          if (user.role === "user") {
            navigate("/");
          } else {
            navigate("/admin");
          }
        });
        return () => data;
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Login Failed");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <Loader />}
      {/* Login Form  */}
      <div className="login_Form bg-white px-8 py-6 border border-gray-300 rounded-xl shadow-md">
        {/* Top Heading  */}
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-black">Login</h2>
        </div>

        {/* Input Email  */}
        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={userLogin.email}
            onChange={(e) => {
              setUserLogin({
                ...userLogin,
                email: e.target.value,
              });
            }}
            className="bg-white border border-gray-400 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400"
          />
        </div>

        {/* Input Phone  */}
        <div className="mb-3">
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={userLogin.phone}
            onChange={(e) => {
              setUserLogin({
                ...userLogin,
                phone: e.target.value,
              });
            }}
            className="bg-white border border-gray-400 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400"
          />
        </div>

        {/* Input Password  */}
        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            value={userLogin.password}
            onChange={(e) => {
              setUserLogin({
                ...userLogin,
                password: e.target.value,
              });
            }}
            className="bg-white border border-gray-400 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400"
          />
        </div>

        {/* Login Button  */}
        <div className="mb-5">
          <button
            type="button"
            onClick={userLoginFunction}
            className="bg-black hover:bg-gray-800 w-full text-white text-center py-2 font-bold rounded-md "
          >
            Login
          </button>
        </div>

        <div>
          <h2 className="text-black">
            Don't Have an account{" "}
            <Link className="text-black font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
