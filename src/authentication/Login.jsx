import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase.config";
import useAuth from "../hooks/useAuth";
import login from "../assets/login.png";
import UseAxiosPublic from "../hooks/UseAxiosPublice";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import fImg from "../assets/F.png";


const Login = () => {
  const axiosPublic = UseAxiosPublic();
  const { signIn } = useAuth();
  const auth = getAuth(app);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    signIn(email, password)
      .then((result) => {
        toast.success("Successfully logged in");
        navigate(location?.state?.from?.pathname || "/", { replace: true });
      })
      .catch((error) => {
        swal({
          text: "Sign in failed!",
          icon: "error",
        });
        console.error(error);
      });
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          navigate(location?.state?.from?.pathname || "/", { replace: true });
        });
      })
      .catch((error) => {
        swal({
          text: "Google sign-in failed!",
          icon: "error",
        });
        console.error("Error during social login", error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex max-w-4xl mx-auto shadow-lg">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-8 bg-white">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            Welcome Back!
          </h2>
          <p className="text-gray-600 mb-8">
            Enter your credentials to access your account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-gray-600">Email address</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className={`w-full p-2 mt-1 border rounded ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div>
              <label className="block text-gray-600">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className={`w-full p-2 mt-1 border rounded ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
              <div className="text-right text-sm text-blue-500 mt-2">
                <a href="#">Forgot Password?</a>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("terms", { required: true })}
                className="mr-2"
              />
              <label>
                I agree to the{" "}
                <a href="#" className="text-blue-500">
                  Terms & Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-black text-white font-semibold rounded"
            >
              Sign In
            </button>
          </form>

          <div className="flex items-center mt-6">
            <hr className="flex-1 border-gray-300" />
            <span className="mx-4 text-gray-500">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <div className="flex mt-6">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full p-2 border rounded-lg font-bold mr-2"
            >
              <span className="pr-1">
                <FaGoogle />
              </span>
              Sign in with Google
            </button>
            <button className="flex items-center justify-center w-full p-2 border rounded-lg font-bold ">
              <span className="pr-2">
                {" "}
                <FaApple />
              </span>
              Sign in with Apple
            </button>
          </div>
          <div className="text-center mt-4">
            <Link to="/register">
              Don't have an account?{" "}
              <a href="#" className="text-blue-500">
                Sign Up
              </a>
            </Link>
          </div>
        </div>

        {/* Right Side - Image */}
        <div
          className="hidden md:flex md:w-1/2 bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: `url(${login})` }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Centered Text */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-10">
            <img
              className="bg-sky-500 px-4 py-4 rounded-full my-3"
              src={fImg}
              alt=""
            />
            <h2 className="text-4xl font-bold text-white">
              Furni<span className="text-sky-500"> Flex</span>
            </h2>
            <p className="mt-4 text-sm text-gray-200 max-w-md">
              Discover a seamless shopping experience with our curated
              collection of products. From fashion to electronics, we bring
              quality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
