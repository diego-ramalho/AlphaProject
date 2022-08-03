
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ChargesList } from './ChargesList';
import { ChargesAddEdit } from './ChargesAddEdit';

function AdminCharges()
{
    return (
        <Routes>
            <Route exact path='/Admin/Charges' element={<ChargesList />} />
            <Route path='/Admin/Charges/add' element={<ChargesAddEdit />} />
            <Route path='/Admin/Charges/edit/:id' element={<ChargesAddEdit />} />
        </Routes>
    );
}

export default { AdminCharges };