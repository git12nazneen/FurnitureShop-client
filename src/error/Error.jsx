import error from '../assets/error.png'

const Error = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
      
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
  
          <p className="text-lg text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist.
          </p>
  
          {/* Illustration */}
          <img
           src={error}
            className="mx-auto w-80 mb-8"
          />
  
          {/* Return to Home Button */}
          <button
            onClick={() => window.location.href = "/"}
            className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  };
  
  export default Error;
  