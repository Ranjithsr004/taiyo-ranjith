import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateContact } from './ContactReducer'

const Update = () => {
    // selecting contacts from Redux store
    const contacts = useSelector((state) => state.contacts);

    // extracting ID from URL params
    const {id} = useParams();

    // finding the contact to update based on ID
    const oldContact = contacts.filter(f => f.id == id);

    // extracting old contact details
    const {firstName, lastName, status} = oldContact[0];

    // state variables for updated contact details
    const [newFirstName, setFirstName] = useState(firstName)
    const [newLastName, setLastName] = useState(lastName)
    const [newStatus, setStatus] = useState(status)

    // dispatch function to update contact
    const dispatch = useDispatch();

    // navigate function to redirect after update
    const navigate = useNavigate();

    // function to handle update submission
    const handleUpdate = (event) => {
        event.preventDefault();
        
        // dispatching action to update contact
        dispatch(updateContact({
            id: id,
            firstName: newFirstName,
            lastName: newLastName,
            status: newStatus
        }))
        navigate('/')
    }

  return (
    <div>
      <div className="md:px-80 lg:pr-16 mt-40" data-aos="fade-right">
            <p className="text-center text-lg font-medium text-primary uppercase mb-4 ">Edit Contact</p>
            <form  onSubmit={handleUpdate} action="">
            <div className="border border-primary w-[360px] lg:w-[400px] lg:m-auto m-5 p-4 rounded  flex flex-col gap-5">
                <div className="flex items-center  justify-between">
                    <p className="text-primary font-medium">First Name</p>
                    <input type="text" placeholder="Your First Name" name="firstName" className="outline-cyan p-3 lg:w-[280px] text-base border border-secondary rounded placeholder:text-[#808080]"
                    value={newFirstName} onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-primary font-medium">Last Name</p>
                    <input type="text" placeholder="Your Last Name" name="lastName" className="outline-cyan p-3 lg:w-[280px] text-base border border-secondary rounded placeholder:text-[#808080]" 
                    value={newLastName} onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div className="flex items-center lg:gap-[40px] lg:justify-start md:justify-between gap-12">
                    <p className="text-primary font-medium">Status</p>
                    <div className="flex items-center">
                        <input id="active" type="radio" value="Active" name="status" className="w-4 h-4" checked={newStatus === 'Active'}  onChange={e => setStatus(e.target.value)}
                        />
                        <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 ">Active</label>
                    </div>
                    <div className="flex items-center">
                        <input id="inactive" type="radio" value="Inactive" name="status" className="w-4 h-4" checked={newStatus === 'Inactive'} onChange={e => setStatus(e.target.value)}
                        />
                        <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900">Inactive</label>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <button className="bg-blue-500 p-3 text-white hover:bg-blue-700 text-base font-medium tracking-widest hover:shadow-md lg:w-[300px] rounded uppercase ">
                        Update
                    </button>                                                                    
                </div>
            </div>
            </form>
        </div>
    </div>
  )
}

export default Update
