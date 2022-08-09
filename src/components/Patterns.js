import React from "react";
import { Divider, Tooltip, CircularProgress } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import styled from "@emotion/styled";
import { oneDark } from "@codemirror/theme-one-dark";
import CodeMirror from "@uiw/react-codemirror";
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
    color: "#2c313a",
  },
});

const Patterns = ({ handleSubmit, handleSetPattern, loading }) => {
  const [pattern, setPattern] = useState("");

  useEffect(() => {
    fetch("/getPatterns", {
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
        if (data) {
          setPattern(data);
        }
      })
      .catch((err) => {});
  }, []);

  return (
    <Card elevation={3}>
      <CardHeader
        title="Vyhledávácí vzory"
        action={
          pattern.includes("select:") > 0 ? (
            <Tooltip title="Odeslat vzory">
              <CssButton
                type="submit"
                onClick={() => handleSubmit(pattern)}
                disabled={loading}
              >
                {" "}
                {loading ? (
                  <CircularProgress color="inherit" />
                ) : (
                  <SendIcon />
                )}{" "}
              </CssButton>
            </Tooltip>
          ) : (
            ""
          )
        }
      />
      <Divider />
      <CardContent>
        <CodeMirror
          value={pattern}
          height="100%"
          theme={oneDark}
          className="myMirror"
          onChange={(value) => {
            setPattern(value);
            handleSetPattern(value);
          }}
        />
      </CardContent>
    </Card>
  );
};

export default Patterns;
