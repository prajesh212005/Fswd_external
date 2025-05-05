import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';
import toast from 'react-hot-toast';
import { FiArrowLeft } from 'react-icons/fi';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // For now, we'll just simulate fetching data
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        // Mock employee data based on ID
        const mockEmployee = {
          id: parseInt(id),
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
        };
        
        setEmployee(mockEmployee);
      } catch (error) {
        console.error('Error fetching employee:', error);
        toast.error('Failed to load employee data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would be an API call
      // For now, we'll just simulate a successful update
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Success toast
      toast.success('Employee updated successfully!');
      
      // Navigate to employees list
      navigate('/employees');
    } catch (error) {
      console.error('Error updating employee:', error);
      toast.error('Failed to update employee. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <p className="text-gray-500 mb-4">Employee not found.</p>
        <button
          onClick={() => navigate('/employees')}
          className="btn btn-primary"
        >
          Back to Employees
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <FiArrowLeft className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Employee</h1>
          <p className="mt-1 text-sm text-gray-500">
            Update {employee.name}'s information below.
          </p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <EmployeeForm
          initialValues={employee}
          onSubmit={handleSubmit}
          isEditMode={true}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default EditEmployee; 