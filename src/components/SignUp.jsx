import { useToast } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import axios from "axios";
const SignUp = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const { setIsAuthenticated } = useContext(UserContext);
  // default user
  const [user, setUser] = useState({
    name: "laya",
    email: "laya@gmail.com",
    password: "laya",
  });

  // loader
  const [loading, setLoading] = useState(false);

  const signup = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/auth/createuser`,
        {
          name: user.name,
          email: user.email,
          password: user.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = res.data;
      console.log("signed up user data:  ", data);
      setUser(data);

      if (data.authtoken) {
        localStorage.setItem("token", data.authtoken);
        setIsAuthenticated(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        alert("fill up all the spaces");
      }
    } catch (error) {
      toast({
        title: "Can't create account",
        status: "danger",
        duration: 3000,
        isClosable: true,
      });
      console.error("error: ", error);
    } finally {
      setLoading(false);
    }
  };

  // handle user input
  const handleSignUp = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-700">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-300"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center m-auto w-full h-full p-4 font-serif ">
        <div className="font-semibold rounded-xl  text-yellow-400 text-3xl my-4">
          Sign Up
        </div>
        {/* {loading ? <div>....loading</div> : <div></div>} */}
        <form
          action="submit"
          className="bg-black p-10 rounded-xl shadow-lg shadow-stone-500"
        >
          <div className="flex flex-col gap-10 text-yellow-500">
            <div className="flex flex-col ">
              <label htmlFor="Username" className="font-semibold text-xl">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleSignUp}
                placeholder="xyz"
                className="p-4 rounded-3xl"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="font-semibold text-xl">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={handleSignUp}
                placeholder="em@gmail.com"
                className="p-4 rounded-3xl"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="font-semibold text-xl">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleSignUp}
                placeholder="****"
                className="p-4 rounded-3xl"
              />
            </div>
          </div>
        </form>
        <button
          onClick={signup}
          className="p-2 rounded-xl bg-stone-600 my-2 text-white hover:bg-stone-500"
        >
          Submit
        </button>
        <div className="flex flex-row my-2 gap-2 items-center">
          <h1 className="text-yellow-400 text-xl">Already have an account</h1>
          <Link to="/signin">
            <button className="p-2 rounded-xl bg-stone-400 hover:bg-stone-200">
              SignIn
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
