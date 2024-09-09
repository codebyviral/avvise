const CustomModal = (props) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">{props.message}</h2>
          <div className="flex justify-end">
            <button
              onClick={props.cancel}
              className="mr-2 bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              {props.cancelMsg}
            </button>
            <button
              onClick={props.action}
              className={`${props.bgColor} text-white px-4 py-2 rounded-lg hover:opacity-80`}
            >
              {props.actionMsg}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomModal;
