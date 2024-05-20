import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoPersonAdd } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteContact } from './ContactReducer';
import { TypeAnimation } from 'react-type-animation';

const ContactPage = () => {
    // selecting contacts from Redux store
    const contacts = useSelector((state) => state.contacts);

    // dispatch function to delete a contact
    const dispatch = useDispatch();

    // function to handle deletion of a contact
    const handleDelete = (id) => {
        dispatch(deleteContact({id: id}))
    }

  return (
    <div className="ml-4 lg:ml-64 p-4 sm:ml-64" data-aos="fade-down">
            <p className='px-8 py-16 text-center sm:text-4xl text-3xl font-bold mt-4'>
            {/* Animation for title */}
            <TypeAnimation 
                sequence={[
                "Contact Page",
                1000,
                ]}
                wrapper='span'
                speed={50}
                repeat={Infinity}
                cursor={false}
                />
            </p>
        <div className=" w-full">
            <div className='mb-8 w-48'>
                <Link to='/create'><button type="button" className="focus:outline-none text-white flex  bg-green-700 hover:bg-green-800  font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 ">
                    Create Contact <IoPersonAdd  size={20} className='ml-2'/>
                </button></Link>
            </div>
            
                {/* checking whether contacts is availabile or not for handle error */}
            {contacts.length === 0 ? 
            (<div className='text-xl font-bold'>
                <p>No Contact Found</p>
                <p>Please add contact from</p>
                <p>Create Contact Button</p>
            </div>) :
            (<div className='grid lg:grid-cols-3 gap-8'>
                {contacts.map((contact, index) =>(
                    <div className="h-50 w-[350px] rounded-lg bg-gray-200 " key={index}>
                    <div className="flex items-center justify-between border-b">
                        <div className="p-3 text-lg">
                            <span className='font-semibold'>First Name : </span>{contact.firstName}
                        </div>
                    </div>
                    <div className="p-3 text-lg">
                        <span className='font-semibold'>Last Name : </span>{contact.lastName}
                    </div>
                    <div className="p-3 border-t text-lg">
                        <span className='font-semibold'>Status : </span>{contact.status}
                    </div>
                    <div className="p-3 flex">
                        <Link to={`/edit/${contact.id}`}><button className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center">
                            <FaRegEdit />
                            <span>Edit</span>
                        </button></Link>
                        <button onClick={() => handleDelete(contact.id)} className="text-slate-800 hover:text-red-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center">
                            <RiDeleteBin6Line />
                            <span>Delete</span>
                        </button>
                    </div>
                </div>    
                ))}
            </div>)}
        </div>
    </div>
  )
}

export default ContactPage
