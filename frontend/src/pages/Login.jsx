import { useState } from "react";
import { Link } from "react-router";
import { Video } from "lucide-react";
import useLogin from "../hooks/useLogin.js";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-base-100 p-2 sm:p-4"
      data-theme="forest"
    >
      <div className="flex flex-col lg:flex-row w-full max-w-7xl rounded-lg lg:rounded-4xl bg-base-100 min-h-[80vh] lg:h-[70vh] shadow-2xl overflow-hidden border border-base-300">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-14 bg-base-100">
          <form
            onSubmit={handleLogin}
            className="w-full max-w-md space-y-4 sm:space-y-6 text-neutral-content"
          >
            <div className="text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 flex items-center justify-center lg:justify-start gap-2">
                <Video className="text-primary" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Connectly
                </span>
              </h1>

              <p className="mb-4 sm:mb-6 text-sm opacity-70">
                Login and start your language learning journey
              </p>
            </div>

            {error && (
              <div className="alert alert-error text-sm">
                <span>
                  {error.response?.data?.message ||
                    error.message ||
                    "Login failed"}
                </span>
              </div>
            )}

            <div className="space-y-4">
              <label className="form-control w-full">
                <span className="label-text text-sm sm:text-base">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  placeholder="hello@example.com"
                  className="input input-bordered w-full text-sm sm:text-base"
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text text-sm sm:text-base">
                  Password
                </span>
                <input
                  required
                  minLength={6}
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  placeholder="•••••••"
                  className="input input-bordered w-full text-sm sm:text-base"
                />
                <span className="mt-1 text-xs opacity-70">
                  Password must be at least 6 characters long
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="btn btn-primary w-full text-sm sm:text-base"
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>

            <p className="text-center text-xs sm:text-sm">
              Don't have an account?&nbsp;
              <Link to="/signup" className="link link-primary">
                Create new account
              </Link>
            </p>
          </form>
        </div>

        {/* Illustration Section */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-base-200 relative items-center justify-center p-4 lg:p-8 min-h-[300px] lg:min-h-0">
          {" "}
          <img
            src="/video-call.png"
            alt="Video call illustration"
            className="max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-xs xl:max-w-sm h-auto object-contain drop-shadow-lg"
          />
          <div className="absolute bottom-4 lg:bottom-12 left-1/2 -translate-x-1/2 text-center px-4">
            <h2 className="text-lg sm:text-xl font-semibold">
              Connect with language partners worldwide
            </h2>
            <p className="mt-2 text-xs sm:text-sm opacity-80 mb-4 lg:mb-6 max-w-sm">
              Practice conversations, make friends, and improve your language
              skills together
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
