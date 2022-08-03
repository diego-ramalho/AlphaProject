
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { NewsList } from './NewsList';
import { NewsAddEdit } from './NewsAddEdit';

function AdminNews()
{
    return (
        <Routes>
            <Route exact path='/Admin/News' element={<NewsList />} />
            <Route path='/Admin/News/add' element={<NewsAddEdit />} />
            <Route path='/Admin/News/edit/:id' element={<NewsAddEdit />} />
        </Routes>
    );
}

export default { AdminNews };