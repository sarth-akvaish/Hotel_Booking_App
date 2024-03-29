import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/Appcontext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedin } = useAppContext();

  return (
    <div className="bg-blue-800 py-6 md:px-10">
      <div className="mx-4 flex justify-between">
        <span className="text-2xl md:text-3xl text-white font-bold tracking-tight">
          <Link to="/">GoVac.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedin ? (
            <>
              <Link className="flex text-[13px] md:text-[16px] items-center text-white px-2 md:px-3 hover:bg-blue-600" to="/my-bookings">My Bookings</Link>
              <Link className="flex text-[13px] md:text-[16px] items-center text-white px-2 md:px-3 hover:bg-blue-600" to="/my-hotel">My Hotels</Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex rounded-md text-[13px] md:text-[16px] px-1 bg-white items-center text-blue-600 md:px-3 font-bold hover:bg-gray-300 "
            >
              Sign In
            </Link> 
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
