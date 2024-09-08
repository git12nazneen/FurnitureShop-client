import  { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAxiosSecure from '../hooks/useAxiosSecure';

const UpdateProduct = () => {
    const products = useLoaderData();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: products.title,
           
            price: products.price,
            originalPrice: products.originalPrice,
            image: products.image,
            discount: products.discount,
            piece: products.piece,

            description: products.description,
        }
    });

    const onSubmit = async (data) => {
        try {
            const response = await axiosSecure.patch(`/products/${products._id}`, data);
            if (response.data.modifiedCount > 0) {
                toast.success('Data updated successfully');
            }
        } catch (error) {
            toast.error('Failed to update data');
        }
    };

    return (
        <div className="w-full p-10 min-h-[calc(100vh-60px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <div className="space-y-1 text-sm">
                            <label htmlFor="title" className="block text-gray-600">Product Name</label>
                            <input
                                className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-[#0e7673] rounded-md"
                                {...register('title', { required: true })}
                                id="title"
                                type="text"
                                placeholder="Amoxicillin"
                            />
                            {errors.title && <span className="text-red-500">Product name is required</span>}
                        </div>

                        

                        <div className="space-y-1 text-sm">
                            <label htmlFor="price" className="block text-gray-600">Original Price</label>
                            <input
                                className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-[#0e7673] rounded-md"
                                {...register('price', { required: true })}
                                id="price"
                                type="number"
                                placeholder="55.00"
                            />
                            {errors.price && <span className="text-red-500">Price is required</span>}
                        </div>

                        

                        <div className="space-y-1 text-sm">
                            <label htmlFor="piece" className="block text-gray-600">Piece</label>
                            <input
                                className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-[#0e7673] rounded-md"
                                {...register('piece', { required: true })}
                                id="piece"
                                type="number"
                                placeholder="10"
                            />
                            {errors.piece && <span className="text-red-500">Piece information is required</span>}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-1 text-sm">
                            <label htmlFor="image" className="block text-gray-600">Image URL</label>
                            <input
                                className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-[#0e7673] rounded-md"
                                {...register('image', { required: true })}
                                id="image"
                                type="text"
                                placeholder="Image URL"
                            />
                            {errors.image && <span className="text-red-500">Image URL is required</span>}
                        </div>

                        <div className="space-y-1 text-sm">
                            <label htmlFor="price" className="block text-gray-600">Price</label>
                            <input
                                className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-[#0e7673] rounded-md"
                                {...register('price', { required: true })}
                                id="price"
                                type="number"
                                placeholder="50.00"
                            />
                            {errors.price && <span className="text-red-500">Price is required</span>}
                        </div>

                        <div className="space-y-1 text-sm">
                            <label htmlFor="discount" className="block text-gray-600">Discount</label>
                            <input
                                className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-[#0e7673] rounded-md"
                                {...register('discount', { required: true })}
                                id="discount"
                                type="text"
                                placeholder="9% OFF"
                            />
                            {errors.discount && <span className="text-red-500">Discount is required</span>}
                        </div>

                       

                        <div className="space-y-1 text-sm">
                            <label htmlFor="description" className="block text-gray-600">Description</label>
                            <textarea
                                id="description"
                                className="block w-full h-32 px-4 py-3 text-gray-800 border border-gray-300 focus:outline-[#0e7673] rounded-md"
                                {...register('description')}
                                placeholder="Amoxicillin"
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-black"
                >
                    Save & Continue
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;
