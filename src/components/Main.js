
import React  from 'react';
import { AppBar, Toolbar, Typography, Box, Grid, Paper } from "@mui/material";
import { useState, useEffect } from 'react';
import styled from "@emotion/styled";
import Results from "./Results";
import Patterns from "./Patterns";
import Structure from "./Structure";



const Main = ({HTMLresponse, listURLs, handleSetPatterns}) => {
  const [results, setResults] = useState("");
  const [pickedResults, setPickedResults] = useState("")
  const [jsonResults, setJsonResults]= useState("")
  const [pattern, setPattern] = useState("");
  const [error, setError] = useState(false)
  const handleUpdate = (results) => {
    setError(false)
    setResults(results)
    handleSetPatterns(results)
    if(results){
      if(results[0].id != -1){  
      const pickedResults = results.filter(r => r.id == HTMLresponse[0].id);
      setPickedResults(pickedResults)
      createJsonResults(results)
      }
      else{
        setJsonResults([{"title":"error","result":"Vzor byl zadán ve špatném formátu"}])
        setPickedResults([{"title":"error","result":"Vzor byl zadán ve špatném formátu"}])
        setError(true)
      }
    }
  }

  const createJsonResults =(results)=>{
    let prettyResults = []
    listURLs.forEach(element => {
      let resultRow = {}
      resultRow["url"] = element.url
      results.forEach(element2 => {
        if (element.id == element2.id){
          resultRow[element2.title] = element2.result
        }
      });
      prettyResults.push(resultRow)
    });
    setJsonResults(prettyResults)
  }
  useEffect(() => { 
    if(results && HTMLresponse[0] && results.length > 0 ){
    handleSubmit()
    const pickedResults = results.filter(r => r.id == HTMLresponse[0].id);
    setPickedResults(pickedResults)
    }
    else{
      setPickedResults("")
    }
  }, [HTMLresponse])

  const handleSetPattern = (pattern) =>{
    setPattern(pattern)
    console.log(pattern)
  }

  const handleSubmit = () => {
    fetch("/parser", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pattern: pattern })
      })
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
        console.log("VYSLEDKY PO PRIDANI NOVE URL")
        console.log(data)
        handleUpdate(data);
      })
      .catch(err => {

      })
}

    return (
        <Grid container spacing={2}>
        <Grid item xs={12} md={12} sx={{height: '700'}}>
        <Patterns handleSubmit={handleSubmit} handleSetPattern={handleSetPattern}/>
        </Grid>  
        <Grid item xs={12} md={6}>
        <Structure HTMLresponse={HTMLresponse}/>
        </Grid>
        <Grid item xs={12} md={6}>
        <Results results={pickedResults} jsonResults={jsonResults} error={error} />
        </Grid>
      </Grid>
    )
};

export default Main;