import { AvviseEndgame } from "../assets/URLs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 mt-20">
      <div className="container p-6 mx-auto">
        <div className="lg:flex">
          <div className="w-full -mx-6 lg:w-2/5">
            <div className="px-6">
              <Link to="#">
                <img
                  className="w-auto h-7 lg:h-12"
                  src={AvviseEndgame}
                  alt="Logo"
                />
              </Link>
              ✨
              <p className="max-w-sm mt-2 text-gray-500 dark:text-gray-400">
                <a className="underline" href="https://github.com/codebyviral/avvise/blob/main/AvviseROC.pdf">©2024 AVVISE</a> . All rights reserved. <br /> Join
                1k+ others and never miss out on new features.
              </p>
              <div className="flex mt-6 -mx-2">
                <a
                  href="#"
                  className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                  aria-label="Reddit"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* SVG Path here */}
                  </svg>
                </a>

                <a
                  href="#"
                  className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* SVG Path here */}
                  </svg>
                </a>

                <a
                  href="#"
                  className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                  aria-label="Github"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* SVG Path here */}
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 lg:mt-0 lg:flex-1">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
              <div>
                <h3 className="text-gray-700 uppercase cursor-default dark:text-white">
                  About
                </h3>
                <Link
                  to="/admin"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Admin
                </Link>
                <Link
                  to="#"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Community
                </Link>
                <Link
                  to="#"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Careers
                </Link>
              </div>

              <div>
                <h3 className="text-gray-700 uppercase dark:text-white cursor-default">
                  Blog
                </h3>
                <Link
                  to="#"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Recent Posts
                </Link>
                <Link
                  to="#"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Popular Posts
                </Link>
                <Link
                  to="#"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Tutorials
                </Link>
              </div>

              <div>
                <h3 className="text-gray-700 uppercase dark:text-white cursor-default">
                  Techs
                </h3>
                <Link
                  to="#"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  OMR
                </Link>
                <Link
                  to="#"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Software
                </Link>
                <Link
                  to="#"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Application
                </Link>
              </div>

              <div className="">
                <h3 className="text-gray-700 uppercase dark:text-white cursor-default">
                  Contact
                </h3>
                <a
                  href="mailto:viralvaghela.dev@gmail.com"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="h-px ..." />
        {/* Additional footer content here */}
      </div>
    </footer>
  );
};

export default Footer;
