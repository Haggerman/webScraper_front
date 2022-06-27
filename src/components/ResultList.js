import React  from 'react';
import { RestoreTwoTone } from "@mui/icons-material";
import {Box } from "@mui/material";
import { useEffect, useState } from "react";


const ResultList = ({results}) => {

    return (
    <Box>
            {results.map((r, index)=>(
                <Box key={index} >
                    {'"'+r.title+'"'}: {Array.isArray(r.result)? r.result.length > 1?
                    "["+ 
                     r.result.map((res)=> ('"' + res +'"'+" ")) + "]"
                     :'"'+ r.result +'"' : '"'+ r.result +'"' }   
                </Box> 
            ))}
    </Box> 
    )
};

export default ResultList;