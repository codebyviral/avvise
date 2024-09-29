import { useState } from "react";
import {
  Navbar,
  Footer,
  LoginLeft,
  SocialLinks,
  ButtonLoader,
} from "../Components/compIndex";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { EmailSvg, PasswordSvg } from "../Components/Layouts/LayoutIndex";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const navigate = useNavigate();
  const { storeTokenInLocalStorage, storeUserId } = useAuthContext();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loginURL = "https://avvise.onrender.com/api/auth/login";
    try {
      const response = await fetch(loginURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        setUser({ email: "", password: "" });
        const responseData = await response.json();
        // console.log("Response from server", responseData);
        storeTokenInLocalStorage(responseData.token);
        storeUserId(responseData.userId);
        toast.success("Login success");
        navigate("/");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Login failed");
      }
    } catch (error) {
      toast.error("Network error: Unable to log in");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-24 mx-auto lg:py-32">
          <div className="lg:flex">
            <LoginLeft action={"/signup"} />
            <div className="mt-8 lg:w-1/2 lg:mt-0">
              <form onSubmit={handleLogin} className="w-full lg:max-w-xl">
                <div className="relative flex items-center">
                  <EmailSvg />
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Email address"
                  />
                </div>

                <div className="relative flex items-center mt-4">
                  <PasswordSvg />
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-blue-300 focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Password"
                  />
                </div>

                <div className="mt-8 md:flex md:items-center">
                  {loading ? (
                    <>
                      <ButtonLoader message={"Authenticating..."} />
                    </>
                  ) : (
                    <>
                      <button className="mt-2 px-6 py-3 flex justify-center bg-black text-white rounded-lg hover:opacity-80">
                        Login
                      </button>
                    </>
                  )}
                  {/* <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-lg md:w-1/2 hover:opacity-80 focus:outline-none focus:ring focus:ring-opacity-50">
                    Sign up
                  </button> */}

                  <a
                    href="#"
                    className="inline-block mt-4 text-center text-black md:mt-0 md:mx-6 hover:underline dark:text-blue-400"
                  >
                    Forgot your password?
                  </a>
                </div>
              </form>
            </div>
          </div>
          <SocialLinks />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Signin;
