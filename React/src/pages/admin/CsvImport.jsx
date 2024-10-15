
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useCsvImportActions } from '../../_actions';

import { history, useFetchWrapper } from '../../_helpers';

// import { ZonesList } from './ZonesList';
// import { ZonesAddEdit } from './ZonesAddEdit';

const CsvImport = () =>
{
    const baseUrl = `${process.env.REACT_APP_API_URL}/csvimport`;
    const csvImportActions = useCsvImportActions();
    const fetchWrapper = useFetchWrapper();

    let [file, setFile] = useState();
    let [fileName, setFileName] = useState();

    const SaveFile = (e) =>
    {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    const HandleFileUpload = (event) =>
    {

        // get the selected file from the input 
        //const file = event.target.files[0];
        // create a new FormData object and append the file to it
        const formData = new FormData();
        formData.append("formFile", file);
        formData.append("fileName", fileName);

        fetchWrapper.postFile(`${baseUrl}/ImportCsv`, formData)
            .then((response) =>
            {
                console.log(response);
            })
            .catch((error) =>
            {
                console.log(error);
            });

        // csvImportActions.importfile(formData, {
        //     headers: {
        //         "Content-Type": "multipart/form-data"
        //     },
        // })
        //     .then(() => 
        //     {

        //     })
        //     .catch();

        // make a POST request to the File Upload API with the FormData object and Rapid API headers
        // axios
        //     .post("https://file-upload8.p.rapidapi.com/upload", formData, {
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //             "x-rapidapi-host": "file-upload8.p.rapidapi.com",
        //             "x-rapidapi-key": "your-rapidapi-key-here",
        //         },
        //     })
        //     .then((response) =>
        //     {
        //         // handle the response
        //         console.log(response);
        //     })
        //     .catch((error) =>
        //     {
        //         // handle errors
        //         console.log(error);
        //     });
    };
    // render a simple input element with an onChange event listener that calls the handleFileUpload function
    return (
        // <div>
        //     <input type="file" onChange={SaveFile} />
        //     <input value="upload" type="button" onClick={HandleFileUpload} />
        // </div>

        <form onSubmit={HandleFileUpload}>
            <input type="file" onChange={SaveFile} />
            <button type="submit" disabled={!(file && fileName)} >upload</button>
        </form>
    );
}

export { CsvImport };