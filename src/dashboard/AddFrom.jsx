import { useState } from 'react'
// import { imageUpload } from '../../../api/utils'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import useAxiosSecure from '../hooks/useAxiosSecure'
import useAuth from '../hooks/useAuth'
import AddProduct from './AddProduct'

const AddFrom = () => {
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const [startDate, setStartDate] = useState(new Date());

  const { mutateAsync } = useMutation({
    mutationFn: async productData => {
      const { data } = await axiosSecure.post(`/products`, productData);
      return data;
    },
    onSuccess: () => {
      console.log('Data Saved Successfully');
      toast.success('Products Added Successfully!');
      setLoading(false);
    },
  });

  //   Form handler
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const title = form.name.value;
   
    const originalPrice = form.originalPrice.value;
    const category = form.category.value;
    const image = form.image.value;
    const price = form.price.value;
    const discount = form.discount.value;
  
    const description = form.description.value;
    const date = new Date(form.date.value);
  
    try {
      const productData = {
       title,
        
        originalPrice,
       category,
        image,
        price,
        discount,
        piece,
        description,
        date,
      };
      console.table(productData);
  
      // Post request to server
      const response = await mutateAsync(productData);
      console.log(response); // Log the server response
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };
  

  const handleDateChange = (date) => {
    setStartDate(date)
  }

  return (
    <>
      {/* Form */}
      <AddProduct
         Form
        handleSubmit={handleSubmit}
        startDate={startDate}
        loading={loading}
        handleDateChange={handleDateChange} 
      />
    </>
  )
}

export default AddFrom;
