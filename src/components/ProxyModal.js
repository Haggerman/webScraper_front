import * as React from 'react';
import {Grid, Tooltip} from "@mui/material";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SendIcon from '@mui/icons-material/Send';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';
import ProxyList from './ProxyList';
import {styled } from '@mui/material/styles';

const CssButton = styled(IconButton)({
  border: "none",
  backgroundColor: "transparent",
  color: "white",
  ':hover':{
    backgroundColor: "transparent",
    color:"black",
    border:"none"
  },
  ":hover .MuiSvgIcon-root": {
    color: "#2c313a"
  }
});

const DialogButton = styled(IconButton)({
  color: "black",
  border: "none",
  backgroundColor: "transparent",
  ':hover':{
    backgroundColor: "transparent",
    color:"black",
    border:"none"
  },
  ":hover .MuiSvgIcon-root": {
    color: "#525864"
  }
});

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'black',
  },
  '& .MuiInputBase-input':{
    color: 'black'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'black',
  },
  '& .MuiInputLabel-root': {
    color: "black",
    borderBottomColor: "black",
    '& fieldset': {
      borderColor: 'black',
      color: "black"
    },
    '&:hover fieldset': {
      borderColor: 'black',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'black',
    }
  },
});

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [proxyList, setProxyList] = useState([]);
  const [lastId, setId] = useState(1);
  const [value, setValue]= useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    var exists = false
    if(value){
      if(proxyList.length>0)
      {
      exists = proxyList.some(r => r.url == value)
      }
      if(!exists){
        setId(lastId+1)
        var newList = []
        newList.push({url: value, id: lastId})
        setProxyList(newList)
      }
    }
  }

  const handleDelete = (id) => {
    const reducedList = proxyList.filter(proxy => proxy.id != id);
    setProxyList(reducedList)
  }
  useEffect(() => {
    fetch("/proxy", {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      if (!res.ok) { // error coming back from server
        throw Error('could not fetch the data for that resource');
      } 
      return res.json();
    })
    .then(data => {
      setProxyList(data)

      })
    .catch(err => {
    })
}, [open])

  const handleSubmit = () => {
    fetch("/proxy", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({proxys: proxyList})
      })
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
      })
      .catch(err => {

      })
    }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValue("");
  };

  return (
    <div>
      <Tooltip title = "Přidání proxy adres">
      <CssButton variant="outlined" onClick={handleClickOpen}  >
        <VpnKeyIcon/>
      </CssButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} className='myDialog'>
        <DialogTitle className='dialogTitle'> Proxy list
        {proxyList && proxyList.length > 0 &&  <DialogButton type="submit" className='dialogButton' onClick={() => handleSubmit()} ><SendIcon/></DialogButton> }
        </DialogTitle>
        <DialogContent>
        <form onSubmit={handleAdd}>
        <Grid container={true}>
        <Grid xs={10}>
          <CssTextField
            autoFocus
            margin="dense"
            id="name"
            label="Zadejte proxy adresu včetně protokolu (https/https)"
            type="url"
            helperText="Nezapomeťe seznam odeslat!"
            fullWidth
            variant="standard"
            required value={value} onChange={(e) => setValue(e.target.value)}
          />
          </Grid>
          <Grid xs={2} className='dialogRow'>
        <DialogButton type="submit" className='dialogButton' ><AddBoxIcon/></DialogButton>
        </Grid>
        </Grid>
        </form>
        </DialogContent>
        {proxyList && proxyList.length > 0 && <ProxyList proxyList={proxyList} handleDelete={handleDelete}/> }
      </Dialog>
    </div>
  );
}
