import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-black text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">AVVISE</h2>
              <p className="text-gray-400">
                Next-Level Student Evaluation WebApp
              </p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
              <ul>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <ul>
                <li className="text-gray-400">
                  Email:{" "}
                  <a href="mailto:viralvaghela.dev@gmail.com">
                    viralvaghela.dev@gmail.com
                  </a>
                </li>
                <li className="text-gray-400">Phone: +91 9426995196</li>
                <li className="text-gray-400">
                  Address: Gandhinagar, Gujarat - 382007
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center text-gray-400 mt-6">
            &copy; 2024 AVVISE. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
