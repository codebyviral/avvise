/* eslint-disable react/prop-types */
import { Oval } from "react-loader-spinner";
const ButtonLoader = (props) => {
  return (
    <>
      <button className="mt-2 px-6 py-3 flex justify-center bg-black text-white rounded-lg hover:opacity-80">
        <Oval color="#ffff" width={20} height={20} />{" "}
        <span className="mx-2">{props.message}</span>
      </button>
    </>
  );
};

export default ButtonLoader;
