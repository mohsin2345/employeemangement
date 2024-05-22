import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategory = () => {
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/add_category', { category })
            .then(result => {
                if (result.data.Status) {
                    toast.success('Category added successfully!');
                    setTimeout(() => navigate('/auth/dashboard/category'), 2000); // Navigate after 2 seconds
                } else {
                    toast.error(result.data.Error);
                }
            })
            .catch(err => {
                console.log(err);
                toast.error('An error occurred while adding the category.');
            });
    };

    return (
        <div className='d-flex justify-content-center align-items-center h-75'>
            <div className='p-3 rounded w-25 border'>
                <h2>Add Category</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="category"><strong>Category:</strong></label>
                        <input
                            type="text"
                            name='category'
                            placeholder='Enter Category'
                            onChange={(e) => setCategory(e.target.value)}
                            className='form-control rounded-0'
                        />
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Add Category</button>
                </form>
            </div>
            <ToastContainer /> {/* Toast container to show messages */}
        </div>
    );
};

export default AddCategory;
