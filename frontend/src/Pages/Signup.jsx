import { useState } from "react";
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
const Signup = () => {
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "", // This might not be necessary if you're using `avatar` state
  });
  const navigate = useNavigate();

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const signupURL = "https://avvise.onrender.com/api/auth/signup";

  const handleInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(signupURL, user);
      if (response.status === 200) {
        const responseData = response.data;
        const userID = responseData.userId;
        if (avatar) {
          const avatarUrl =
            "https://avvise.onrender.com/api/auth/upload-avatar";
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
            console.log("Avatar upload error:", error);
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
      console.log("Signup error:", error);
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
            <LoginLeft action={"/login"} />
            <div className="mt-8 lg:w-1/2 lg:mt-0">
              <form onSubmit={handleSubmit} className="w-full lg:max-w-xl">
                {/* Avatar Upload */}
                <label htmlFor="file-upload">
                  <img
                    className="h-20 w-auto mb-5"
                    src={avatar ? URL.createObjectURL(avatar) : profileIconURL}
                    alt="upload avatar image"
                  />
                </label>
                <div className="flex">
                  <input
                    className="block w-full mt-2 text-sm text-slate-500
                  mb-4
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                file:bg-gray-300 file:text-black
                hover:file:bg-opacity-80"
                    type="file"
                    onChange={handleImgChange}
                    label="Image"
                    name="avatar"
                    accept="image"
                  />
                  <span className="font-light text-sm mt-4">
                    {"(Optional)"}
                  </span>
                </div>
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

                <div className="mt-8 md:flex md:items-center">
                  {loading ? (
                    <>
                      <ButtonLoader message={"Welcome to AVVISE ✨"} />
                    </>
                  ) : (
                    <>
                      <button className="mt-2 px-6 py-3 flex justify-center bg-black text-white rounded-lg hover:opacity-80">
                        Sign up
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

export default Signup;
