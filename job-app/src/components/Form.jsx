import React, { useState } from 'react';

{/*Detyra e shtepise:
Krijojeni nje komponente te re qe do ket nje forme ku pranon keto vlera:
Full Name
Age
Profession
Vjet eksperience
Emploment status
Forma duhet te kontrollohet permes state dhe duhet te ket validim(nuk pranohen vlera boshe)
Pasi forma te behet submit, poshte formes te listohen Aplikuesit per pune(nga te dhenat e formes) ne menyre dinamike
Tek lista e aplikuesve te jete opsioni delete ne menyre qe te largohet aplikuesi nga lista*/}
const Form = () => {
    
  
    const [user, setUser] = useState({
        name: '',
        age: '', 
        profession: '',
        yearsOfExperience: '', 
        employmentStatus: false 
    });

    const [errors, setErrors] = useState({});
    
    const [applicants, setApplicants] = useState([]); 


  

    // Validation Logic
    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        if (!user.name || user.name.length < 3) {
            tempErrors.name = 'Name is required and must be at least 3 characters.';
            isValid = false;
        }
        
        if (user.age < 18) {
            tempErrors.age = 'Age must be a valid number';
            isValid = false;
        }

       
        if (!user.profession || user.profession.length < 2) {
            tempErrors.profession = 'Profession is required.';
            isValid = false;
        }

        if (user.yearsOfExperience === '') {
            tempErrors.yearsOfExperience = 'Please select your years of experience.';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

   
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        
        setUser(previousValue => ({
            ...previousValue,
           
            [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value),
        }));
        
       
    };

   
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validate()) {
            const newUser = {
                id: Date.now(), 
                ...user
            };

            setApplicants(prevUsers => [...prevUsers, newUser]);
            
           
            setUser({
                name: '',
                age: 0,
                profession: '',
                yearsOfExperience: '',
                employmentStatus: false
            });

            alert(`User ${newUser.name} registered successfully!`);
        }
    };
    
  
    const handleDeleteUser = (userId) => {
        setApplicants(prevUsers => prevUsers.filter(user => user.id !== userId));
    };


    
    return (
        <div className="max-w-xl mx-auto mt-10">
            
           
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 border rounded shadow-md bg-gray-50">
                <h2 className="text-xl font-bold text-gray-700">Register New User</h2>

              
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
                
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Age</label>
                    <input 
                        type="number" 
                        name='age' 
                        value={user.age}
                        onChange={handleChange} 
                        className={`border w-full p-2 rounded ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                </div>

               
                <div>
                    <label className="block text-sm font-medium text-gray-700">Profession</label>
                    <input 
                        type="text" 
                        name='profession' 
                        value={user.profession}
                        onChange={handleChange} 
                        className={`border w-full p-2 rounded ${errors.profession ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.profession && <p className="text-red-500 text-xs mt-1">{errors.profession}</p>}
                </div>

               
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

            {/* Registered users list  */}
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
                                    <p className="font-semibold">{item.name} ({item.age})</p>
                                    <p className="text-sm text-gray-600">
                                        Profession: {item.profession} | Exp: {item.yearsOfExperience}+ 
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Status: {item.employmentStatus ? 'Employed' : 'Unemployed'}
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