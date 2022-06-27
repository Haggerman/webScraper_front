import React  from 'react';
const DataList = ({response, title}) => {

    console.log("toto je datalist" + response)
    return (
        <div className="data-list">
            <h2>{title}</h2>
        {response.blogs.map((row) => (
            <div className="data-preview" key={row.id}>
                <h2>{row.title}</h2>
                <p>Written by {row.author}</p>
            </div>
        ))}
        </div>
      );
}
 
export default DataList;