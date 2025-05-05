import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';
import toast from 'react-hot-toast';

const AddEmployee = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would be an API call
      // For now, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Success toast
      toast.success('Employee added successfully!');
      
      // Navigate to employees list
      navigate('/employees');
    } catch (error) {
      console.error('Error adding employee:', error);
      toast.error('Failed to add employee. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add New Employee</h1>
        <p className="mt-1 text-sm text-gray-500">
          Fill in the details below to add a new employee to the system.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <EmployeeForm 
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default AddEmployee; 