/* eslint-disable react/prop-types */
import { AvviseEndgame } from "../assets/URLs";
import { Link } from "react-router-dom";
const LoginLeft = (props) => {
  return (
    <>
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
        <Link to={props.action}>
          <h2 className="mt-5 text-sm underline">Login existing account</h2>
        </Link>
      </div>
    </>
  );
};

export default LoginLeft;
