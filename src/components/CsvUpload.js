import React  from 'react';

const CsvUpload = ({handleFile}) => {
    return (
        <form id="csv-form">
            <input
                type='file'
                accept=".csv"
                id="file"
                onChange={(e) => {handleFile(e.target.files[0])}}
            >
            </input>
        </form>
   
    )
};

export default CsvUpload;