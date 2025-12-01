import React, { useState } from 'react';

const Form = () => {
   
    const [user, setUser] = useState({
        name: '',
        yearsOfExperience: '', 
        employmentStatus: false 
    });

    const [errors, setErrors] = useState({});
    
    const [applicants, setApplicants] = useState([]);


    // --- HANDLERS & LOGIC ---

    // Validation Logic
    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        if (!user.name || user.name.length < 3) {
            tempErrors.name = 'Name is required and must be at least 3 characters.';
            isValid = false;
        }
        if (user.yearsOfExperience === '') {
            tempErrors.yearsOfExperience = 'Please select your years of experience.';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    // Universal Change Handler
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        
        setUser(previousValue => ({
            ...previousValue,
            [name]: type === 'checkbox' ? checked : value,
        }));
        
        // Clear error when user starts typing/selecting
        if (errors[name]) {
            setErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    // Submission Handler (Adds new user to the list)
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validate()) {
            // 1. Create a new user object with a unique ID
            const newUser = {
                id: Date.now(), // Use timestamp for a simple unique ID
                ...user
            };

            // 2. Add the new user to the 'users' list
            setApplicants(prevUsers => [...prevUsers, newUser]);
            
            // 3. Reset the form inputs
            setUser({
                name: '',
                yearsOfExperience: '',
                employmentStatus: false
            });

            alert(`User ${newUser.name} registered successfully!`);
        }
    };
    
    // Deletion Handler
    const handleDeleteUser = (userId) => {
        // Filter out the user with the matching ID
        setApplicants(prevUsers => prevUsers.filter(user => user.id !== userId));
    };


    // --- RENDER ---
   return (
        <div className="max-w-xl mx-auto mt-10">
            
            {/* 1. REGISTRATION FORM (Always visible) */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 border rounded shadow-md bg-gray-50">
                <h2 className="text-xl font-bold text-gray-700">Register New User</h2>

                {/* Name Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input 
                        name='name' 
                        value={user.name}
                        onChange={handleChange} 
                        className={`border w-full p-2 rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Years of Experience Select */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                    <select 
                        value={user.yearsOfExperience} 
                        name="yearsOfExperience" 
                        onChange={handleChange} 
                        className={`border w-full p-2 rounded ${errors.yearsOfExperience ? 'border-red-500' : 'border-gray-300'}`}
                    >
                        <option value="">Select experience</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4+</option>
                    </select>
                    {errors.yearsOfExperience && <p className="text-red-500 text-xs mt-1">{errors.yearsOfExperience}</p>}
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        name="employmentStatus" 
                        checked={user.employmentStatus} 
                        onChange={handleChange}
                        className="h-4 w-4 text-green-600 border-gray-300 rounded"
                    />
                    <label className="text-sm text-gray-700">Currently employed</label>
                </div>
                
                <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-150">
                    Register User
                </button>
            </form>

            {/*Registered users list */}
          
            {applicants.length > 0 && (
                <div className="mt-10 p-6 border rounded shadow-md bg-white">
                    <h2 className="text-xl font-bold mb-4 text-gray-700">Applicants ({applicants.length})</h2>

                    <ul className="space-y-3">
                        {applicants.map((item) => (
                            <li 
                                key={item.id} 
                                className="flex justify-between items-center p-3 border-b last:border-b-0 bg-gray-50 rounded"
                            >
                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-gray-600">
                                        Exp: {item.yearsOfExperience}+ | Status: {item.employmentStatus ? 'Employed' : 'Unemployed'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDeleteUser(item.id)}
                                    className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 transition duration-150"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Form;