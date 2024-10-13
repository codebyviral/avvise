/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  Navbar,
  Footer,
  LoginLeft,
  SocialLinks,
  ButtonLoader,
} from "../Components/compIndex";
import { profileIconURL } from "../assets/URLs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  PasswordSvg,
  EmailSvg,
  FullNameSvg,
} from "../Components/Layouts/LayoutIndex";
import { googleLogo } from "../assets/URLs";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { useAuthContext } from "../context/AuthContext";

const Signup = () => {
  const { storeTokenInLocalStorage, storeUserId } = useAuthContext();

  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [googleUser, setGoogleUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();

  // Google login handler
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setGoogleUser(codeResponse);
    },
    onError: (error) => console.log("Login failed", error),
  });

  // Handle avatar image upload
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  // Regular signup form data change handler
  const handleInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const signupURL = "http://localhost:4000/api/auth/signup";
  const googleSignupURL = "http://localhost:4000/api/auth/google";

  // Handle form submission for regular signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(signupURL, user);
      if (response.status === 200) {
        const userData = response.data;
        const userID = userData.userId;

        // Handle avatar upload
        if (avatar) {
          const avatarUrl = "http://localhost:4000/api/auth/upload-avatar";
          const formData = new FormData();
          formData.append("file", avatar);
          formData.append("userId", userID);

          try {
            const uploadResponse = await axios.post(avatarUrl, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });

            if (uploadResponse.status === 200) {
              localStorage.setItem("profileImg", uploadResponse.data.imageUrl);
              toast.success("Account Created 🎉");
              navigate("/login");
            } else {
              toast.error("Avatar upload failed");
            }
          } catch (error) {
            toast.error("Avatar upload error");
            console.error("Avatar upload error:", error);
          }
        } else {
          toast.success("Account Created 🎉");
          navigate("/login");
        }
      } else {
        toast.error("Signup failed");
      }
    } catch (error) {
      toast.error("Signup Error");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Google login handler
  const googlelogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setGoogleUser(codeResponse);
      console.log("Google User:", codeResponse); // Updated to log codeResponse directly
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
            <LoginLeft action={"/login"} />
            <div className="mt-8 lg:w-1/2 lg:mt-0">
              <form onSubmit={handleSubmit} className="w-full lg:max-w-xl">
                {/* Avatar Upload */}
                <label htmlFor="file-upload">
                  <img
                    className="h-20 w-auto mb-5"
                    src={avatar ? URL.createObjectURL(avatar) : profileIconURL}
                    alt="upload avatar"
                  />
                </label>
                <div className="flex">
                  <input
                    className="block w-full mt-2 text-sm text-slate-500 mb-4
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-gray-300 file:text-black
                  hover:file:bg-opacity-80"
                    type="file"
                    onChange={handleImgChange}
                    accept="image/*"
                  />
                  <span className="font-light text-sm mt-4">
                    {"(Optional)"}
                  </span>
                </div>

                {/* Full Name */}
                <div className="relative flex items-center mb-4 mt-3">
                  <FullNameSvg />
                  <input
                    type="text"
                    name="fullName"
                    onChange={handleInput}
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Full Name"
                  />
                </div>

                {/* Email */}
                <div className="relative flex items-center">
                  <EmailSvg />
                  <input
                    type="email"
                    name="email"
                    onChange={handleInput}
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Email address"
                  />
                </div>

                {/* Password */}
                <div className="relative flex items-center mt-4">
                  <PasswordSvg />
                  <input
                    type="password"
                    name="password"
                    onChange={handleInput}
                    className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-blue-300 focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Password"
                  />
                </div>
                <button className="rounded-xl mt-3 w-auto px-6 border-2 p-2 border-slate-950 hover:bg-black hover:text-white">
                  Create An Account
                </button>
              </form>

              {/* Google Signup */}
              <div className="google-signup">
                <button
                  onClick={login} // Trigger Google login when clicked
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
          </div>
          <SocialLinks />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Signup;
