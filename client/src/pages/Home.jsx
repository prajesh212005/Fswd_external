import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FiUsers, FiUserPlus, FiBarChart2, FiShield } from 'react-icons/fi';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <AuthenticatedHome user={user} />
      ) : (
        <UnauthenticatedHome />
      )}
    </div>
  );
};

const AuthenticatedHome = ({ user }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Welcome back, {user?.name || 'User'}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage your employees efficiently with our employee management system.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary-dark bg-opacity-10 rounded-md p-3">
                <FiUsers className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Manage Employees
                  </dt>
                  <dd>
                    <Link to="/employees" className="mt-1 text-primary hover:text-primary-dark font-medium">
                      View all employees
                    </Link>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-secondary-dark bg-opacity-10 rounded-md p-3">
                <FiUserPlus className="h-6 w-6 text-secondary" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Add Employee
                  </dt>
                  <dd>
                    <Link to="/employees/add" className="mt-1 text-secondary hover:text-secondary-dark font-medium">
                      Create new profile
                    </Link>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <FiBarChart2 className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Dashboard
                  </dt>
                  <dd>
                    <Link to="/dashboard" className="mt-1 text-green-600 hover:text-green-800 font-medium">
                      View statistics
                    </Link>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                <FiShield className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Account
                  </dt>
                  <dd>
                    <Link to="/account" className="mt-1 text-purple-600 hover:text-purple-800 font-medium">
                      Manage your account
                    </Link>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Quick Actions
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <div className="text-sm font-medium text-gray-500">
              Search Employees
            </div>
            <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Search by name, position, or department..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UnauthenticatedHome = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Employee Management System
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            Efficiently manage your workforce with our comprehensive employee management solution.
          </p>
        </div>
        
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-primary rounded-md shadow-lg">
                      <FiUsers className="h-6 w-6 text-white" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                    Employee Records
                  </h3>
                  <p className="mt-5 text-base text-gray-500">
                    Store and organize all your employee data in one secure location.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-secondary rounded-md shadow-lg">
                      <FiBarChart2 className="h-6 w-6 text-white" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                    Advanced Analytics
                  </h3>
                  <p className="mt-5 text-base text-gray-500">
                    Gain insights into your workforce with detailed analytics and reports.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg">
                      <FiShield className="h-6 w-6 text-white" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                    Secure & Reliable
                  </h3>
                  <p className="mt-5 text-base text-gray-500">
                    Your employee data is protected with enterprise-grade security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center space-x-4">
          <Link to="/login" className="btn btn-primary px-8 py-3">
            Sign In
          </Link>
          <Link to="/register" className="btn px-8 py-3 bg-gray-100 text-gray-700 hover:bg-gray-200">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home; 