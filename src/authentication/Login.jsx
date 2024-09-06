import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase.config";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo.png";
import UseAxiosPublic from "../hooks/UseAxiosPublice";
import toast from "react-hot-toast";


const Login = () => {
  const axiosPublic = UseAxiosPublic();
  const { signIn } = useAuth();
  const auth = getAuth(app);
  const location = useLocation();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    signIn(email, password)
      .then((result) => {
        toast.success('Successfully logged in')
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
    <div>
      <section className="bg-gray-300 dark:bg-gray-900">
        <div className="max-w-5xl px-6 py-24 mx-auto lg:py-32">
          <div className="lg:flex">
            <div className="lg:w-1/2">
              <img className="w-auto h-28 sm:h-8" src={logo} alt="Logo" />
              <h1 className="mt-4 text-gray-600 dark:text-gray-300 md:text-lg">
                Welcome back
              </h1>
              <h1 className="mt-4 text-2xl font-medium text-gray-800 capitalize lg:text-3xl dark:text-white">
                Login to your account
              </h1>
            </div>
            <div className="mt-8 lg:w-1/2 lg:mt-0">
              <form onSubmit={handleSubmit(onSubmit)} className="w-full lg:max-w-xl">
                <div className="relative flex items-center">
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-[#0e7673] dark:focus:border-#0e7673-300 focus:ring-#0e7673-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Email address"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div className="relative flex items-center mt-4">
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
                  <input
                    type="password"
                    {...register("password", { required: "Password is required" })}
                    className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-[#0e7673] dark:focus:border-#0e7673-300 focus:ring-#0e7673-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
                <div className="mt-8 md:flex md:items-center">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#0e7673] rounded-lg md:w-1/2 hover:bg-[#0e7673] focus:outline-none focus:ring focus:ring-#0e7673-300 focus:ring-opacity-50"
                  >
                    Sign in
                  </button>
                  <a
                    href="#"
                    className="inline-block mt-4 text-center text-[#0e7673] md:mt-0 md:mx-6 hover:underline dark:text-[#0e7673]"
                  >
                    Don't have an account?{" "}
                    <Link to="/register" className="underline text-[#0e7673]">
                      Register
                    </Link>
                  </a>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-8 md:mt-24 sm:flex sm:items-center">
            <h3 className="text-[#0e7673] dark:text-[#0e7673] sm:w-1/2">
              Social networks
            </h3>
            <div className="flex items-center mt-6 mb-5 -mx-2">
              <button
                onClick={handleGoogleLogin}
                type="button"
                className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-[#0e7673] rounded-lg hover:bg-[#113332] focus:bg-#0e7673-400 focus:outline-none"
              >
                <svg className="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
                  <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"></path>
                </svg>
                <span className="hidden mx-2 sm:inline">Sign in with Google</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
