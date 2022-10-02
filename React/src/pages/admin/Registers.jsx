import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { RegistersList } from './RegistersList';
import { RegistersAddEdit } from './RegistersAddEdit';

function AdminRegisters()
{
    return (
        <Routes>
            <Route exact path='/Admin/Registers' element={<RegistersList />} />
            <Route path='/Admin/Registers/add' element={<RegistersAddEdit />} />
            <Route path='/Admin/Registers/edit/:id' element={<RegistersAddEdit />} />
        </Routes>
    );
}

export default AdminRegisters;