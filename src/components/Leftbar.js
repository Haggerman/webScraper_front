import React from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  TextField,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";
import URLList from "./URLList";
import { styled } from "@mui/material/styles";
import URLModal from "./URLModal";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

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

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiInputLabel-root": {
    color: "white",
    borderBottomColor: "white",
    "& fieldset": {
      borderColor: "white",
      color: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

const Leftbar = ({ handleUpdate, handleUpdateURLList, patterns }) => {
  const [lastValue, setlastValue] = useState("");
  const [listURLs, setURLs] = useState([]);
  const [lastId, setId] = useState(0);
  const [htmlList, setHtmlList] = useState([]);
  const [pickedUrl, setPickedUrl] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorText, setError] = useState("");

  useEffect(() => {
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
        if (data) {
          var sessionUrls = [];
          var sessionHTMLs = [];
          var highestInt = 0;
          {
            data.map(
              (row) => (
                sessionHTMLs.push({ html: row.html, id: parseInt(row.id) }),
                sessionUrls.push({ url: row.url, id: parseInt(row.id) }),
                row.id > highestInt ? (highestInt = row.id) : row.id
              )
            );
          }
          setId(highestInt);
          setURLs(sessionUrls);
          setHtmlList(sessionHTMLs);
          handleUpdateURLList(sessionUrls);
          setPickedUrl(highestInt);
          handlePickFromSession(highestInt, sessionHTMLs);
        }
      })
      .catch((err) => {});
  }, []);

  const handleDelete = (id) => {
    fetch("/url", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        const reducedList = listURLs.filter((url) => url.id != id);
        setURLs(reducedList);
        handleUpdateURLList(reducedList);
        if (pickedUrl == id) {
          handleUpdate([]);
        }
      })
      .catch((err) => {});
  };

  const handleSubmit = (e) => {
    let newId = lastId * 1 + 1;
    e.preventDefault();
    setError("");
    setLoading(true);
    fetch("/url", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: lastValue, id: newId }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        listURLs.push({ url: lastValue, id: parseInt(newId) });
        handleUpdateURLList(listURLs);
        htmlList.push({ html: data, id: parseInt(newId) });
        setHtmlList(htmlList);
        const reducedHtmlList = htmlList.filter((h) => h.id == parseInt(newId));
        setId(newId);
        setPickedUrl(newId);
        handleUpdate(reducedHtmlList);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError("Adresa je nedostupná");
      });
  };

  const handlePickUrl = (id) => {
    const reducedHtmlList = htmlList.filter((h) => h.id == id);
    setPickedUrl(id);
    handleUpdate(reducedHtmlList);
  };
  const handlePickFromSession = (id, list) => {
    const reducedHtmlList = list.filter((h) => h.id == id);
    setPickedUrl(id);
    handleUpdate(reducedHtmlList);
  };

  return (
    <Card elevation={3}>
      <CardHeader title="URL adresy" action={patterns && <URLModal />} />
      <Divider />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container={true}>
            <Grid item xs={10}>
              <CssTextField
                autoFocus
                margin="dense"
                id="custom-css-outlined-input"
                label="URL"
                type="url"
                size="small"
                disabled={loading}
                fullWidth
                InputProps={{ style: { fontSize: 12 } }}
                variant="standard"
                helperText={errorText}
                FormHelperTextProps={{ sx: { color: "white" } }}
                required
                value={lastValue}
                onChange={(e) => {
                  setlastValue(e.target.value);
                  setError("");
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Tooltip title="Odeslat adresu">
                <CssButton type="submit" disabled={loading}>
                  {loading ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    <SendIcon />
                  )}
                </CssButton>
              </Tooltip>
            </Grid>
          </Grid>
        </form>

        <URLList
          URLs={listURLs}
          handleDelete={handleDelete}
          handlePickUrl={handlePickUrl}
          pickedURL={pickedUrl}
        />
      </CardContent>
    </Card>
  );
};

export default Leftbar;
