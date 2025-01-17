import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../redux';

const SoAlert = () => {
  const alert = useSelector((state) => state.silo.alert)
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.silo.mode);


  useEffect(() => {
    alert
  }, [alert.open])

  const handleClose = () => {
    dispatch(setAlert({}))
  };

  const severity = alert.type && alert.type !== '' ? (alert.type === 'success' ? 'success' : 'error') : 'info';

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={alert.open}
      autoHideDuration={1000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} variant={mode == 'dark' ? 'standard' : 'filled'}>
        {alert.msg}
      </Alert>
    </Snackbar>
  );
};

export default SoAlert;
