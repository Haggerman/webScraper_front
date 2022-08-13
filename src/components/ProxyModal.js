import * as React from "react";
import { Grid, Tooltip, CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SendIcon from "@mui/icons-material/Send";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import ProxyList from "./ProxyList";
import { styled } from "@mui/material/styles";

const CssButton = styled(IconButton)({
  border: "none",
  backgroundColor: "transparent",
  color: "white",
  ":hover": {
    backgroundColor: "transparent",
    color: "black",
    border: "none",
  },
  ":hover .MuiSvgIcon-root": {
    color: "#2c313a",
  },
});

const DialogButton = styled(IconButton)({
  color: "black",
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

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInputBase-input": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
  },
  "& .MuiInputLabel-root": {
    color: "black",
    borderBottomColor: "black",
    "& fieldset": {
      borderColor: "black",
      color: "black",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
});

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [proxyList, setProxyList] = useState([]);
  const [lastId, setId] = useState(1);
  const [value, setValue] = useState("");
  const [pass, setPass] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState("Nezapomeňte seznam odeslat!");
  const [loading, setLoading] = useState(false);
  const [proxyLoading, setProxyLoading] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    var exists = false;
    if (value.startsWith("http://") || value.startsWith("https://")) {
      setError("Nezapomeňte seznam odeslat!");
      if (value) {
        if (proxyList.length > 0) {
          exists = proxyList.some((r) => r.url == value);
        }
        if (!exists) {
          checkProxy();
        } else {
          setError("Adresa je již v seznamu");
        }
      }
    } else {
      setError("Protokol nebyl zadán");
    }
  };

  const handleDelete = (id) => {
    const reducedList = proxyList.filter((proxy) => proxy.id != id);
    setProxyList(reducedList);
  };
  useEffect(() => {
    fetch("/proxy", {
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
        if (data.length > 0) {
          setProxyList(data);
        }
      })
      .catch((err) => {});
  }, [open]);

  const handleSubmit = () => {
    setLoading(true);
    setError("Odesílám seznam");
    fetch("/proxy", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ proxys: proxyList }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setError("Seznam byl odeslán");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError("Seznam se nepodařilo odeslat");
      });
  };

  const checkProxy = () => {
    setProxyLoading(true);
    setError("Kontrola adresy");
    fetch("/checkProxy", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        proxy: { url: value, id: lastId, user: user, pass: pass },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setId(lastId + 1);
        proxyList.push({ url: value, id: lastId, user: user, pass: pass });
        setProxyList(proxyList);
        setProxyLoading(false);
      })
      .catch((err) => {
        setError("Proxy adresa neodpovídá");
        setProxyLoading(false);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValue("");
    setError("Nezapomeňte seznam odeslat!");
  };

  return (
    <div>
      <Tooltip title="Přidání proxy adres">
        <CssButton variant="outlined" onClick={handleClickOpen}>
          <VpnKeyIcon />
        </CssButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} className="myDialog">
        <DialogTitle className="dialogTitle">
          {" "}
          Proxy list
          <DialogButton
            type="submit"
            className="dialogButton"
            onClick={() => handleSubmit()}
            disabled={loading}
          >
            {loading ? <CircularProgress color="inherit" /> : <SendIcon />}
          </DialogButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleAdd}>
            <Grid container={true}>
              <Grid item xs={9}>
                <CssTextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Adresa včetně protokolu (http/https)"
                  type="url"
                  fullWidth
                  variant="standard"
                  required
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </Grid>
              <Grid item xs={5}>
                <CssTextField
                  autoFocus
                  margin="dense"
                  id="username"
                  label="Jméno"
                  helperText={error}
                  type="text"
                  fullWidth
                  variant="standard"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </Grid>
              <Grid item xs={5}>
                <CssTextField
                  autoFocus
                  margin="dense"
                  id="password"
                  label="Heslo"
                  type="password"
                  fullWidth
                  variant="standard"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </Grid>
              <Grid item xs={2} className="dialogRow">
                <DialogButton
                  type="submit"
                  className="dialogButton"
                  disabled={proxyLoading}
                >
                  {proxyLoading ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    <AddBoxIcon />
                  )}
                </DialogButton>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        {proxyList && proxyList.length > 0 && (
          <ProxyList proxyList={proxyList} handleDelete={handleDelete} />
        )}
      </Dialog>
    </div>
  );
}
