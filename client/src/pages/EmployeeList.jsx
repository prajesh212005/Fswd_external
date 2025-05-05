import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUserPlus, FiSearch, FiEdit2, FiEye, FiTrash2, FiFilter } from 'react-icons/fi';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('all');

  useEffect(() => {
    // In a real app, this would fetch employees from the API
    // For now, we'll use mock data
    const mockEmployees = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        position: 'Full Stack Developer',
        department: 'Engineering',
        status: 'active',
        hireDate: '2020-01-15',
        profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
        employeeType: 'Full-time',
        address: '123 Main St, City, Country',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '987-654-3210',
        position: 'UI/UX Designer',
        department: 'Design',
        status: 'active',
        hireDate: '2020-03-10',
        profilePic: 'https://randomuser.me/api/portraits/women/1.jpg',
        employeeType: 'Full-time',
        address: '456 Elm St, City, Country',
      },
      {
        id: 3,
        name: 'Robert Johnson',
        email: 'robert.johnson@example.com',
        phone: '555-123-4567',
        position: 'Product Manager',
        department: 'Product',
        status: 'active',
        hireDate: '2020-05-20',
        profilePic: 'https://randomuser.me/api/portraits/men/2.jpg',
        employeeType: 'Contract',
        address: '789 Oak St, City, Country',
      },
      {
        id: 4,
        name: 'Emily Wilson',
        email: 'emily.wilson@example.com',
        phone: '555-987-6543',
        position: 'Marketing Specialist',
        department: 'Marketing',
        status: 'inactive',
        hireDate: '2019-11-15',
        profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
        employeeType: 'Part-time',
        address: '101 Pine St, City, Country',
      },
      {
        id: 5,
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        phone: '555-246-8135',
        position: 'Backend Developer',
        department: 'Engineering',
        status: 'active',
        hireDate: '2021-02-08',
        profilePic: 'https://randomuser.me/api/portraits/men/3.jpg',
        employeeType: 'Full-time',
        address: '202 Maple St, City, Country',
      },
      {
        id: 6,
        name: 'Sarah Davis',
        email: 'sarah.davis@example.com',
        phone: '555-369-2580',
        position: 'Frontend Developer',
        department: 'Engineering',
        status: 'inactive',
        hireDate: '2020-08-17',
        profilePic: 'https://randomuser.me/api/portraits/women/3.jpg',
        employeeType: 'Contract',
        address: '303 Birch St, City, Country',
      },
    ];
    
    setEmployees(mockEmployees);
    setFilteredEmployees(mockEmployees);
  }, []);

  useEffect(() => {
    // Filter employees based on search term and current filter
    let result = employees;
    
    // Apply status filter
    if (currentFilter !== 'all') {
      result = result.filter(employee => employee.status === currentFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        employee =>
          employee.name.toLowerCase().includes(term) ||
          employee.position.toLowerCase().includes(term) ||
          employee.department.toLowerCase().includes(term) ||
          employee.email.toLowerCase().includes(term)
      );
    }
    
    setFilteredEmployees(result);
  }, [searchTerm, employees, currentFilter]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const openDeleteModal = (employee) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedEmployee(null);
  };

  const openViewModal = (employee) => {
    setSelectedEmployee(employee);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleDeleteEmployee = () => {
    // In a real app, this would call the API to delete the employee
    const updatedEmployees = employees.filter(
      (employee) => employee.id !== selectedEmployee.id
    );
    setEmployees(updatedEmployees);
    closeDeleteModal();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        <Link to="/employees/add" className="btn btn-primary inline-flex items-center mt-4 sm:mt-0">
          <FiUserPlus className="mr-2" />
          Add Employee
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <FiFilter className="text-gray-500" />
            <span className="text-gray-700 font-medium">Filter:</span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleFilterChange('all')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  currentFilter === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleFilterChange('active')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  currentFilter === 'active'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => handleFilterChange('inactive')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  currentFilter === 'inactive'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Inactive
              </button>
            </div>
          </div>
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="input-field pl-10"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={employee.profilePic}
                            alt={employee.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {employee.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {employee.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {employee.position}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {employee.department}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {employee.employeeType}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          employee.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {employee.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openViewModal(employee)}
                        className="text-white bg-primary hover:bg-primary-dark p-2 rounded-full mr-3"
                      >
                        <FiEye className="h-4 w-4" />
                      </button>
                      <Link
                        to={`/employees/edit/${employee.id}`}
                        className="text-white bg-secondary hover:bg-secondary-dark p-2 rounded-full mr-3"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => openDeleteModal(employee)}
                        className="text-white bg-red-500 hover:bg-red-600 p-2 rounded-full"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No employees found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Employee Modal */}
      <Transition appear show={isViewModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeViewModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {selectedEmployee && (
                    <>
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Employee Details
                      </Dialog.Title>

                      <div className="mt-4 flex flex-col items-center">
                        <img
                          src={selectedEmployee.profilePic}
                          alt={selectedEmployee.name}
                          className="h-24 w-24 rounded-full object-cover mb-4"
                        />
                        <h3 className="text-xl font-bold text-gray-900">
                          {selectedEmployee.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {selectedEmployee.position}
                        </p>
                      </div>
                      
                      <div className="mt-4 space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-500">Department:</span>
                          <span className="text-sm text-gray-900">{selectedEmployee.department}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-500">Employee Type:</span>
                          <span className="text-sm text-gray-900">{selectedEmployee.employeeType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-500">Status:</span>
                          <span className={`text-sm ${selectedEmployee.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                            {selectedEmployee.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-500">Email:</span>
                          <span className="text-sm text-gray-900">{selectedEmployee.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-500">Phone:</span>
                          <span className="text-sm text-gray-900">{selectedEmployee.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-500">Hire Date:</span>
                          <span className="text-sm text-gray-900">{selectedEmployee.hireDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-500">Address:</span>
                          <span className="text-sm text-gray-900">{selectedEmployee.address}</span>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end">
                        <button
                          type="button"
                          className="btn btn-primary mr-2"
                          onClick={() => {
                            closeViewModal();
                            // Navigate to edit page
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
                          onClick={closeViewModal}
                        >
                          Close
                        </button>
                      </div>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Delete Confirmation Modal */}
      <Transition appear show={isDeleteModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDeleteModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete Employee
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete {selectedEmployee?.name}? This action cannot be undone.
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
                      onClick={closeDeleteModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn bg-red-500 text-white hover:bg-red-600"
                      onClick={handleDeleteEmployee}
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default EmployeeList; 