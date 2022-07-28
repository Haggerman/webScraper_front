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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { DataArray } from '@mui/icons-material';



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
  const [open, setOpen] = useState(false);
  const [mail, setMail] = useState("");
  const [file, setFile] = useState();
  const [uploadStatus, setUploadStatus] = useState("");
  const [type, setType] = useState('CSV');
  const [mailHelper, setMailHelper]= useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setUploadStatus("")  
    setOpen(false);
    setFile("");
    setMail("");
    setType("CSV");
    setMailHelper("");
  };

  const handleFile = (file) =>{
    var regex = new RegExp("(.*?)\.(csv)$");
    if (!(regex.test(file.name.toLowerCase()))) {
      setUploadStatus("Vyberte soubor formátu .csv")
    }
    else{
      setFile(file)
      setUploadStatus("")
    }
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChange = event => {
    if (!isValidEmail(event.target.value)) {
      setUploadStatus('Zadejte email ve validním formátu');
      setMail("")
    } else {
      setUploadStatus("");
      setMail(event.target.value);
    }
    setMailHelper(event.target.value)
  };

  const handleSubmit = () => {

    var data = new FormData()
    data.append('file', file)
    data.append('mail', mail)
    data.append('type', type)

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
        setUploadStatus("Data jsou zpracovávána, výsledky dorazí na zadaný mail v následujících minutách")
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
          <FormLabel id="demo-controlled-radio-buttons-group">Typ exportu</FormLabel>
          <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <FormControlLabel value="CSV" control={<Radio />} label="CSV" />
        <FormControlLabel value="JSON" control={<Radio />} label="JSON" />
      </RadioGroup>
      <CsvUpload handleFile={handleFile} />
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
            required value={mailHelper} 
            onChange={handleChange}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
