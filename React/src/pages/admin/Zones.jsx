
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ZonesList } from './ZonesList';
import { ZonesAddEdit } from './ZonesAddEdit';

function AdminZones()
{
    return (
        <Routes>
            <Route exact path='/AlphaProject/Admin/Zones' element={<ZonesList />} />
            <Route path='/AlphaProject/Admin/Zones/add' element={<ZonesAddEdit />} />
            <Route path='/AlphaProject/Admin/Zones/edit/:id' element={<ZonesAddEdit />} />
        </Routes>
    );
}

export default { AdminZones };