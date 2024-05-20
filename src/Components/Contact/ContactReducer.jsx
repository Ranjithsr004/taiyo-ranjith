import { createSlice } from "@reduxjs/toolkit";
import { contactList } from "./Data";

// creating a slice of Redux state for managing contacts
const contactSlice = createSlice ({
    name: "contacts", // name of the slice
    initialState: contactList, // initial state of the slice
    reducers: {
        // reducer function to add a new contact
        addContact : (state, action) => {
            state.push(action.payload)
        },
        // reducer function to update an existing contact
        updateContact : (state, action) => {
            const {id, firstName, lastName, status} = action.payload;
            // finding the contact to update by ID
            const newupdate =  state.find(contact => contact.id==id);
            if(newupdate) {
                // updating the new contact details
                newupdate.firstName = firstName;
                newupdate.lastName = lastName;
                newupdate.status = status;
            }
        },

        // reducer function to delete a contact
        deleteContact : (state, action) => {
            const {id} = action.payload;
            // finding the contact to delete by ID
            const newupdate =  state.find(contact => contact.id==id);
            if(newupdate) {
                // filtering the contact from the state
                return state.filter (f=> f.id !== id);
            }
        }
    }
})
export const {addContact, updateContact, deleteContact} = contactSlice.actions;
export default contactSlice.reducer;