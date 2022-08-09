import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Divider,
} from "@mui/material";
import { oneDark } from "@codemirror/theme-one-dark";
import CodeMirror from "@uiw/react-codemirror";
import ProxyModal from "./ProxyModal";

const Structure = ({ HTMLresponse }) => {
  return (
    <Card elevation={3}>
      <CardHeader title="Struktura webu" action={<ProxyModal />} />
      <Divider />
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ maxHeight: "700px", overflow: "auto" }}
        >
          {HTMLresponse[0] && (
            <CodeMirror
              value={HTMLresponse[0].html}
              height="100%"
              theme={oneDark}
              editable={false}
            />
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Structure;
