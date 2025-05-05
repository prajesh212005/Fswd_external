import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FiUser, FiMail, FiPhone, FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';

const employeeTypes = [
  { id: 'full-time', name: 'Full-time' },
  { id: 'part-time', name: 'Part-time' },
  { id: 'contract', name: 'Contract' },
  { id: 'internship', name: 'Internship' },
];

const departments = [
  { id: 'engineering', name: 'Engineering' },
  { id: 'design', name: 'Design' },
  { id: 'product', name: 'Product' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'sales', name: 'Sales' },
  { id: 'hr', name: 'Human Resources' },
  { id: 'finance', name: 'Finance' },
];

const EmployeeForm = ({ initialValues, onSubmit, isEditMode = false }) => {
  const [profilePreview, setProfilePreview] = useState(null);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    position: Yup.string().required('Position is required'),
    department: Yup.string().required('Department is required'),
    employeeType: Yup.string().required('Employee type is required'),
    hireDate: Yup.date().required('Hire date is required'),
    address: Yup.string().required('Address is required'),
    status: Yup.string().required('Status is required'),
  });

  const formik = useFormik({
    initialValues: initialValues || {
      name: '',
      email: '',
      phone: '',
      position: '',
      department: '',
      employeeType: '',
      hireDate: '',
      address: '',
      status: 'active',
      profilePic: null,
    },
    validationSchema,
    onSubmit: (values) => {
      // Convert the profilePic File object to a base64 string or URL before submitting
      const formData = new FormData();
      
      for (const key in values) {
        if (key === 'profilePic' && values[key] && values[key] instanceof File) {
          formData.append('profilePic', values[key]);
        } else {
          formData.append(key, values[key]);
        }
      }
      
      onSubmit(formData);
    },
  });

  useEffect(() => {
    // Set profile preview when initialValues has a profilePic URL
    if (initialValues?.profilePic && typeof initialValues.profilePic === 'string') {
      setProfilePreview(initialValues.profilePic);
    }
  }, [initialValues]);

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      formik.setFieldValue('profilePic', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Picture Upload */}
        <div className="md:col-span-2 flex flex-col items-center">
          <div className="mb-4">
            <div className="relative h-32 w-32 overflow-hidden rounded-full bg-gray-100">
              {profilePreview ? (
                <img
                  src={profilePreview}
                  alt="Profile preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200">
                  <FiUser className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
          </div>
          <label
            htmlFor="profilePic"
            className="btn btn-secondary cursor-pointer"
          >
            {isEditMode ? 'Change Photo' : 'Upload Photo'}
          </label>
          <input
            id="profilePic"
            name="profilePic"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                className={`input-field pl-10 ${
                  formik.touched.name && formik.errors.name ? 'border-red-500' : ''
                }`}
                placeholder="John Doe"
                {...formik.getFieldProps('name')}
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                className={`input-field pl-10 ${
                  formik.touched.email && formik.errors.email ? 'border-red-500' : ''
                }`}
                placeholder="john.doe@example.com"
                {...formik.getFieldProps('email')}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiPhone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                className={`input-field pl-10 ${
                  formik.touched.phone && formik.errors.phone ? 'border-red-500' : ''
                }`}
                placeholder="123-456-7890"
                {...formik.getFieldProps('phone')}
              />
            </div>
            {formik.touched.phone && formik.errors.phone && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.phone}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="address"
                name="address"
                type="text"
                className={`input-field pl-10 ${
                  formik.touched.address && formik.errors.address ? 'border-red-500' : ''
                }`}
                placeholder="123 Main St, City, Country"
                {...formik.getFieldProps('address')}
              />
            </div>
            {formik.touched.address && formik.errors.address && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.address}</p>
            )}
          </div>
        </div>

        {/* Employment Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Employment Information</h3>
          
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">
              Position
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiBriefcase className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="position"
                name="position"
                type="text"
                className={`input-field pl-10 ${
                  formik.touched.position && formik.errors.position ? 'border-red-500' : ''
                }`}
                placeholder="Software Engineer"
                {...formik.getFieldProps('position')}
              />
            </div>
            {formik.touched.position && formik.errors.position && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.position}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <div className="mt-1">
              <select
                id="department"
                name="department"
                className={`input-field ${
                  formik.touched.department && formik.errors.department ? 'border-red-500' : ''
                }`}
                {...formik.getFieldProps('department')}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
            {formik.touched.department && formik.errors.department && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.department}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="employeeType" className="block text-sm font-medium text-gray-700">
              Employee Type
            </label>
            <div className="mt-1">
              <select
                id="employeeType"
                name="employeeType"
                className={`input-field ${
                  formik.touched.employeeType && formik.errors.employeeType ? 'border-red-500' : ''
                }`}
                {...formik.getFieldProps('employeeType')}
              >
                <option value="">Select Employee Type</option>
                {employeeTypes.map((type) => (
                  <option key={type.id} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            {formik.touched.employeeType && formik.errors.employeeType && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.employeeType}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="hireDate" className="block text-sm font-medium text-gray-700">
              Hire Date
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCalendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="hireDate"
                name="hireDate"
                type="date"
                className={`input-field pl-10 ${
                  formik.touched.hireDate && formik.errors.hireDate ? 'border-red-500' : ''
                }`}
                {...formik.getFieldProps('hireDate')}
              />
            </div>
            {formik.touched.hireDate && formik.errors.hireDate && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.hireDate}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <div className="mt-1">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    id="status-active"
                    name="status"
                    type="radio"
                    value="active"
                    checked={formik.values.status === 'active'}
                    onChange={formik.handleChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <label
                    htmlFor="status-active"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Active
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="status-inactive"
                    name="status"
                    type="radio"
                    value="inactive"
                    checked={formik.values.status === 'inactive'}
                    onChange={formik.handleChange}
                    className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300"
                  />
                  <label
                    htmlFor="status-inactive"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Inactive
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting
            ? 'Saving...'
            : isEditMode
            ? 'Update Employee'
            : 'Add Employee'}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm; 