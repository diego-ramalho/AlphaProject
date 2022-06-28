import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { RegistersList } from './RegistersList';
import { RegistersAddEdit } from './RegistersAddEdit';

function AdminRegisters()
{
    return (
        <Routes>
            <Route exact path='/AlphaProject/Admin/Registers' element={<RegistersList />} />
            <Route path='/AlphaProject/Admin/Registers/add' element={<RegistersAddEdit />} />
            <Route path='/AlphaProject/Admin/Registers/edit/:id' element={<RegistersAddEdit />} />
        </Routes>
    );
}

export default { AdminRegisters };