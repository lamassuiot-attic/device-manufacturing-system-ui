import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { Error as ErrorIcon, CheckCircle as CheckCircleIcon, Warning as WarningIcon, Close as CloseIcon } from '@material-ui/icons';

import { useStyles } from './alert-bar-styles';
 
export default function AlertBar(props) {
  
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    props.setMessage(null);
  }

  const classes = useStyles();
  const type = props.type;
  const typeClassName = classes[type];

  const renderTypeIcon = () => {
    switch(type) {
      case "error":
        return <ErrorIcon className={classes.icon}/>
      case "success":
        return <CheckCircleIcon className={classes.icon}/>
      case "warning":
        return <WarningIcon className={classes.icon}/>
      default:
        return null;
    }
  }

  return (
      <Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        open={isOpen}
        onClose={handleClose}
      >
        <SnackbarContent
          className={clsx(classes.root, typeClassName)}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              {renderTypeIcon()}
              {props.message}
            </span>
          }
          action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon className={classes.icon}/>
            </IconButton>
          ]}/>

      </Snackbar>
  )
}

AlertBar.propTypes = {
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
}