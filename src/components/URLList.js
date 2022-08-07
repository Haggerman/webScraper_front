import React from "react";
import { Grid, Box, Button } from "@mui/material";
import DeleteForever from "@mui/icons-material/DeleteForever";
import "../index.css";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

const CssButton = styled(IconButton)({
  color: "white",
  border: "none",
  backgroundColor: "transparent",
  ":hover": {
    backgroundColor: "transparent",
    color: "black",
    border: "none",
  },
  ":hover .MuiSvgIcon-root": {
    color: "#525864",
  },
});

const URLList = ({ URLs, handleDelete, handlePickUrl, pickedURL }) => {
  return (
    <Box className="urlList">
      {URLs.map((url) => (
        <Box
          key={url.id}
          className={pickedURL == url.id ? "active" : "inactive"}
        >
          <Grid container={true}>
            <Grid xs={10}>
              <Button
                type="submit"
                className="myButton"
                onClick={() => handlePickUrl(url.id)}
              >
                {url.url}
              </Button>
            </Grid>
            <Grid xs={2}>
              <CssButton type="submit" onClick={() => handleDelete(url.id)}>
                <DeleteForever />
              </CssButton>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default URLList;
