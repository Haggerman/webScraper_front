import React  from 'react';
import { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import Home from "./Home";
import {Box, Stack, Paper, Grid} from  "@mui/material";
import Main from "./components/Main";
import Leftbar from "./components/Leftbar";
import styled from "@emotion/styled";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function App() {
  const [response, setResponse] = useState("");
  const [urls, setURLs] = useState("");
  const [patterns, setPatterns] = useState("");
  const handleUpdate = (response) => {
    console.log("toto je response")
    console.log(response)
    setResponse(response)
  }
  const handleUpdateURLList = (list) => {
    setURLs(list)
  }
  const handleSetPatterns = (patterns) => {
    setPatterns(patterns)
  }


  return (
    <Box sx={{ flexGrow: 1 } } p={1}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
        <Navbar/>
        </Grid>
        <Grid item  xs={12}  md={2}>
          <Leftbar  handleUpdate={handleUpdate} handleUpdateURLList={handleUpdateURLList} patterns={patterns}/>
        </Grid>
        <Grid item  xs={12} md={10}>
          <Main HTMLresponse={response} listURLs={urls} handleSetPatterns={handleSetPatterns} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;


