import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addContact } from './ContactReducer'
import { useNavigate } from 'react-router-dom'

const Create = () => {
    
    // state variables for form input fields
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [status, setStatus] = useState('')

    // selecting contacts from Redux store
    const contacts = useSelector((state) => state.contacts);

    // dispatch function to add a new contact
    const dispatch  = useDispatch();

    // navigate function to redirect after form submission
    const navigate = useNavigate()

    // function to handle form submission
    const handleSumbit = (event) => {
        event.preventDefault();
        const newId = contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1;
        dispatch(addContact({ id: newId, firstName, lastName, status }));
        navigate('/');
    }

  return (
    <div>
       <div className="md:px-80 lg:pr-16 mt-40" data-aos="fade-right">
            <p className="text-center text-lg font-medium text-primary uppercase mb-4 ">Create Contact</p>
            <form onSubmit={handleSumbit} action="">
            <div className="border border-primary w-[360px] lg:w-[400px] lg:m-auto m-5 p-4 rounded  flex flex-col gap-5">
                <div className="flex items-center  justify-between">
                    <p className="text-primary font-medium">First Name</p>
                    <input type="text" placeholder="Your First Name" name="firstName" className="outline-cyan p-3 lg:w-[280px] tettext-base border border-secondary rounded placeholder:text-[#808080]" value={firstName} 
                    onChange={e=> setFirstName(e.target.value)} required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-primary font-medium">Last Name</p>
                    <input type="text" placeholder="Your Last Name" name="lastName" className="outline-cyan p-3 lg:w-[280px] text-base border border-secondary rounded placeholder:text-[#808080]" value={lastName}
                    onChange={e=> setLastName(e.target.value)} required
                    />
                </div>
                <div className="flex items-center lg:gap-[40px] lg:justify-start md:justify-between gap-12">
                    <p className="text-primary font-medium">Status</p>
                    <div className="flex items-center">
                        <input id="active" type="radio" value="Active" name="status" className="w-4 h-4" checked={status === 'Active'} 
                        onChange={e=> setStatus(e.target.value)} required
                        />
                        <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 ">Active</label>
                    </div>
                    <div className="flex items-center">
                        <input id="inactive" type="radio" value="Inactive" name="status" className="w-4 h-4" checked={status === 'Inactive'}
                        onChange={e=> setStatus(e.target.value)} required
                        />
                        <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900">Inactive</label>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <button className="bg-blue-500 p-3 text-white hover:bg-blue-700 text-base font-medium tracking-widest hover:shadow-md lg:w-[300px] rounded uppercase " >
                        Submit
                    </button>                                                                    
                </div>
            </div>
            </form>
        </div>
    </div>
  )
}

export default Create
