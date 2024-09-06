import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAxiosSecure from '../hooks/useAxiosSecure';

const UpdateProduct = () => {
    const products = useLoaderData();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: products.name,
            company: products.company,
            price: products.price,
            doses: products.doses,
            originalPrice: products.originalPrice,
            image: products.image,
            discount: products.discount,
            capsuleInfo: products.capsuleInfo,
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
                            <label htmlFor="name" className="block text-gray-600">Product Name</label>
                            <input
                                className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-[#0e7673] rounded-md"
                                {...register('name', { required: true })}
                                id="name"
                                type="text"
                                placeholder="Amoxicillin"
                            />
                            {errors.name && <span className="text-red-500">Product name is required</span>}
                        </div>

                        <div className="space-y-1 text-sm">
                            <label htmlFor="company" className="block text-gray-600">Company</label>
                            <input
                                className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-[#0e7673] rounded-md"
                                {...register('company', { required: true })}
                                id="company"
                                type="text"
                                placeholder="Antibiotic Pharma"
                            />
                            {errors.company && <span className="text-red-500">Company name is required</span>}
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
                            <label htmlFor="doses" className="block text-gray-600">Doses</label>
                            <select
                                {...register('doses', { required: true })}
                                id="doses"
                                className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-[#0e7673] rounded-md"
                            >
                                <option value="" disabled>Select dose</option>
                                <option value="250mg">250mg</option>
                                <option value="500mg">500mg</option>
                                <option value="600mg">600mg</option>
                            </select>
                            {errors.doses && <span className="text-red-500">Dose is required</span>}
                        </div>

                        <div className="space-y-1 text-sm">
                            <label htmlFor="originalPrice" className="block text-gray-600">Packet</label>
                            <input
                                className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-[#0e7673] rounded-md"
                                {...register('originalPrice', { required: true })}
                                id="originalPrice"
                                type="number"
                                placeholder="10"
                            />
                            {errors.originalPrice && <span className="text-red-500">Packet information is required</span>}
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
                            <label htmlFor="capsuleInfo" className="block text-gray-600">Capsule Info</label>
                            <input
                                className="w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-[#0e7673] rounded-md"
                                {...register('capsuleInfo', { required: true })}
                                id="capsuleInfo"
                                type="text"
                                placeholder="30 Capsules"
                            />
                            {errors.capsuleInfo && <span className="text-red-500">Capsule information is required</span>}
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
                    className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-[#0e7673]"
                >
                    Save & Continue
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;
