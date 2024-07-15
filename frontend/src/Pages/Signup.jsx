import { useState } from "react";
import { Navbar, Footer } from "../Components/compIndex";
import { AvviseEndgame, profileIconURL } from "../assets/URLs";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { toast } from "react-hot-toast";
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
            <div className="lg:w-1/2">
              <img className="w-auto h-8 lg:h-20" src={AvviseEndgame} alt="" />

              <h1 className="mt-4 text-gray-600 dark:text-gray-300 md:text-lg">
                Welcome{" "}
                <span className="font-semibold text-2xl">
                  to <span className="text-black">AVVISE</span>
                </span>
              </h1>

              <h1 className="mt-4 text-2xl font-medium text-gray-800 capitalize lg:text-3xl dark:text-white">
                Signup New account
              </h1>
              <Link to="/login">
                <h2 className="mt-5 text-sm underline">
                  Login existing account
                </h2>
              </Link>
            </div>
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
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      />
                    </svg>
                  </span>

                  <input
                    type="text"
                    name="fullName"
                    onChange={handleInput}
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Full Name"
                  />
                </div>
                <div className="relative flex items-center">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>

                  <input
                    type="email"
                    name="email"
                    onChange={handleInput}
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Email address"
                  />
                </div>

                <div className="relative flex items-center mt-4">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </span>

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
                      <button className="mt-2 px-6 py-3 flex justify-center bg-black text-white rounded-2xl hover:opacity-80">
                        <Oval color="#ffff" width={20} height={20} />{" "} <span className="ml-2">Creating Account...</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="mt-2 px-6 py-3 flex justify-center bg-black text-white rounded-2xl hover:opacity-80">
                        Sign up
                      </button>
                    </>
                  )}
                  {/* <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-2xl md:w-1/2 hover:opacity-80 focus:outline-none focus:ring focus:ring-opacity-50">
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

          <div className="mt-8 md:mt-24 sm:flex sm:items-center">
            <h3 className="text-black dark:text-blue-400 sm:w-1/2">
              Social networks
            </h3>

            <div className="flex items-center mt-4 sm:mt-0 -mx-1.5 sm:w-1/2">
              <a
                className="mx-1.5 dark:hover:text-blue-400 text-gray-400 transition-colors duration-300 transform hover:text-black"
                href="#"
              >
                <svg
                  className="w-10 h-10 fill-current"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.6668 6.67334C18.0002 7.00001 17.3468 7.13268 16.6668 7.33334C15.9195 6.49001 14.8115 6.44334 13.7468 6.84201C12.6822 7.24068 11.9848 8.21534 12.0002 9.33334V10C9.83683 10.0553 7.91016 9.07001 6.66683 7.33334C6.66683 7.33334 3.87883 12.2887 9.3335 14.6667C8.0855 15.498 6.84083 16.0587 5.3335 16C7.53883 17.202 9.94216 17.6153 12.0228 17.0113C14.4095 16.318 16.3708 14.5293 17.1235 11.85C17.348 11.0351 17.4595 10.1932 17.4548 9.34801C17.4535 9.18201 18.4615 7.50001 18.6668 6.67268V6.67334Z" />
                </svg>
              </a>

              <a
                className="mx-1.5 dark:hover:text-blue-400 text-gray-400 transition-colors duration-300 transform hover:text-black"
                href="#"
              >
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.2 8.80005C16.4731 8.80005 17.694 9.30576 18.5941 10.2059C19.4943 11.1061 20 12.327 20 13.6V19.2H16.8V13.6C16.8 13.1757 16.6315 12.7687 16.3314 12.4687C16.0313 12.1686 15.6244 12 15.2 12C14.7757 12 14.3687 12.1686 14.0687 12.4687C13.7686 12.7687 13.6 13.1757 13.6 13.6V19.2H10.4V13.6C10.4 12.327 10.9057 11.1061 11.8059 10.2059C12.7061 9.30576 13.927 8.80005 15.2 8.80005Z"
                    fill="currentColor"
                  />
                  <path
                    d="M7.2 9.6001H4V19.2001H7.2V9.6001Z"
                    fill="currentColor"
                  />
                  <path
                    d="M5.6 7.2C6.48366 7.2 7.2 6.48366 7.2 5.6C7.2 4.71634 6.48366 4 5.6 4C4.71634 4 4 4.71634 4 5.6C4 6.48366 4.71634 7.2 5.6 7.2Z"
                    fill="currentColor"
                  />
                </svg>
              </a>

              <a
                className="mx-1.5 dark:hover:text-blue-400 text-gray-400 transition-colors duration-300 transform hover:text-black"
                href="#"
              >
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 10.2222V13.7778H9.66667V20H13.2222V13.7778H15.8889L16.7778 10.2222H13.2222V8.44444C13.2222 8.2087 13.3159 7.9826 13.4826 7.81591C13.6493 7.64921 13.8754 7.55556 14.1111 7.55556H16.7778V4H14.1111C12.9324 4 11.8019 4.46825 10.9684 5.30175C10.1349 6.13524 9.66667 7.2657 9.66667 8.44444V10.2222H7Z"
                    fill="currentColor"
                  />
                </svg>
              </a>

              <a
                className="mx-1.5 dark:hover:text-blue-400 text-gray-400 transition-colors duration-300 transform hover:text-black"
                href="#"
              >
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.9294 7.72275C9.65868 7.72275 7.82715 9.55428 7.82715 11.825C7.82715 14.0956 9.65868 15.9271 11.9294 15.9271C14.2 15.9271 16.0316 14.0956 16.0316 11.825C16.0316 9.55428 14.2 7.72275 11.9294 7.72275ZM11.9294 14.4919C10.462 14.4919 9.26239 13.2959 9.26239 11.825C9.26239 10.354 10.4584 9.15799 11.9294 9.15799C13.4003 9.15799 14.5963 10.354 14.5963 11.825C14.5963 13.2959 13.3967 14.4919 11.9294 14.4919ZM17.1562 7.55495C17.1562 8.08692 16.7277 8.51178 16.1994 8.51178C15.6674 8.51178 15.2425 8.08335 15.2425 7.55495C15.2425 7.02656 15.671 6.59813 16.1994 6.59813C16.7277 6.59813 17.1562 7.02656 17.1562 7.55495ZM19.8731 8.52606C19.8124 7.24434 19.5197 6.10901 18.5807 5.17361C17.6453 4.23821 16.51 3.94545 15.2282 3.88118C13.9073 3.80621 9.94787 3.80621 8.62689 3.88118C7.34874 3.94188 6.21341 4.23464 5.27444 5.17004C4.33547 6.10544 4.04628 7.24077 3.98201 8.52249C3.90704 9.84347 3.90704 13.8029 3.98201 15.1238C4.04271 16.4056 4.33547 17.5409 5.27444 18.4763C6.21341 19.4117 7.34517 19.7045 8.62689 19.7687C9.94787 19.8437 13.9073 19.8437 15.2282 19.7687C16.51 19.708 17.6453 19.4153 18.5807 18.4763C19.5161 17.5409 19.8089 16.4056 19.8731 15.1238C19.9481 13.8029 19.9481 9.84704 19.8731 8.52606ZM18.1665 16.5412C17.8881 17.241 17.349 17.7801 16.6456 18.0621C15.5924 18.4799 13.0932 18.3835 11.9294 18.3835C10.7655 18.3835 8.26272 18.4763 7.21307 18.0621C6.51331 17.7837 5.9742 17.2446 5.69215 16.5412C5.27444 15.488 5.37083 12.9888 5.37083 11.825C5.37083 10.6611 5.27801 8.15832 5.69215 7.10867C5.97063 6.40891 6.50974 5.8698 7.21307 5.58775C8.26629 5.17004 10.7655 5.26643 11.9294 5.26643C13.0932 5.26643 15.596 5.17361 16.6456 5.58775C17.3454 5.86623 17.8845 6.40534 18.1665 7.10867C18.5843 8.16189 18.4879 10.6611 18.4879 11.825C18.4879 12.9888 18.5843 15.4916 18.1665 16.5412Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Signup;
