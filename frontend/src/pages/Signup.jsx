import { useState } from "react";
import { Link } from "react-router";
import { Video } from "lucide-react";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    agree: false,
  });

   const {isPending,signupMutation,error} = useSignup();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-base-100 p-4"
      data-theme="forest"
    >
      <div className="flex w-full max-w-7xl rounded-4xl bg-base-100 md:bg-transparent shadow-2xl overflow-hidden border border-base-300">
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-14 bg-base-100">
          <form
            onSubmit={handleSignup}
            className="w-full max-w-md space-y-6 text-neutral-content"
          >
            <h1 className="text-3xl font-extrabold mb-2 flex items-center gap-2">
              <Video className="text-primary" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Connectly
              </span>
            </h1>

            <p className="mb-6 text-sm opacity-70">
              Join now and start your language learning journey
            </p>

            {error && (
              <div className="alert alert-error">
                <span>{error.response?.data?.message || error.message || "Signup failed"}</span>
              </div>
            )}

            <label className="form-control w-full">
              <span className="label-text">Full Name</span>
              <input
                required
                type="text"
                name="fullname"
                value={signupData.fullname}
                onChange={handleChange}
                placeholder="John Doe"
                className="input input-bordered w-full mb-3"
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text">Username</span>
              <input
                required
                type="text"
                name="username"
                value={signupData.username}
                onChange={handleChange}
                placeholder="johndoe123"
                className="input input-bordered w-full mb-3"
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text">Email</span>
              <input
                required
                type="email"
                name="email"
                value={signupData.email}
                onChange={handleChange}
                placeholder="hello@example.com"
                className="input input-bordered w-full mb-3"
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text">Password</span>
              <input
                required
                minLength={6}
                type="password"
                name="password"
                value={signupData.password}
                onChange={handleChange}
                placeholder="•••••••"
                className="input input-bordered w-full"
              />
              <span className="mt-1 text-xs opacity-70">
                Password must be at least 6 characters long
              </span>
            </label>

            <label className="flex items-center gap-3 text-sm mt-6">
              <input
                required
                type="checkbox"
                name="agree"
                className="checkbox checkbox-sm checkbox-primary"
                checked={signupData.agree}
                onChange={handleChange}
              />
              <span>
                I agree to the&nbsp;
                <Link to="#" className="link text-primary link-hover">
                  terms of service
                </Link>
                &nbsp;and&nbsp;
                <Link to="#" className="link text-primary link-hover">
                  privacy policy
                </Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={!signupData.agree || isPending}
              className={`btn btn-primary w-full ${
                !signupData.agree && "btn-disabled"
              }`}
            >
            {isPending?(
              <>
              <span className="loading loading-spinner loading-xs"></span>
              Loading
              </>
            ):(
              "Create Account"
            )}
            </button>

            <p className="text-center text-sm">
              Already have an account?&nbsp;
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </form>
        </div>

        <div className="hidden md:flex w-1/2 bg-base-200 relative items-center justify-center ">
          <img
            src="/public/Video Call.png"
            alt="Video call illustration"
            className=" max-w-xs sm:max-w-[40vw] lg:max-w-[20vw] xl:max-w-[25vw] h-auto object-contain drop-shadow-lg absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
            <h2 className="text-xl font-semibold">
              Connect with language partners worldwide
            </h2>
            <p className="mt-2 text-sm opacity-80 mb-6">
              Practice conversations, make friends, and improve your language
              skills together
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;