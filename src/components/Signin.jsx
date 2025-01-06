import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import back from "../images/thebackground.jpg";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import "./styles.css";

const Signin = () => {
  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated } = useContext(UserContext);
  // the default email and password
  const [user, setUser] = useState({
    email: "maya@gmail.com",
    password: "maya",
  });

  // loader
  const [loading, setLoading] = useState(false);

  // aigning in to the journal
  const signin = async () => {
    setLoading(true);
    const res = await axios.post(
      `${import.meta.env.VITE_URL}/api/auth/login`,
      {
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
    // console.log("user signin data: ", data);
    // console.log("authtoken generated when signed in : ", data.authtoken);
    setUser(data);
    setLoading(false);
    if (data.authtoken) {
      setIsAuthenticated(true);
      localStorage.setItem("token", data.authtoken);

      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  // now handling the user input of email and password
  const handleChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  console.log("isAuthenticated: ", isAuthenticated);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-700">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-300"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center m-auto w-full h-full p-4 ">
        <img
          src={back}
          alt="the background"
          className="relative justify-center items-center m-auto w-1/2 h-full rounded-full opacity-40 shadow-lg shadow-stone-700"
        />
        <div className="absolute top-10 ">
          {/* {loading ? <div>....loading</div> : <div></div>} */}
          <div className="flex flex-col justify-center items-center">
            <div className="font-semibold rounded-xl yusei-magic-tab text-3xl my-4">
              Login
            </div>
            <form
              action="submit"
              className="bg-yellow-500 p-10 rounded-xl shadow-lg shadow-stone-600"
            >
              <div className="flex flex-col gap-10">
                <div className="flex flex-col">
                  <label htmlFor="email" className="font-semibold">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="em@gmail.com"
                    className="p-4 rounded-3xl"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="password" className="font-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="****"
                    className="p-4 rounded-3xl"
                  />
                </div>
              </div>
            </form>
            <button
              onClick={signin}
              className="p-2 rounded-xl bg-stone-600 my-2 text-white hover:bg-stone-500"
            >
              Submit
            </button>

            <div className="flex flex-row my-2 gap-2 items-center">
              <h1 className="text-yellow-400 text-2xl">
                Dont have an account?
              </h1>
              <Link to="/signup">
                <button className="p-2 rounded-xl bg-stone-400 hover:bg-stone-200">
                  SignUp
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
