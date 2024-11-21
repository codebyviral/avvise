/* eslint-disable no-unused-vars */
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
import { googleLogo } from "../assets/URLs";
import { useGoogleLogin } from "@react-oauth/google";
import { useEffect } from "react";
import axios from "axios";

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

  const [googleUser, setGoogleUser] = useState([]);
  const [profile, setProfile] = useState([]);

  // Google login handler
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setGoogleUser(codeResponse);
    },
    onError: (error) => console.log("Login failed", error),
  });

  // Google login handler
  const googlelogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setGoogleUser(codeResponse);
    },
    onError: (error) => console.log("Login failed", error),
  });

  const handleGoogleSignup = async () => {
    setLoading(true);
    const redirectUri = "http://localhost:5173/signup";

    if (!googleUser || !googleUser.access_token) {
      toast.error("Google user data is missing");
      setLoading(false);
      return;
    }
    const googleSignupURL = "https://avvise.onrender.com/api/auth/google";
    try {
      const response = await axios.post(googleSignupURL, {
        access_token: googleUser.access_token,
        redirectUri,
      });

      if (response.status === 200) {
        const userID = response.data.userId;
        storeTokenInLocalStorage(response.data.token);
        storeUserId(userID);
        toast.success("Google Signup Successful 🎉");
        navigate("/");
      } else {
        toast.error(response.data.message || "Signup failed");
      }
    } catch (error) {
      toast.error(
        "Google Signup Error: " +
          (error.response?.data?.message || "An error occurred")
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch Google profile after user logs in
  useEffect(() => {
    if (googleUser && googleUser.access_token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${googleUser.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
          handleGoogleSignup(); // Call signup after profile is fetched
        })
        .catch((err) => {
          console.error("Error fetching Google profile:", err);
          toast.error("Failed to fetch Google profile.");
        });
    }
  }, [googleUser]);

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
                      <button className="rounded-xl mt-3 w-auto px-6 border-2 p-2 border-slate-950 hover:bg-black hover:text-white">
                        Login
                      </button>
                    </>
                  )}
                  <a
                    href="#"
                    className="inline-block fg-password mt-4 text-center text-black md:mt-0 md:mx-6 hover:underline dark:text-blue-400"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="mt-0">
                  {/* Google Signup */}
                  <div className="google-signup">
                    <button
                      onClick={login}
                      className="rounded-xl mt-3 w-auto px-6 border-2 p-2 border-slate-950 hover:bg-black hover:text-white"
                    >
                      <img
                        className="w-5 h-5 mr-3"
                        src={googleLogo}
                        alt="Google logo"
                      />
                      Continue with Google
                    </button>
                  </div>
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
