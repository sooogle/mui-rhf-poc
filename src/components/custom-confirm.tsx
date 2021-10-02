import React, { ReactNode } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ReactDOM from 'react-dom';

type ConfirmDialogProps = {
  title?: string | null;
  message: string | ReactNode;
  onClose: (confirmed: boolean) => void;
};

const ConfirmDialog: React.VFC<ConfirmDialogProps> = (props) => {
  const { title, message, onClose } = props;
  return (
    <Dialog open aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => onClose(true)} autoFocus>
          はい
        </Button>
        <Button variant="outlined" onClick={() => onClose(false)}>
          いいえ
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export function customConfirm(
  message: string | ReactNode,
  title?: string | null
): Promise<boolean> {
  const wrapper = document.getElementById('dialog');
  if (!wrapper) {
    return Promise.reject('the dialog wrapper div does not exist.');
  }
  return new Promise((resolve) => {
    const handleClose = (confirmed: boolean) => {
      ReactDOM.unmountComponentAtNode(wrapper);
      resolve(confirmed);
    };
    ReactDOM.render(
      <ConfirmDialog title={title} message={message} onClose={handleClose} />,
      wrapper
    );
  });
}
