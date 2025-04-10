import { Link } from "react-router-dom";
const NavComponents = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Link
        to="/"
        className="flex flex-row mr-3 items-center text-white hover:text-neutral-900 transition-all duration-300"
      >
        <span className="flex flex-row items-center">
          <svg
            className=" flex w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          Dashboard
        </span>
      </Link>
      <Link
        to="/"
        className="flex items-center mr-3 text-white  hover:text-neutral-900 transition-all duration-300"
      >
        <span className="flex flex-row items-center">
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Mood
        </span>
      </Link>
      <Link
        to="/journals"
        className="flex items-center mr-3 text-white  hover:text-neutral-900 transition-all duration-300"
      >
        <span className="flex flex-row items-center">
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          Journal
        </span>
      </Link>
      <Link
        to="/weekAnalysis"
        className="flex items-center mr-3 text-white  hover:text-neutral-900 transition-all duration-300"
      >
        <span className="flex flex-row items-center">
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0-01-2-2z"
            />
          </svg>
          Analytics
        </span>
      </Link>
    </div>
  );
};

export default NavComponents;
