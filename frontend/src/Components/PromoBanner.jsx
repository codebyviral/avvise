import { Link } from "react-router-dom";
const PromoBanner = () => {
  return (
    <div
      id="promo"
      className="relative isolate flex flex-col sm:flex-row items-center justify-center gap-y-4 sm:gap-x-6 overflow-hidden bg-gray-50 px-4 py-4 sm:px-6 sm:py-2.5"
    >
      <div
        className="absolute left-[-50%] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl sm:left-[-10%] sm:top-1/2 sm:-translate-y-1/2 sm:transform-gpu"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[24rem] sm:w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
        ></div>
      </div>
      <div
        className="absolute right-[-50%] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl sm:right-[-10%] sm:top-1/2 sm:-translate-y-1/2 sm:transform-gpu"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[24rem] sm:w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
        ></div>
      </div>
      <div className="relative flex flex-col items-center gap-y-2 sm:flex-row sm:items-center sm:gap-x-4">
        <p className="text-sm leading-6 text-gray-900 text-center sm:text-left">
          <strong className="font-semibold">Discover AVVISE</strong>
          <svg
            viewBox="0 0 2 2"
            className="mx-2 inline h-0.5 w-0.5 fill-current"
            aria-hidden="true"
          >
            <circle cx="1" cy="1" r="1" />
          </svg>
          <Link to="/docs">
            <span className="underline">Release v2.0</span> &nbsp; Experience
            the latest features and improvements. 🎉
          </Link>
        </p>
        <a
          href="/signup"
          className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          Sign up <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-1 justify-end">
        {/* Optionally, you can include a dismiss button */}
        {/* <button
          onClick={closeDismiss}
          type="button"
          className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
        >
          <span className="sr-only">Dismiss</span>
          <svg
            className="h-5 w-5 text-gray-900"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button> */}
      </div>
    </div>
  );
};

export default PromoBanner;
