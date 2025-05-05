import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FiUsers, FiUserPlus, FiSearch, FiActivity } from 'react-icons/fi';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    inactiveEmployees: 0,
    recentlyAdded: []
  });

  useEffect(() => {
    // In a real app, this would fetch data from the backend
    // For now, we'll use mock data
    setStats({
      totalEmployees: 24,
      activeEmployees: 20,
      inactiveEmployees: 4,
      recentlyAdded: [
        { id: 1, name: 'John Doe', position: 'Full Stack Developer', department: 'Engineering', joinedAt: '2 days ago' },
        { id: 2, name: 'Jane Smith', position: 'UI/UX Designer', department: 'Design', joinedAt: '3 days ago' },
        { id: 3, name: 'Robert Johnson', position: 'Product Manager', department: 'Product', joinedAt: '5 days ago' },
      ]
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div>
          <Link
            to="/employees/add"
            className="btn btn-primary inline-flex items-center"
          >
            <FiUserPlus className="mr-2" />
            Add Employee
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-dark bg-opacity-10">
              <FiUsers className="h-6 w-6 text-primary" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600">Total Employees</h2>
              <p className="text-2xl font-bold text-gray-900">{stats.totalEmployees}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <FiActivity className="h-6 w-6 text-green-500" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600">Active Employees</h2>
              <p className="text-2xl font-bold text-gray-900">{stats.activeEmployees}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100">
              <FiActivity className="h-6 w-6 text-red-500" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600">Inactive Employees</h2>
              <p className="text-2xl font-bold text-gray-900">{stats.inactiveEmployees}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search Box */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="max-w-lg mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="input-field pl-10"
              placeholder="Search employees by name, department, or position..."
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Quick search for employees. For more advanced filtering, go to the <Link to="/employees" className="text-primary hover:underline">Employees page</Link>.
          </p>
        </div>
      </div>
      
      {/* Recently Added Employees */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recently Added Employees</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.recentlyAdded.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {employee.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {employee.position}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {employee.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.joinedAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/employees/${employee.id}`} className="text-primary hover:text-primary-dark mr-4">
                      View
                    </Link>
                    <Link to={`/employees/edit/${employee.id}`} className="text-secondary hover:text-secondary-dark">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-center">
          <Link to="/employees" className="text-primary hover:text-primary-dark font-medium">
            View all employees
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 