import React from "react";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Box, Grid } from "@mui/material";
import Main from "./components/Main";
import Leftbar from "./components/Leftbar";
import LinearProgress from "@mui/material/LinearProgress";

function App() {
  const [response, setResponse] = useState("");
  const [urls, setURLs] = useState("");
  const [patterns, setPatterns] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = (response) => {
    setResponse(response);
  };
  const handleUpdateURLList = (list) => {
    setURLs(list);
  };
  const handleSetPatterns = (patterns) => {
    setPatterns(patterns);
  };

  useEffect(() => {
    setLoading(true);
    fetch("/url", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }} p={1}>
      {loading ? (
        <LinearProgress />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Navbar />
          </Grid>
          <Grid item xs={12} md={2}>
            <Leftbar
              handleUpdate={handleUpdate}
              handleUpdateURLList={handleUpdateURLList}
              patterns={patterns}
            />
          </Grid>
          <Grid item xs={12} md={10}>
            <Main
              HTMLresponse={response}
              listURLs={urls}
              handleSetPatterns={handleSetPatterns}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default App;
