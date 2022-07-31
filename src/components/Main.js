
import React  from 'react';
import { Grid} from "@mui/material";
import { useState, useEffect } from 'react';
import Results from "./Results";
import Patterns from "./Patterns";
import Structure from "./Structure";

const Main = ({HTMLresponse, listURLs, handleSetPatterns}) => {
  const [results, setResults] = useState("");
  const [pickedResults, setPickedResults] = useState("")
  const [jsonResults, setJsonResults]= useState("")
  const [pattern, setPattern] = useState("");
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

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
    var exists = results.some(r => r.id == HTMLresponse[0].id )
    if(!exists){
      handleSubmit()
    }
    const pickedResults = results.filter(r => r.id == HTMLresponse[0].id);
    setPickedResults(pickedResults)
    }
    else{
      setPickedResults("")
    }
  }, [HTMLresponse])

  const handleSetPattern = (pattern) =>{
    setPattern(pattern)
  }

  const handleSubmit = () => {
    setLoading(true)
    fetch("/parser", {
        method: 'POST',
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
        setLoading(false)
        handleUpdate(data);
      })
      .catch(err => {

      })
}

    return (
        <Grid container spacing={2}>
        <Grid item xs={12} md={12} sx={{height: '700'}}>
        <Patterns handleSubmit={handleSubmit} handleSetPattern={handleSetPattern} loading={loading}/>
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