import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { editNameThunk } from '../../redux/thunks/users';

export default function ChangeName() {
    const user = useSelector((state: RootState) => state.user.user);
    const dispatchThunk = useDispatch<AppDispatch>();

  const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Typography variant='subtitle2' sx={{textDecoration: "underline", cursor: "pointer"}} onClick={handleClickOpen}>
        change name
      </Typography>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>change name:</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            color='warning'
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
            <Box sx={{display: "flex", justifyContent: "center", position: "relative", right: "20px"}}>
            <Button onClick={() => handleClose()} color="inherit">Cancel</Button>
          <Button onClick={() => {
            handleClose();
            dispatchThunk(editNameThunk(user, name))
            }} color="inherit">Confirm</Button>
            </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}