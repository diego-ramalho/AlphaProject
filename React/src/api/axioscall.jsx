import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function GetAllUsers()
{
    const [users, setUsers] = useState('');

    useEffect(() => { getUsers(); }, []);

    const getUsers = () =>
    {
        const url = 'https://localhost:7060/api/';
        const getAllUsers = () =>
        {
            axios.get('https://localhost:7060/api/User/GetUsers')
        }
        axios.get(`${url}User/GetUsers`)
            .then(response =>
            {
                const allUsers = response.data;
                setUsers(allUsers);
            }
            )
            .catch(error => console.error(`Error: ${error}`));
    }

    return (
        {users}
    )
}