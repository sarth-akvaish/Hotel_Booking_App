import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/Appcontext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedin } = useAppContext();

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">GoVac.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedin ? (
            <>
              <Link className="flex items-center text-white px-3 hover:bg-blue-600" to="/my-bookings">My Bookings</Link>
              <Link className="flex items-center text-white px-3 hover:bg-blue-600" to="/my-hotels">My Hotels</Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-300 "
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