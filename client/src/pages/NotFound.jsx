import { Link } from 'react-router-dom';
import { FiHome, FiAlertCircle } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <FiAlertCircle className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-4 text-4xl font-bold text-gray-900 tracking-tight">
          404
        </h1>
        <h2 className="mt-2 text-2xl font-semibold text-gray-700">
          Page Not Found
        </h2>
        <p className="mt-2 text-base text-gray-500">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="btn btn-primary inline-flex items-center"
          >
            <FiHome className="mr-2" />
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 