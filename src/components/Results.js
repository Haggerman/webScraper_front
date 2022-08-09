import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import styled from "@emotion/styled";
import { oneDark } from "@codemirror/theme-one-dark";
import CodeMirror from "@uiw/react-codemirror";
import { CSVLink } from "react-csv";
import DownloadIcon from "@mui/icons-material/Download";

const CssButton = styled(IconButton)({
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

const Results = ({ results, jsonResults, error }) => {
  const csvReport = {
    filename: "Report.csv",
    data: jsonResults,
  };

  const prettyResults = (results) => {
    const resultsList = Object.create(null);
    let object = "";
    results.map((r) => (resultsList[r.title] = r.result));
    let finalResults = JSON.stringify(resultsList, null, 2);
    finalResults = finalResults
      .replace(/\\n/g, "")
      .replace(/\\'/g, "")
      .replace(/\\"/g, "")
      .replace(/\\&/g, "")
      .replace(/\\r/g, "")
      .replace(/\\t/g, "")
      .replace(/\\b/g, "")
      .replace(/\\f/g, "")
      .replace(/\\/g, "")
      .replace(/\s{2,}/g, " ")
      .trim();
    try {
      object = JSON.parse(finalResults);
    } catch (err) {
      object = JSON.parse(JSON.stringify("Text obsahuje nepovolené znaky"));
    }

    return JSON.stringify(object, null, 2);
  };

  return (
    <Card elevation={3}>
      <CardHeader
        title="Výsledky"
        action={
          !error &&
          results && (
            <Tooltip title="Exportovat výsledky">
              <CssButton className="download" {...csvReport}>
                <CSVLink className="download" {...csvReport}>
                  <DownloadIcon />
                </CSVLink>
              </CssButton>
            </Tooltip>
          )
        }
      />
      <Divider />
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ maxHeight: "300px", overflow: "auto" }}
        >
          {results && (
            <CodeMirror
              value={prettyResults(results)}
              height="100%"
              theme={oneDark}
              editable={false}
              className="myMirror"
            />
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Results;
