import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import useLogout from "../hooks/useLogout";
import { BellIcon, LogOutIcon, ShipWheel } from "lucide-react";
import Theme from "./Theme";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-200 w-full border-b border-base-300 sticky top-0 z-30 h-16 flex items-center shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center w-full">
          
          {/* Left: Logo (visible only on chat page) */}
          {isChatPage ? (
            <Link to="/" className="flex items-center gap-2">
              <ShipWheel className="w-8 h-8 text-primary" />
              <span className="text-2xl sm:text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wide">
                Connectly
              </span>
            </Link>
          ) : (
            <div />
          )}

          {/* Right: Icons and Actions */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Notification Button */}
            <Link to="/notifications" className="relative">
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="w-6 h-6 text-base-content opacity-80 hover:animate-bounce transition-all ease-in duration-300" />
              </button>
              {/* Optional notification dot */}
              {/* <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full animate-ping" /> */}
            </Link>
            {/* Theme selector */}
            <Theme/>

            {/* User Avatar or Logout */}
            {authUser && (
              <div className="flex items-center gap-2">
                <div className="avatar">
                  <div className="w-8 rounded-full ring ring-primary mx-2 ring-offset-base-100 ring-offset-2">
                    <img
                      src={authUser?.profilePic}
                      alt="User Avatar"
                     

                    />
                  </div>
                </div>
                <button
                  onClick={logoutMutation}
                  className="hidden sm:inline btn btn-sm mx-2 text-sm"
                >
                 <LogOutIcon/>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;