import React  from 'react';
import {Grid, Typography, Box } from "@mui/material";
import DeleteForever from '@mui/icons-material/DeleteForever';
import "../index.css";
import {styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

const DialogButton = styled(IconButton)({
    padding: "0px",
    color: "black",
    border: "none",
    backgroundColor: "transparent",
    ':hover':{
      backgroundColor: "transparent",
      color:"black",
      border:"none"
    },
    ":hover .MuiSvgIcon-root": {
      color: "#525864"
    }
  });

const URLList = ({proxyList, handleDelete}) => {
    return (
    <Box>
            {proxyList.map((proxy)=>(
                <Box key={proxy.id} className='proxyRow'>
                    <Grid container={true}>
                    <Grid xs={10}><Typography> {proxy.url}</Typography></Grid>   
                    <Grid xs={2}><DialogButton type="submit" className='dialogButton'onClick={() => handleDelete(proxy.id)}><DeleteForever/></DialogButton></Grid> 
                    </Grid>
                </Box> 
            ))}
    </Box> 
    )
};

export default URLList;