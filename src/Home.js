import React  from 'react';
import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import DataList from "./DataList"

const Home  = () => {
    const {data: response, isPendng, error} = useFetch('http://127.0.0.1:5000/url') 

    return (
        <div className="home">
        {error && <div>{error}</div>}
        {isPendng && <div>Loading...</div>   }
        {response && <DataList response={response} />  }

    </div>


     );
}
 
export default Home ;