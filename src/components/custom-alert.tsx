import React, { ReactNode } from 'react';
import { Alert, AlertColor, Snackbar } from '@mui/material';
import ReactDOM from 'react-dom';

type SnackbarAlertProps = {
  message: string | ReactNode;
  severity?: AlertColor;
  onClose: () => void;
};

const SnackbarAlert: React.VFC<SnackbarAlertProps> = (props) => {
  const { message, severity, onClose } = props;
  return (
    <Snackbar
      open
      onClose={onClose}
      autoHideDuration={10_000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert severity={severity} onClose={onClose} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export function customAlert(message: string | ReactNode, severity?: AlertColor) {
  const wrapper = document.getElementById('snackbar');
  if (!wrapper) {
    return;
  }
  const handleClose = () => ReactDOM.unmountComponentAtNode(wrapper);
  ReactDOM.render(
    <SnackbarAlert message={message} severity={severity} onClose={handleClose} />,
    wrapper
  );
}
