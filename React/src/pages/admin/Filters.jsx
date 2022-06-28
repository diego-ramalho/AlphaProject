import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { FiltersList } from './FiltersList';
import { FiltersAddEdit } from './FiltersAddEdit';

function AdminFilters()
{
    return (
        <Routes>
            <Route exact path='/AlphaProject/Admin/Filters' element={<FiltersList />} />
            <Route path='/AlphaProject/Admin/Filters/add' element={<FiltersAddEdit />} />
            <Route path='/AlphaProject/Admin/Filters/edit/:id' element={<FiltersAddEdit />} />
        </Routes>
    );
}

export default { AdminFilters };