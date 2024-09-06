
import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CheckOutForm = ({ resetCart }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()

  // Populate form fields with user information
  React.useEffect(() => {
    
    if (user) {
      setValue('username', user.displayName || '');
      setValue('emailAddress', user.email || '');
    }
  }, [user, setValue]);

  // Define the mutation
  const mutation = useMutation({
    mutationFn: async (productData) => {
      const { data } = await axiosSecure.post(`/payments`, productData);
      return data;
    },
    onSuccess: () => {
      toast.success('Order placed successfully!');
      resetCart(); // Clear the cart after successful order
      navigate('/')
    },
    onError: () => {
      toast.error('Failed to place order. Please try again.');
    },
  });

  const onSubmit = async (data) => {
    try {
      // You can include any additional logic here before mutation
      const paymentData = {
        ...data,
        userId: user.id,
        // Add other necessary fields here
      };
      mutation.mutate(paymentData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <section className="max-w-4xl p-6 m-20 mx-auto bg-gray-100 rounded-md shadow-md dark:bg-gray-800">
      <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Account settings</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              disabled
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-#0e7673-400 focus:ring-#0e7673-300 focus:ring-opacity-40 dark:focus:border-#0e7673-300 focus:outline-none focus:ring"
              {...register('username', { required: 'Username is required' })}
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
          </div>

          <div>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">Email Address</label>
            <input
              id="emailAddress"
              type="email"
              disabled
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-#0e7673-400 focus:ring-#0e7673-300 focus:ring-opacity-40 dark:focus:border-#0e7673-300 focus:outline-none focus:ring"
              {...register('emailAddress', { required: 'Email Address is required' })}
            />
            {errors.emailAddress && <p className="text-red-500 text-xs mt-1">{errors.emailAddress.message}</p>}
          </div>

          <div>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-#0e7673-400 focus:ring-#0e7673-300 focus:ring-opacity-40 dark:focus:border-#0e7673-300 focus:outline-none focus:ring"
              {...register('address', { required: 'Address is required' })}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
          </div>

          <div>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              type="tel"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-#0e7673-400 focus:ring-#0e7673-300 focus:ring-opacity-40 dark:focus:border-#0e7673-300 focus:outline-none focus:ring"
              {...register('phoneNumber', { required: 'Phone Number is required' })}
            />
            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
          </div>

          <div>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="totalAmount">Total Amount</label>
            <input
              id="totalAmount"
              type="number"
              step="0.01"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-#0e7673-400 focus:ring-#0e7673-300 focus:ring-opacity-40 dark:focus:border-#0e7673-300 focus:outline-none focus:ring"
              {...register('totalAmount', { required: 'Total Amount is required' })}
            />
            {errors.totalAmount && <p className="text-red-500 text-xs mt-1">{errors.totalAmount.message}</p>}
          </div>

          <div>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="paymentMethod">Payment Method</label>
            <select
              id="paymentMethod"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-#0e7673-400 focus:ring-#0e7673-300 focus:ring-opacity-40 dark:focus:border-#0e7673-300 focus:outline-none focus:ring"
              {...register('paymentMethod', { required: 'Payment Method is required' })}
            >
              <option value="cashOnDelivery" selected>Cash on Delivery</option>
              <option value="creditCard">Credit Card</option>
              <option value="paypal">PayPal</option>
              {/* Add more payment options as needed */}
            </select>
            {errors.paymentMethod && <p className="text-red-500 text-xs mt-1">{errors.paymentMethod.message}</p>}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? 'Placing Order...' : 'Place an Order'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CheckOutForm;

