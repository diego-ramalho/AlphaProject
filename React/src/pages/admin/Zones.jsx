
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ZonesList } from './ZonesList';
import { ZonesAddEdit } from './ZonesAddEdit';

function AdminZones()
{
    return (
        <Routes>
            <Route exact path='/Admin/Zones' element={<ZonesList />} />
            <Route path='/Admin/Zones/add' element={<ZonesAddEdit />} />
            <Route path='/Admin/Zones/edit/:id' element={<ZonesAddEdit />} />
        </Routes>
    );
}

export default { AdminZones };