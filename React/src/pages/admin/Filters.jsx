import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { FiltersList } from './FiltersList';
import { FiltersAddEdit } from './FiltersAddEdit';

function AdminFilters()
{
    return (
        <Routes>
            <Route exact path='/Admin/Filters' element={<FiltersList />} />
            <Route path='/Admin/Filters/add' element={<FiltersAddEdit />} />
            <Route path='/Admin/Filters/edit/:id' element={<FiltersAddEdit />} />
        </Routes>
    );
}

export default { AdminFilters };