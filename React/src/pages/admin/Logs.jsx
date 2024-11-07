import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { LogsList } from './LogsList';
import { LogsAddEdit } from './LogsAddEdit';

function AdminLogs()
{
    return (
        <Routes>
            <Route exact path='/Admin/Logs' element={<LogsList />} />
            <Route path='/Admin/Logs/add' element={<LogsAddEdit />} />
            <Route path='/Admin/Logs/edit/:id' element={<LogsAddEdit />} />
        </Routes>
    );
}

export default { AdminLogs };