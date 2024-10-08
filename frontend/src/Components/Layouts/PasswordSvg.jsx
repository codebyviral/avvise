const PasswordSvg = () => {
  return (
    <>
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
    </>
  );
};

export default PasswordSvg;
