import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SendIcon from '@mui/icons-material/Send';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import CsvUpload from './CsvUpload';
import {styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from '@mui/material';



const CssButton = styled(IconButton)({
    color: "white",
    border: "none",
    backgroundColor: "transparent",
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


export default function URLModal() {
  const [open, setOpen] = React.useState(false);
  const [mail, setMail] = useState("");
  const [file, setFile] = useState();
  const [uploadStatus, setUploadStatus] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setUploadStatus("")  
    setOpen(false);
    setFile("");
    setMail("");
  };

  const handleFile = (file) =>{
      setFile(file)
      console.log(file)
      console.log(mail)
  }

  const handleSubmit = () => {

    var data = new FormData()
    data.append('file', file)
    data.append('mail', mail)
    setUploadStatus("Data jsou zpracovávána, výsledky dorazí na zadaný mail v následujících minutách")

    fetch("/uploadFile", {
        method: 'POST',
        credentials: 'include',
        body: data
      })
      .then(res => {
        setFile("");
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

  return (
    <div>
      <Tooltip title="Hromadná extrakce">
      <CssButton variant="outlined" onClick={handleClickOpen}>
        <UploadFileIcon/>
      </CssButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} className='myDialog'>
        <DialogTitle className='dialogTitle'> URL list
        {mail && file &&  <DialogButton type="submit" className='dialogButton' onClick={() => handleSubmit()}><SendIcon/></DialogButton> }
        </DialogTitle>
        <DialogContent>
          <CssTextField
           className='blackInput'
            autoFocus
            margin="dense"
            id="name"
            label="mail"
            type="mail"
            fullWidth
            variant="standard"
            helperText={uploadStatus}
            required value={mail} onChange={(e) => setMail(e.target.value)}
          />
          <CsvUpload handleFile={handleFile}/>
        </DialogContent>
      </Dialog>
    </div>
  );
}
